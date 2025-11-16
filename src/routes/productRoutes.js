import { Router } from 'express'
import productController from '../controllers/productController.js'
import asyncMiddleware from '../middlewares/asyncMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import errorMiddleware from '../middlewares/errorMiddleware.js'

const router = Router()

router.get(
  '/getAllByCategory/:category',
  asyncMiddleware(productController.getAllByCategory),
  errorMiddleware
)

router.post(
  '/add',
  authMiddleware.adminRequired,
  asyncMiddleware(productController.add),
  errorMiddleware
)

router.get(
  '/getById/:_id',
  asyncMiddleware(productController.getById),
  errorMiddleware
)

router.patch(
  '/update/:_id',
  authMiddleware.adminRequired,
  asyncMiddleware(productController.update),
  errorMiddleware
)

router.get('/find', asyncMiddleware(productController.find), errorMiddleware)

router.get(
  '/getAllByAdmin',
  authMiddleware.adminRequired,
  asyncMiddleware(productController.getAllByAdmin),
  errorMiddleware
)

router.get(
  '/getByIdByAdmin/:_id',
  authMiddleware.adminRequired,
  asyncMiddleware(productController.getByIdByAdmin),
  errorMiddleware
)

export default router
