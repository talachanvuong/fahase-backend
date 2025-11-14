import { Router } from 'express'
import commentController from '../controllers/commentController.js'
import asyncMiddleware from '../middlewares/asyncMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import errorMiddleware from '../middlewares/errorMiddleware.js'

const router = Router()

router.post(
  '/add',
  authMiddleware.userRequired,
  asyncMiddleware(commentController.add),
  errorMiddleware
)

router.get(
  '/getAllByProduct/:product',
  asyncMiddleware(commentController.getAllByProduct),
  errorMiddleware
)

export default router
