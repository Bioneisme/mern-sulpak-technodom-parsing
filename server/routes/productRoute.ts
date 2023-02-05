import {Router} from "express";
import {
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct
} from "../controllers/productController";

const router: Router = Router();

router.get('/getAllProducts', getAllProducts);
router.get('/getProductById/:id', getProductById);
router.post('/createProduct', createProduct);
router.patch('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);


export default router;