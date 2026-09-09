export type PlanePoint = { x: number; y: number };

/** Inverse homography: viewport coordinates back to an angled sheet, including CSS perspective.
 * Corner order is top-left, top-right, bottom-right, bottom-left. */
export function paperProjection(corners: PlanePoint[]): (x: number, y: number) => PlanePoint {
    const origin = corners[0], scale = Math.max(1, ...corners.map(p => Math.hypot(p.x - origin.x, p.y - origin.y)));
    const targets = [[0, 0], [1, 0], [1, 1], [0, 1]];
    const rows: number[][] = [];
    corners.forEach((p, i) => {
        const x = (p.x - origin.x) / scale, y = (p.y - origin.y) / scale, [u, v] = targets[i];
        rows.push([x, y, 1, 0, 0, 0, -u * x, -u * y, u]);
        rows.push([0, 0, 0, x, y, 1, -v * x, -v * y, v]);
    });
    for (let c = 0; c < 8; c++) {
        let pivot = c;
        for (let r = c + 1; r < 8; r++) if (Math.abs(rows[r][c]) > Math.abs(rows[pivot][c])) pivot = r;
        [rows[c], rows[pivot]] = [rows[pivot], rows[c]];
        const divisor = rows[c][c];
        if (Math.abs(divisor) < 1e-10) throw new Error('The paper has no measurable surface.');
        for (let j = c; j < 9; j++) rows[c][j] /= divisor;
        for (let r = 0; r < 8; r++) if (r !== c) {
            const factor = rows[r][c];
            for (let j = c; j < 9; j++) rows[r][j] -= factor * rows[c][j];
        }
    }
    const h = rows.map(r => r[8]);
    return (screenX, screenY) => {
        const x = (screenX - origin.x) / scale, y = (screenY - origin.y) / scale, w = h[6] * x + h[7] * y + 1;
        return { x: (h[0] * x + h[1] * y + h[2]) / w, y: (h[3] * x + h[4] * y + h[5]) / w };
    };
}

export function measurePaper(element: HTMLElement) {
    const corners = Array.from(element.querySelectorAll<HTMLElement>(':scope > .plane-corner')).map(el => {
        const rect = el.getBoundingClientRect(); return { x: rect.x, y: rect.y };
    });
    if (corners.length === 4) return paperProjection(corners);
    const rect = element.getBoundingClientRect();
    return (x: number, y: number) => ({ x: (x - rect.left) / rect.width, y: (y - rect.top) / rect.height });
}
