import { Router } from 'express'
import productController from '../controllers/productController.js'
import asyncMiddleware from '../middlewares/asyncMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import errorMiddleware from '../middlewares/errorMiddleware.js'

const router = Router()

router.get(
  '/getAllByCategory/:category',
  authMiddleware.tokenRequired,
  asyncMiddleware(productController.getAllByCategory),
  errorMiddleware
)

router.post(
  '/add',
  authMiddleware.tokenRequired,
  asyncMiddleware(productController.add),
  errorMiddleware
)

router.get(
  '/getById/:_id',
  authMiddleware.tokenRequired,
  asyncMiddleware(productController.getById),
  errorMiddleware
)

router.patch(
  '/update/:_id',
  authMiddleware.tokenRequired,
  asyncMiddleware(productController.update),
  errorMiddleware
)

export default router
