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

export default router
