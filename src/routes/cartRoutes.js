import { Router } from 'express'
import cartController from '../controllers/cartController.js'
import asyncMiddleware from '../middlewares/asyncMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import errorMiddleware from '../middlewares/errorMiddleware.js'

const router = Router()

router.get(
  '/get',
  authMiddleware.tokenRequired,
  asyncMiddleware(cartController.get),
  errorMiddleware
)

router.post(
  '/add',
  authMiddleware.tokenRequired,
  asyncMiddleware(cartController.add),
  errorMiddleware
)

router.delete(
  '/remove/:product',
  authMiddleware.tokenRequired,
  asyncMiddleware(cartController.remove),
  errorMiddleware
)

export default router
