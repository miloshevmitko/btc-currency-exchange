// Note: The locale should be detected from the user browser settings or the user settings within the web app
export function formatToCurrency(value: number, currency: string, locale?: string): string {
  return new Intl.NumberFormat(locale ?? 'en-US', {
    style: 'currency',
    currency,
  }).format(value);
}