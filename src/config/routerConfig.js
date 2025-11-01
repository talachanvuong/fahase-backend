import { Router } from 'express'
import categoryRoutes from '../routes/categoryRoutes.js'
import passportRoutes from '../routes/passportRoutes.js'
import productRoutes from '../routes/productRoutes.js'
import userRoutes from '../routes/userRoutes.js'

const router = Router()

router.use('/category', categoryRoutes)
router.use('/passport', passportRoutes)
router.use('/product', productRoutes)
router.use('/user', userRoutes)

export default router
