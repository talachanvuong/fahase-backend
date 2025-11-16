import { Router } from 'express'
import adminController from '../controllers/adminController.js'
import asyncMiddleware from '../middlewares/asyncMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import errorMiddleware from '../middlewares/errorMiddleware.js'

const router = Router()

router.post('/create', asyncMiddleware(adminController.create), errorMiddleware)

router.post(
  '/login',
  authMiddleware.notAdminRequired,
  asyncMiddleware(adminController.login),
  errorMiddleware
)

router.post(
  '/logout',
  authMiddleware.adminRequired,
  asyncMiddleware(adminController.logout),
  errorMiddleware
)

router.get(
  '/me',
  authMiddleware.adminRequired,
  asyncMiddleware(adminController.me),
  errorMiddleware
)

router.get(
  '/getReport',
  authMiddleware.adminRequired,
  asyncMiddleware(adminController.getReport),
  errorMiddleware
)

export default router
