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

router.get(
  '/thumbnailBought/:orderItem',
  authMiddleware.userRequired,
  asyncMiddleware(blobController.thumbnailBought),
  errorMiddleware
)

router.get(
  '/fileBought/:orderItem',
  authMiddleware.userRequired,
  asyncMiddleware(blobController.fileBought),
  errorMiddleware
)

router.get(
  '/thumbnailBoughtAdmin/:orderItem',
  authMiddleware.adminRequired,
  asyncMiddleware(blobController.thumbnailBoughtAdmin),
  errorMiddleware
)

router.get(
  '/fileBoughtAdmin/:orderItem',
  authMiddleware.adminRequired,
  asyncMiddleware(blobController.fileBoughtAdmin),
  errorMiddleware
)

export default router
