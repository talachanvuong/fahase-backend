import { OrdersController } from '@paypal/paypal-server-sdk'
import client from '../config/paypalConfig.js'
import boughtService from '../services/boughtService.js'
import cartService from '../services/cartService.js'
import orderService from '../services/orderService.js'
import { STATUS_CODE } from '../utils/constantUtils.js'
import { convertPrice } from '../utils/convertUtils.js'
import { sendResponse } from '../utils/responseUtils.js'

const create = async (req, res) => {
  const { _id: user } = req.user
  const cart = await cartService.get(user)

  const { products, price } = cart

  if (products.length === 0) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Giỏ hàng trống')
  }

  const filtered_products = products.map((product) => product._id)

  const ordersController = new OrdersController(client)

  const collect = {
    body: {
      intent: 'CAPTURE',
      purchaseUnits: [
        {
          amount: {
            currencyCode: 'USD',
            value: convertPrice(price),
          },
        },
      ],
    },
    prefer: 'return=minimal',
  }

  let paypalOrder

  try {
    const { result } = await ordersController.createOrder(collect)
    paypalOrder = result.id
  } catch (err) {
    throw new Error(JSON.parse(err.body).details[0].issue)
  }

  await orderService.create(user, paypalOrder, filtered_products)

  await cartService.clear(user)

  return sendResponse(res, STATUS_CODE.SUCCESS, paypalOrder)
}

const capture = async (req, res) => {
  const { _id: user } = req.user
  const { orderID } = req.params

  const order = await orderService.getByPayPalOrder(user, orderID)

  if (!order) {
    return sendResponse(res, STATUS_CODE.NOT_FOUND, 'Đơn hàng không tồn tại')
  }

  if (order.state === 'Thất bại') {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Đơn hàng đã bị hủy')
  }

  if (order.state === 'Thành công') {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Đơn hàng đã thanh toán')
  }

  const ordersController = new OrdersController(client)

  const collect = {
    id: orderID,
    prefer: 'return=minimal',
  }

  try {
    await ordersController.captureOrder(collect)
  } catch (err) {
    const issue = JSON.parse(err.body).details[0].issue

    await orderService.update(order, 'Thất bại')

    return sendResponse(
      res,
      STATUS_CODE.BAD_REQUEST,
      `Thanh toán thất bại (${issue})`
    )
  }

  await orderService.update(order, 'Thành công')

  const orderItems = await orderService.getOrderItemsById(order)

  await Promise.all(
    orderItems.map(async (orderItem) => {
      await boughtService.add({
        user,
        product: orderItem.product,
      })
    })
  )

  return sendResponse(res, STATUS_CODE.SUCCESS, 'Thanh toán thành công')
}

const cancel = async (req, res) => {
  const { _id: user } = req.user
  const { orderID } = req.params

  const order = await orderService.getByPayPalOrder(user, orderID)

  if (!order) {
    return sendResponse(res, STATUS_CODE.NOT_FOUND, 'Đơn hàng không tồn tại')
  }

  if (order.state === 'Thất bại') {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Đơn hàng đã bị hủy')
  }

  if (order.state === 'Thành công') {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Đơn hàng đã thanh toán')
  }

  await orderService.update(order, 'Thất bại')

  return sendResponse(res, STATUS_CODE.SUCCESS, 'Hủy đơn hàng thành công')
}

export default {
  create,
  capture,
  cancel,
}
