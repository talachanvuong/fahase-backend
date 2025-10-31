import { Router } from 'express'
import passportRoutes from '../routes/passportRoutes.js'
import userRoutes from '../routes/userRoutes.js'

const router = Router()

router.use('/passport', passportRoutes)
router.use('/user', userRoutes)

export default router
