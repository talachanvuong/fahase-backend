import { Router } from 'express'
import boughtController from '../controllers/boughtController.js'
import asyncMiddleware from '../middlewares/asyncMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import errorMiddleware from '../middlewares/errorMiddleware.js'

const router = Router()

router.get(
  '/isBought/:product',
  authMiddleware.tokenRequired,
  asyncMiddleware(boughtController.isBought),
  errorMiddleware
)

export default router
