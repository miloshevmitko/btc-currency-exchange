/**
 * Checks the provided vlaue is not null or undefined.
 * It preserves the type when used in array chain methods.
 */
export function isNotNullOrUndefined<T>(value?: T | null): value is T {
  return value !== undefined && value !== null;
}
