import { Router } from 'express'
import adminRoutes from '../routes/adminRoutes.js'
import blobRoutes from '../routes/blobRoutes.js'
import boughtRoutes from '../routes/boughtRoutes.js'
import cartRoutes from '../routes/cartRoutes.js'
import categoryRoutes from '../routes/categoryRoutes.js'
import commentRoutes from '../routes/commentRoutes.js'
import orderRoutes from '../routes/orderRoutes.js'
import passportRoutes from '../routes/passportRoutes.js'
import productRoutes from '../routes/productRoutes.js'
import userRoutes from '../routes/userRoutes.js'

const router = Router()

router.use('/admin', adminRoutes)
router.use('/blob', blobRoutes)
router.use('/bought', boughtRoutes)
router.use('/cart', cartRoutes)
router.use('/category', categoryRoutes)
router.use('/comment', commentRoutes)
router.use('/order', orderRoutes)
router.use('/passport', passportRoutes)
router.use('/product', productRoutes)
router.use('/user', userRoutes)

export default router
