export function generateRandomDecimalInRangeFormatted(min: number, max: number, places: number) {
  const value = (Math.random() * (max - min + 1)) + min;
  return Number.parseFloat(value.toFixed(places));
}
