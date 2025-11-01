import Cart from '../models/Cart.js'

const get = async (user) => {
  const carts = await Cart.find({ user })
    .select('product -_id')
    .populate('product', 'title price thumbnail')

  const products = carts.map((cart) => cart.product)
  const quantity = products.length
  const price = products.reduce((acc, curr) => acc + curr.price, 0)

  return { products, quantity, price }
}

const containProduct = async (user, product) => {
  return await Cart.exists({ user, product })
}

const add = async (data) => {
  const cart = new Cart(data)
  await cart.save()
}

const remove = async (user, product) => {
  await Cart.deleteOne({ user, product })
}

export default {
  get,
  containProduct,
  add,
  remove,
}
