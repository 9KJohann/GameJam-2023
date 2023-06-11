export function componentToHex(x) {
    let hex = x.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbaToHex(r, g, b, a) {
    //console.log(`RGB: ${r}, ${g}, ${b}`)
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
}


export function symbolForColor(color) {

    switch (color) {
        case "#0a41beff":
            return "Wasser";
        case "#9fffe2ff":
            return "Luft";
        case "#ffc000ff":
            return "Erde";
        default:
            break;
    }
}