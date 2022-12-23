// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
type RGB = [number, number, number];
export function hexToRgb(hex: string): RGB | undefined {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : undefined;
}

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex([r, g, b]: RGB): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// blend colors
const colorBlendMap: Map<string, string> = new Map();

export function colorBlend(fg: string, bg: string, alpha: number): string {
  const a = parseFloat(alpha.toFixed(2));
  const key = `${fg}-${bg}-${a}`;
  if (colorBlendMap.has(key)) return colorBlendMap.get(key);

  const fgRGB = hexToRgb(fg);
  const bgRGB = hexToRgb(bg);

  if (!fgRGB || !bgRGB) console.error("poorly formatted colors", fg, bg);

  const clrRGB: RGB = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    clrRGB[i] = Math.round(a * fgRGB[i] + (1 - a) * bgRGB[i]);
    clrRGB[i] = Math.min(clrRGB[i], 255);
  }

  const clr = rgbToHex(clrRGB);

  colorBlendMap.set(key, clr);
  return clr;
}
