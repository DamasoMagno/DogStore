export function formatPrice(price: number) {
  const formattedPrice = new Intl.NumberFormat(
    "pt-br",
    {
      currency: "BRL",
      style: "currency"
    }
  ).format(price)

  return formattedPrice
}