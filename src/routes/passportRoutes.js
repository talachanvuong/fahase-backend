import { Router } from 'express'
import passportController from '../controllers/passportController.js'

const router = Router()

router.get('/login', passportController.login)

router.get('/authorized', passportController.authorized)

export default router
