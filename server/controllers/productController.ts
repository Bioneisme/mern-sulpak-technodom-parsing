import {NextFunction, Request, Response} from "express";
import logger from "../config/logger";
import ProductModel from "../models/productModel";

export async function getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
        const products = await ProductModel.find();
        if (!products) {
            res.status(404).json({error: true, message: 'products_not_found'});
        } else {
            res.send(products);
        }

        return next();
    } catch (e) {
        logger.error(`getAllProducts: ${e}`);
        res.status(400).json({error: true, message: e});
        return next();
    }
}
