export function resizeCanvas() {
    const aspectRatio = 5 / 4;
    const width = window.innerWidth / aspectRatio;
    const height = window.innerHeight;

    const min = Math.min(width, height);

    if (min > 0) {
        canvas.width = min * aspectRatio;
        canvas.height = min;
    }

    console.debug("resizeCanvas", canvas.height, canvas.width);
}