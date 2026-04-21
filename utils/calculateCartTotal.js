function calculateCartTotal(cart) {
  return cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

module.exports = calculateCartTotal;
