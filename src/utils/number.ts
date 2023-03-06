/**
 * Get a random decimal number in a range
 * @param min The lowest possible number it should return
 * @param max The highest possible number it should return
 * @param places The number of decimal places
 * @returns Random decimal number in the provided range
 */
export function generateRandomDecimalInRangeFormatted(min: number, max: number, places: number) {
  const value = (Math.random() * (max - min + 1)) + min;
  return Number.parseFloat(value.toFixed(places));
}
