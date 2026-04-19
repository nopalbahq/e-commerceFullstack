export function currencyFormat(price: number) {
  return "$" + (price / 100).toFixed(2);
}
