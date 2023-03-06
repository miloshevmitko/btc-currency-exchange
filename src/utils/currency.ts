/**
 * Format a given number to currency
 * Note: The locale should be detected from the user browser settings or the user settings within the web app
 * @param value Currency amount
 * @param currency Currency symbol
 * @param locale Locale used for format
 * @returns The number formatted as currency
 */
export function formatToCurrency(value: number, currency: string, locale?: string): string {
  return new Intl.NumberFormat(locale ?? 'en-US', {
    style: 'currency',
    currency,
  }).format(value);
}