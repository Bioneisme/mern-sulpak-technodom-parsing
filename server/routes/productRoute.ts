import {Router} from "express";
import {getAllProducts} from "../controllers/productController";

const router: Router = Router();

router.get('/getAllProducts', getAllProducts);

export default router;