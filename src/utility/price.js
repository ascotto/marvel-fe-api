export const getLowestPrice = (prices) => {
  const pricesArray = prices.map((price) => price.price)
  return Math.min(...pricesArray)
}

export const displayPrice = (prices) => {
  const price = getLowestPrice(prices)

  if (prices[0].price === 0) {
    return 'N/A'
  } else {
    return `${price} €`
  }
}
