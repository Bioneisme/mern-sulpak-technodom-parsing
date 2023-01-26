import {Router} from "express";
import {generalParser, startParser} from "../controllers/parserController";

const router: Router = Router();

router.post('/startParse', startParser);
router.get('/startGeneralParse', generalParser);

export default router;