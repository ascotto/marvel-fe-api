type Price ={
  price: number
}

export const getLowestPrice = (prices:Price[]) : number => {
  const pricesArray = prices.map((price) => price.price)
  return Math.min(...pricesArray)
}

export const displayPrice = (prices: Price[]) : number | string => {
  const price = getLowestPrice(prices)

  if (prices[0].price === 0) {
    return 'N/A'
  } else {
    return `${price} €`
  }
}
