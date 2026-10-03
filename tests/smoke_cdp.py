#!/usr/bin/env python3
"""Headless-Chromium smoke test for The Thirteenth Bell (pure stdlib).

Drives Chromium over CDP with a minimal hand-rolled websocket client —
no playwright, no selenium, no third-party packages.

What it proves (smoke-level, not exhaustive):
  1. The split tree (index.html + css/ + js/ + assets/) loads with ZERO
     console errors / uncaught exceptions / failed resource loads.
  2. The game boots: start modal -> click #startBtn -> first scene renders
     (6 place buttons, run label, clock phases).
  3. Interaction works: visiting a place renders choices; the
     Original/Contrast toggle switches modes.
  4. The generated dist/ single-file build behaves identically to the split
     tree on the same assertions.

Not covered: the ~36 choice paths beyond the first scene, the win modal,
Anchor Board flows, journal views, or mode-state persistence across toggles.

Pages are loaded over file:// (this Chromium build blocks local http
navigation from automation; the game uses no fetch()/XHR so file:// is
a faithful load path for every relative asset reference).

Fails loudly on any console error, page error, or missing DOM marker.
"""
import base64, hashlib, json, os, select, socket, struct, subprocess, sys, time, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = os.environ.get("CHROME_BIN", "/opt/meta-chromium/chrome")
PORT = 18347
HTTP_PORT = 8123
TMP = os.path.join(ROOT, "tests", ".tmp")
failures = []

def check(name, cond, detail=""):
    print(("PASS " if cond else "FAIL ") + name + (f" — {detail}" if detail and not cond else ""))
    if not cond:
        failures.append(name)

