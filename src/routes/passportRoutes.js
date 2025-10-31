import { Router } from 'express'
import passportController from '../controllers/passportController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/login', authMiddleware.anonymousRequired, passportController.login)

router.get(
  '/authorized',
  authMiddleware.anonymousRequired,
  passportController.authorized
)

export default router
