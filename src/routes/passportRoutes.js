import { Router } from 'express'
import passportController from '../controllers/passportController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/login', authMiddleware.notUserRequired, passportController.login)

router.get(
  '/authorized',
  authMiddleware.notUserRequired,
  passportController.authorized
)

export default router
