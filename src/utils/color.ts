import tinycolor from 'tinycolor2';

export function isValidHex(hex: string) {
  return tinycolor(hex).isValid();
}
export function isTransparent(color: tinycolor.ColorInput) {
  return tinycolor(color).getAlpha() === 0
};
export function hasAlpha(color: tinycolor.ColorInput) {
  return tinycolor(color).getAlpha() < 1;
}