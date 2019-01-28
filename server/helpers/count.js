const totalPrice = (array) => {
  let newArray = array.map(count => {
    return count.quantity * count.productId.price
  })
  return newArray.reduce((a,b) => {
    return a + b
  })
}

module.exports = { totalPrice }