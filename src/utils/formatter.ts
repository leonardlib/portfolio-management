/**
 * Formats a numeric value as MXN currency for portfolio amounts.
 */
export function currencyFormatter(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats share quantities with two decimal places for compact display.
 */
export function shareFormatter(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
