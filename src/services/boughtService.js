import Bought from '../models/Bought.js'

const add = async (data) => {
  const bought = new Bought(data)
  await bought.save()
}

const isBought = async (user, product) => {
  return await Bought.exists({ user, product })
}

export default {
  add,
  isBought,
}