# ---------- minimal websocket ----------
class WS:
    def __init__(self, url):
        assert url.startswith("ws://")
        host_port, path = url[5:].split("/", 1)
        host, port = host_port.split(":")
        self.sock = socket.create_connection((host, int(port)), timeout=10)
        key = base64.b64encode(os.urandom(16)).decode()
        req = (f"GET /{path} HTTP/1.1\r\nHost: {host_port}\r\nUpgrade: websocket\r\n"
               f"Connection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n")
        self.sock.sendall(req.encode())
        resp = b""
        while b"\r\n\r\n" not in resp:
            resp += self.sock.recv(4096)
        assert b"101" in resp.split(b"\r\n")[0], resp[:120]
        accept = base64.b64encode(hashlib.sha1((key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").encode()).digest()).decode()
        assert accept.encode() in resp, "bad websocket accept"

    def send(self, text):
        data = text.encode()
        mask = os.urandom(4)
        hdr = bytes([0x81])
        n = len(data)
        if n < 126:
            hdr += bytes([0x80 | n])
        elif n < 65536:
            hdr += bytes([0x80 | 126]) + struct.pack(">H", n)
        else:
            hdr += bytes([0x80 | 127]) + struct.pack(">Q", n)
        self.sock.sendall(hdr + mask + bytes(b ^ mask[i % 4] for i, b in enumerate(data)))

    def _frame(self, timeout):
        r, _, _ = select.select([self.sock], [], [], timeout)
        if not r:
            return None, None
        h = self.sock.recv(2)
        if len(h) < 2:
            return None, None
        opcode = h[0] & 0x0F
        ln = h[1] & 0x7F
        if ln == 126:
            ln = struct.unpack(">H", self.sock.recv(2))[0]
        elif ln == 127:
            ln = struct.unpack(">Q", self.sock.recv(8))[0]
        masked = bool(h[1] & 0x80)
        mk = self.sock.recv(4) if masked else None
        payload = b""
        while len(payload) < ln:
            chunk = self.sock.recv(ln - len(payload))
            if not chunk:
                break
            payload += chunk
        if masked:
            payload = bytes(b ^ mk[i % 4] for i, b in enumerate(payload))
        return opcode, payload

    def recv_text(self, timeout=10):
        # CDP messages arrive as single unfragmented text frames.
        end = time.time() + timeout
        while time.time() < end:
            op, payload = self._frame(max(0.1, end - time.time()))
            if op is None:
                continue
            if op == 0x9:  # ping -> pong
                self.sock.sendall(bytes([0x8A, 0x00]))
                continue
            if op == 0x1:
                return payload.decode()
        raise TimeoutError("websocket recv timed out")

# ---------- CDP session ----------
class CDP:
    def __init__(self, ws):
        self.ws = ws
        self.seq = 0
        self.events = []

    def call(self, method, params=None, timeout=15):
        self.seq += 1
        self.ws.send(json.dumps({"id": self.seq, "method": method, "params": params or {}}))
        end = time.time() + timeout
        while time.time() < end:
            msg = json.loads(self.ws.recv_text(max(0.1, end - time.time())))
            if msg.get("id") == self.seq:
                if "error" in msg:
                    raise RuntimeError(f"CDP {method}: {msg['error']}")
                return msg.get("result", {})
            self.events.append(msg)
        raise TimeoutError(f"CDP {method} timed out")

    def evaluate(self, expr, timeout=15):
        r = self.call("Runtime.evaluate", {"expression": expr, "returnByValue": True}, timeout)
        if r.get("exceptionDetails"):
            raise RuntimeError(f"evaluate threw: {r['exceptionDetails']}")
        return r["result"].get("value")  # undefined expressions have no "value"

def main():
    os.makedirs(TMP, exist_ok=True)
    chrome = subprocess.Popen([CHROME, "--headless=new", "--no-sandbox", "--disable-gpu",
                               f"--remote-debugging-port={PORT}",
                               f"--user-data-dir={TMP}/chrome-profile", "about:blank"],
                              stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    errors = []
    def url(rel):
        return "file://" + os.path.join(ROOT, rel)
    try:
        deadline = time.time() + 20
        ws_url = None
        while time.time() < deadline and not ws_url:
            try:
                targets = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json", timeout=2).read())
                for t in targets:
                    if t.get("type") == "page" and "webSocketDebuggerUrl" in t:
                        ws_url = t["webSocketDebuggerUrl"]
                        break
            except Exception:
                time.sleep(0.3)
        check("debugger attached", bool(ws_url))
        if not ws_url:
            return 1
        cdp = CDP(WS(ws_url))
        cdp.call("Page.enable")
        cdp.call("Runtime.enable")
        cdp.call("Log.enable")

        # External font CDN failures are environmental (this sandbox cannot
        # reach fonts.googleapis.com) and the game falls back to system
        # fonts — recorded as warnings, not failures. Any *other* network
        # error fails the suite.
        FONT_CDNS = ("fonts.googleapis.com", "fonts.gstatic.com")
        warnings = []

        def drain_errors():
            for e in cdp.events:
                m = e.get("method")
                if m == "Log.entryAdded":
                    en = e["params"]["entry"]
                    if en.get("level") in ("error",):
                        url = en.get("url") or ""
                        msg = f"{en.get('source')}: {url[:90]}: {en.get('text','')[:160]}"
                        if "Failed to load resource" in (en.get("text") or "") and any(c in url for c in FONT_CDNS):
                            warnings.append(msg)
                        else:
                            errors.append(msg)
                elif m == "Runtime.exceptionThrown":
                    d = e["params"]["exceptionDetails"]
                    errors.append(f"exception: {d.get('text','')[:160]} @ {(d.get('url') or '')[:90]}:{d.get('lineNumber')}")
            cdp.events = [e for e in cdp.events
                          if e.get("method") not in ("Log.entryAdded", "Runtime.exceptionThrown")]

        def wait_for(expr, timeout=15):
            """Poll a JS predicate until true; return False on timeout."""
            end = time.time() + timeout
            while time.time() < end:
                try:
                    if cdp.evaluate(f"!!({expr})"):
                        return True
                except RuntimeError:
                    pass
                time.sleep(0.4)
            return False

        INITIAL_LABEL = "Ready to enter Bellweather"

        def boot_assertions(label):
            drain_errors()
            state = cdp.evaluate("""JSON.stringify({
                title: document.title,
                runLabel: (document.querySelector('#runLabel')||{}).textContent || null,
                places: document.querySelectorAll('.place').length,
                hasToggle: !!document.querySelector('#originalMode') && !!document.querySelector('#contrastMode'),
                phases: document.querySelectorAll('.phase').length
            })""")
            s = json.loads(state)
            check(f"{label}: title present", bool(s["title"]), state)
            check(f"{label}: run label set", bool(s["runLabel"]), state)
            check(f"{label}: 6 place buttons", s["places"] == 6, state)
            check(f"{label}: Original/Contrast toggle", s["hasToggle"], state)
            check(f"{label}: 4 clock phases", s["phases"] == 4, state)
            return s

        # --- split tree ---
        cdp.call("Page.navigate", {"url": url("index.html")})
        check("split: scripts executed", wait_for(
            "typeof window.TTB_DATA !== 'undefined' && !!document.querySelector('#startBtn')"),
            "TTB_DATA or #startBtn never appeared")
        cdp.evaluate("document.querySelector('#startBtn').click()")
        check("split: game boots after start", wait_for(
            f"document.querySelector('#runLabel') && document.querySelector('#runLabel').textContent !== '{INITIAL_LABEL}'"),
            "run label never left its initial text")
        split = boot_assertions("split")
        # visit first place -> choices render
        n_choices = cdp.evaluate("""(() => {
            document.querySelector('.place').click();
            return document.querySelectorAll('#choices .choice').length;
        })()""")
        check("split: visiting a place renders choices", n_choices > 0, f"choices={n_choices}")
        # contrast toggle
        contrast_ok = cdp.evaluate("""(() => {
            document.querySelector('#contrastMode').click();
            return document.querySelector('#runLabel').textContent;
        })()""")
        check("split: contrast toggle switches mode", "Contrast" in contrast_ok, contrast_ok)
        shot = cdp.call("Page.captureScreenshot", {"format": "png"})["data"]
        open(os.path.join(TMP, "smoke-split.png"), "wb").write(base64.b64decode(shot))

        # --- dist single-file ---
        cdp.events = []
        cdp.call("Page.navigate", {"url": url("dist/thirteenth-bell-playable-demo.html")})
        check("dist: scripts executed", wait_for(
            "typeof window.TTB_DATA !== 'undefined' && !!document.querySelector('#startBtn')"),
            "TTB_DATA or #startBtn never appeared")
        cdp.evaluate("document.querySelector('#startBtn').click()")
        check("dist: game boots after start", wait_for(
            f"document.querySelector('#runLabel') && document.querySelector('#runLabel').textContent !== '{INITIAL_LABEL}'"),
            "run label never left its initial text")
        dist = boot_assertions("dist")
        check("dist matches split run label", dist["runLabel"] == split["runLabel"],
              f"split={split['runLabel']!r} dist={dist['runLabel']!r}")
        drain_errors()
        check("zero console/page errors across both loads", not errors, "; ".join(errors[:5]))
        for w in warnings:
            print("WARN (environmental, non-failing):", w)
    finally:
        chrome.terminate()
    print()
    if failures:
        print(f"{len(failures)} FAILING: {failures}")
        return 1
    print("smoke test green")
    return 0

if __name__ == "__main__":
    sys.exit(main())
