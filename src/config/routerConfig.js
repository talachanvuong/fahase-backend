import { Router } from 'express'
import passportRoutes from '../routes/passportRoutes.js'

const router = Router()

router.use('/passport', passportRoutes)

export default router
