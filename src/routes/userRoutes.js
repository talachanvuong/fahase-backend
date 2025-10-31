import { Router } from 'express'
import userController from '../controllers/userController.js'
import asyncMiddleware from '../middlewares/asyncMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import errorMiddleware from '../middlewares/errorMiddleware.js'

const router = Router()

router.get(
  '/me',
  authMiddleware.tokenRequired,
  asyncMiddleware(userController.me),
  errorMiddleware
)

router.get(
  '/logout',
  authMiddleware.tokenRequired,
  asyncMiddleware(userController.logout),
  errorMiddleware
)

export default router
