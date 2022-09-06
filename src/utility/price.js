const getLowestPrice = (prices) => {
  const pricesArray = prices.map((price) => price.price)
  return Math.min(...pricesArray)
}

export { getLowestPrice }
