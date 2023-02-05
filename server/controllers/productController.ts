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

export async function getProductById(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;
        const product = await ProductModel.findById(id);
        if (!product) {
            res.status(404).json({error: true, message: 'product_not_found'});
        }
        res.send(product);
        return next();
    } catch (e) {
        logger.error(`getProductById: ${e}`);
        res.status(400).json({error: true, message: e});
        return next();
    }
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const product = await ProductModel.create(req.body);
        res.send(product);
        return next();
    } catch (e) {
        logger.error(`createProduct: ${e}`);
        res.status(400).json({error: true, message: e});
        return next();
    }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const product = await ProductModel.updateOne({_id: req.params.id}, req.body);
        res.send(product);
        return next();
    } catch (e) {
        logger.error(`updateProduct: ${e}`);
        res.status(400).json({error: true, message: e});
        return next();
    }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const product = await ProductModel.deleteOne({_id: req.params.id});
        res.send(product);
        return next();
    } catch (e) {
        logger.error(`deleteProduct: ${e}`);
        res.status(400).json({error: true, message: e});
        return next();
    }
}