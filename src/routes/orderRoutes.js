import { Router } from 'express'
import orderController from '../controllers/orderController.js'
import asyncMiddleware from '../middlewares/asyncMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import errorMiddleware from '../middlewares/errorMiddleware.js'

const router = Router()

router.post(
  '/create',
  authMiddleware.userRequired,
  asyncMiddleware(orderController.create),
  errorMiddleware
)

router.post(
  '/capture/:orderID',
  authMiddleware.userRequired,
  asyncMiddleware(orderController.capture),
  errorMiddleware
)

router.post(
  '/cancel/:orderID',
  authMiddleware.userRequired,
  asyncMiddleware(orderController.cancel),
  errorMiddleware
)

router.get(
  '/getAllByUser',
  authMiddleware.userRequired,
  asyncMiddleware(orderController.getAllByUser),
  errorMiddleware
)

router.get(
  '/getAllByAdmin',
  authMiddleware.adminRequired,
  asyncMiddleware(orderController.getAllByAdmin),
  errorMiddleware
)

router.get(
  '/getDetail/:order',
  authMiddleware.userRequired,
  asyncMiddleware(orderController.getDetail),
  errorMiddleware
)

router.get(
  '/getDetailByAdmin/:order',
  authMiddleware.adminRequired,
  asyncMiddleware(orderController.getDetailByAdmin),
  errorMiddleware
)

export default router
