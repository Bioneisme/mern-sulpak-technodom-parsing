import {NextFunction, Request, Response} from "express";
import {productObject, storeURLs, sulpakCategories, technoDomCategories} from "../types";
import {technoDomParser} from "../parsers/technoDomParser";
import {sulpakParser} from "../parsers/sulpakParser";
import logger from "../config/logger";
import productModel from "../models/productModel";
import {generalParserStart} from "../parsers/generalParser";


export async function startParser(req: Request, res: Response, next: NextFunction) {
    try {
        const {store, category} = req.body;
        switch (store) {
            case 'techno_dom': {
                if (category in technoDomCategories) {
                    logger.info(`TechnoDom Parser: category=${category}`)
                    const baseURL = `${storeURLs.techno_dom}/${technoDomCategories[category as keyof typeof technoDomCategories]}`
                    const data = await technoDomParser(baseURL, baseURL, category);

                    const {oldProductsTotal, newProductsTotal, parsedTotal, productsTotal} = await addProductsToDB(data);
                    res.json({oldProductsTotal, newProductsTotal, parsedTotal, productsTotal});
                } else {
                    res.status(404).json({error: 'invalid_category'});
                }
                return next();
            }
            case 'sulpak': {
                if (category in sulpakCategories) {
                    logger.info(`Sulpak Parser: category=${category}`)
                    const URL = `${storeURLs.sulpak}/f/${sulpakCategories[category as keyof typeof sulpakCategories]}`
                    const data = await sulpakParser(URL, storeURLs.sulpak, category);
                    const {oldProductsTotal, newProductsTotal, parsedTotal, productsTotal} = await addProductsToDB(data);
                    res.json({oldProductsTotal, newProductsTotal, parsedTotal, productsTotal});
                } else {
                    res.status(404).json({error: 'invalid_category'});
                }
                return next();
            }
            default: {
                res.status(404).json({error: 'invalid_store'});
                return next();
            }
        }
    } catch (e) {
        logger.error(`parser: ${e}`);
        return next();
    }
}

export async function generalParser(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await generalParserStart();
        res.json(data);
    } catch (e) {
        logger.error(`generalParser: ${e}`);
        return next();
    }
}

export async function addProductsToDB(data: productObject[]):
    Promise<{ oldProductsTotal: number, newProductsTotal: number, parsedTotal: number, productsTotal: number}> {
    try {
        let oldProductsTotal = 0, newProductsTotal = 0, parsedTotal = 0;

        for (const product of data) {
            parsedTotal++;

            const existingProduct = await productModel.findOne({link: product.link});
            if (existingProduct) {
                oldProductsTotal++;
            } else {
                newProductsTotal++;
                await productModel.create(product);
            }
        }

        const products = await productModel.find();
        return {oldProductsTotal, newProductsTotal, parsedTotal, productsTotal: products.length};
    } catch (e) {
        logger.error(`addProductsToDB: ${e}`);
        throw e;
    }
}