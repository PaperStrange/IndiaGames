import { ORIGINAL_LIMIT, PREPARED_LIMIT, type CaptureMetadata } from './paper-capture';

export async function preparePhoto(file: File, transform: Pick<CaptureMetadata, 'rotation' | 'crop'>): Promise<Blob> {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Choose a JPEG, PNG or WebP photo. Export HEIC photos as JPEG first.');
    if (!file.size || file.size > ORIGINAL_LIMIT) throw new Error('Choose a photo under 15 MB.');
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    try {
        if (bitmap.width * bitmap.height > 60000000) throw new Error('Use a photo under 60 megapixels.');
        const sideways = transform.rotation % 180 !== 0;
        const width = sideways ? bitmap.height : bitmap.width, height = sideways ? bitmap.width : bitmap.height;
        const { left, top, right, bottom } = transform.crop;
        const cropWidth = width * (right - left), cropHeight = height * (bottom - top);
        let scale = Math.min(1, 1500 / Math.max(cropWidth, cropHeight));
        for (let attempt = 0; attempt < 8; attempt++) {
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(cropWidth * scale));
            canvas.height = Math.max(1, Math.round(cropHeight * scale));
            const context = canvas.getContext('2d', { alpha: false });
            if (!context) throw new Error('This browser could not prepare the photo.');
            context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height);
            context.scale(scale, scale);
            context.translate(width / 2 - left * width, height / 2 - top * height);
            context.rotate(transform.rotation * Math.PI / 180);
            context.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
            // Canvas 只导出像素，不把原始 EXIF 位置资料发送给 provider。
            const output = await new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Photo preparation failed.')), 'image/png'));
            if (output.size <= PREPARED_LIMIT) return output;
            scale *= .8;
        }
        throw new Error('The reading copy is too large. Crop to one page and try again.');
    } finally { bitmap.close(); }
}

export function blobDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('This source file could not be read.'));
        reader.onload = () => resolve(String(reader.result));
        reader.readAsDataURL(blob);
    });
}
