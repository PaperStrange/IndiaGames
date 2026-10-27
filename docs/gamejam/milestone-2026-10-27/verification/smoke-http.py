#!/usr/bin/env python3
"""Run the existing Thirteenth Bell smoke assertions over its documented HTTP transport."""
import functools
import importlib.util
import os
from pathlib import Path
import socket
import sys
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import quote, unquote, urlsplit

root = Path(sys.argv[1] if len(sys.argv) > 1 else "/workspace/IndiaGames").resolve()
os.environ.setdefault("CHROME_BIN", "/usr/bin/chromium")
spec = importlib.util.spec_from_file_location("repository_smoke", root / "tests/smoke_cdp.py")
suite = importlib.util.module_from_spec(spec)
spec.loader.exec_module(suite)
suite.TMP = os.environ.get("BELL_SMOKE_TMP", "/workspace/indiagames-env/results/bell-smoke")
with socket.socket() as reservation:
    reservation.bind(("127.0.0.1", 0))
    suite.PORT = reservation.getsockname()[1]


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def do_GET(self):
        # HTTP browsers request this implicitly; the game declares no favicon.
        if self.path == "/favicon.ico":
            self.send_response(204)
            self.end_headers()
            return
        super().do_GET()


server = ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Handler, directory=str(root)))
thread = threading.Thread(target=server.serve_forever, daemon=True)
thread.start()
base_call = suite.CDP.call


def http_call(self, method, params=None, timeout=15):
    if method == "Page.navigate" and params and params.get("url", "").startswith("file://"):
        relative = Path(unquote(urlsplit(params["url"]).path)).resolve().relative_to(root)
        params = dict(params, url=f"http://127.0.0.1:{server.server_port}/{quote(relative.as_posix())}")
    return base_call(self, method, params, timeout)


suite.CDP.call = http_call
try:
    sys.exit(suite.main())
finally:
    server.shutdown()
    server.server_close()
    thread.join()
