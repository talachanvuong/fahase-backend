import { Router } from 'express'
import categoryController from '../controllers/categoryController.js'
import asyncMiddleware from '../middlewares/asyncMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import errorMiddleware from '../middlewares/errorMiddleware.js'

const router = Router()

router.get(
  '/getAll',
  authMiddleware.tokenRequired,
  asyncMiddleware(categoryController.getAll),
  errorMiddleware
)

router.get(
  '/getById/:_id',
  authMiddleware.tokenRequired,
  asyncMiddleware(categoryController.getById),
  errorMiddleware
)

router.post(
  '/add',
  authMiddleware.tokenRequired,
  asyncMiddleware(categoryController.add),
  errorMiddleware
)

router.delete(
  '/remove/:_id',
  authMiddleware.tokenRequired,
  asyncMiddleware(categoryController.remove),
  errorMiddleware
)

export default router
