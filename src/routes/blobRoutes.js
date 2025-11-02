import { Router } from 'express'
import blobController from '../controllers/blobController.js'
import asyncMiddleware from '../middlewares/asyncMiddleware.js'
import errorMiddleware from '../middlewares/errorMiddleware.js'

const router = Router()

router.get(
  '/thumbnail/:product',
  asyncMiddleware(blobController.thumbnail),
  errorMiddleware
)

export default router
