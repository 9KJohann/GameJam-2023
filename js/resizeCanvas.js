export function resizeCanvas() {
    const width = window.outerWidth * 1 / 1.25;
    const height = window.outerHeight;

    const min = Math.min(width, height);

    canvas.width = min * 1.25;
    canvas.height = min;

    console.debug("resizeCanvas", canvas.height, canvas.width);
}