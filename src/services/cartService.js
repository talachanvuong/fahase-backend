import Cart from '../models/Cart.js'

const get = async (user) => {
  const carts = await Cart.find({ user })
    .select('product -_id')
    .populate('product', 'title price isDiscontinued')

  const products = []

  for (const cart of carts) {
    const product = cart.product

    if (product.isDiscontinued) {
      await remove(user, product._id)
      continue
    }

    products.push({
      _id: product._id,
      title: product.title,
      price: product.price,
      thumbnail: `/api/blob/thumbnailPublic/${product._id}`,
    })
  }

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

const clear = async (user) => {
  await Cart.deleteMany({ user })
}

export default {
  get,
  containProduct,
  add,
  remove,
  clear,
}
