'use client';
import { useEffect, useRef } from 'react';
import { PAPER_VERTEX_SHADER, PAPER_FRAGMENT_SHADER } from '@/lib/paper-shaders';

type LightingOptions = { candlelight?: boolean; warmth?: number; visible?: boolean };

export function PaperLight({ candlelight = true, warmth = 65, visible = true }: LightingOptions) {
    const canvas = useRef<HTMLCanvasElement>(null);
    const options = useRef({ candlelight, warmth, visible });
    const requestDraw = useRef<() => void>(() => {});
    options.current = { candlelight, warmth, visible };

    useEffect(() => {
        const node = canvas.current;
        if (!node) return;
        const gl = node.getContext('webgl', { alpha: true, antialias: false, preserveDrawingBuffer: true });
        if (!gl) { node.dataset.renderer = 'css'; return; }
        const compile = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) throw new Error('Paper shader allocation failed.');
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                const message = gl.getShaderInfoLog(shader);
                gl.deleteShader(shader);
                throw new Error(`Paper shader compilation failed: ${message}`);
            }
            return shader;
        };
        const vertex = compile(gl.VERTEX_SHADER, PAPER_VERTEX_SHADER);
        const fragment = compile(gl.FRAGMENT_SHADER, PAPER_FRAGMENT_SHADER);
        const program = gl.createProgram();
        if (!program) throw new Error('Paper lighting allocation failed.');
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Paper lighting could not link.');
        const buffer = gl.createBuffer(), texture = gl.createTexture();
        if (!buffer || !texture) throw new Error('Paper material allocation failed.');
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const time = gl.getUniformLocation(program, 'time');
        const warm = gl.getUniformLocation(program, 'warm');
        const candle = gl.getUniformLocation(program, 'candle');
        const hand = gl.getUniformLocation(program, 'hand');
        let handX = .5, handY = .5, handVisible = 0;
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        const mobile = matchMedia('(pointer: coarse)');
        let disposed = false, ready = false, inView = true, frame = 0, last = -Infinity;

        // 限制像素数量和刷新频率；隐藏页面与静态模式不持续申请动画帧。
        const draw = (timestamp: number) => {
            frame = 0;
            if (disposed || !ready || !inView || !options.current.visible || gl.isContextLost()) return;
            if (timestamp - last >= (mobile.matches ? 66 : 42)) {
                last = timestamp;
                gl.viewport(0, 0, node.width, node.height);
                gl.uniform1f(time, reduced.matches ? 0 : timestamp / 1000);
                gl.uniform1f(warm, options.current.warmth / 100);
                gl.uniform1f(candle, options.current.candlelight ? 1 : 0);
                gl.uniform3f(hand, handX, handY, reduced.matches ? 0 : handVisible);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
            if (options.current.candlelight && !reduced.matches) frame = requestAnimationFrame(draw);
        };
        const redraw = () => {
            cancelAnimationFrame(frame);
            last = -Infinity;
            if (!disposed) frame = requestAnimationFrame(draw);
        };
        requestDraw.current = redraw;
        const surface = node.parentElement!;
        const moveHand = (event: PointerEvent) => {
            const rect = surface.getBoundingClientRect();
            handX = (event.clientX - rect.left) / rect.width;
            handY = (event.clientY - rect.top) / rect.height;
            handVisible = event.pointerType === 'touch' ? 0 : 1;
            if (!frame) redraw();
        };
        const leaveHand = () => { handVisible = 0; redraw(); };
        surface.addEventListener('pointermove', moveHand);
        surface.addEventListener('pointerleave', leaveHand);
        const resize = new ResizeObserver(entries => {
            const rect = entries[0]?.contentRect;
            if (!rect || !rect.width || !rect.height) return;
            const scale = Math.min(1, (mobile.matches ? 400 : 640) / rect.width, 1000 / rect.height);
            node.width = Math.max(1, Math.round(rect.width * scale));
            node.height = Math.max(1, Math.round(rect.height * scale));
            redraw();
        });
        resize.observe(node);
        const observer = new IntersectionObserver(entries => {
            inView = entries[0]?.isIntersecting === true;
            redraw();
        });
        observer.observe(node);
        const image = new Image();
        image.onload = () => {
            if (disposed) return;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            ready = true;
            node.dataset.renderer = 'webgl';
            redraw();
        };
        image.src = '/materials/vellum-alpha-02.webp';
        const lost = () => { cancelAnimationFrame(frame); node.style.opacity = '0'; };
        node.addEventListener('webglcontextlost', lost);
        reduced.addEventListener('change', redraw);
        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            requestDraw.current = () => {};
            image.onload = null;
            resize.disconnect(); observer.disconnect();
            surface.removeEventListener('pointermove', moveHand);
            surface.removeEventListener('pointerleave', leaveHand);
            reduced.removeEventListener('change', redraw);
            node.removeEventListener('webglcontextlost', lost);
            gl.deleteTexture(texture); gl.deleteBuffer(buffer); gl.deleteProgram(program);
            gl.deleteShader(vertex); gl.deleteShader(fragment);
        };
    }, []);

    useEffect(() => requestDraw.current(), [candlelight, warmth, visible]);
    return <canvas ref={canvas} className="paper-light-canvas" aria-hidden="true" />;
}
