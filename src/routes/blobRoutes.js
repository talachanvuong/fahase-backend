import { Router } from 'express'
import blobController from '../controllers/blobController.js'
import asyncMiddleware from '../middlewares/asyncMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import errorMiddleware from '../middlewares/errorMiddleware.js'

const router = Router()

router.get(
  '/thumbnailPublic/:product',
  asyncMiddleware(blobController.thumbnailPublic),
  errorMiddleware
)

router.get(
  '/fileAdmin/:product',
  authMiddleware.adminRequired,
  asyncMiddleware(blobController.fileAdmin),
  errorMiddleware
)

export default router
