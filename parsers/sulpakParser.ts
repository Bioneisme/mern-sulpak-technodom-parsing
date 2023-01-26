import {productObject} from "../types";
import needle from "needle";
import logger from "../config/logger";
import cheerio from "cheerio";

export async function sulpakParser(URL: string, baseURL: string,
                                   category: string, page: number = 1,
                                   data: productObject[] = []): Promise<productObject[]> {
    const url = page == 1 ? URL : `${URL}&page=${page}`;
    const res = await needle("get", url);
    const $ = cheerio.load(res.body);
    const results = $('[class="product__item product__item-js tile-container"]');
    results.each(function () {
        let path, title, price, image;
        path = $(this)
            .find('[class="product__item-images flex__block"]').attr('href');

        title = $(this).attr('data-name')

        price = $(this).attr('data-price')

        try {
            image = $(this)
                .find(`img[class="image-size-cls "]`).attr('src');
        } catch (e) {
            logger.warn(`Parsing (${category}): Image not found. ${e}`);
        }

        data.push({
            store: 'sulpak',
            link: baseURL + path,
            category,
            title: title || "",
            price: +(price || 500000),
            image: image || ""
        });
    });

    if ($('.pagination').attr('data-currentpage') == $('.pagination').attr('data-pagescount')) {
        return data;
    } else {
        page++;
        await new Promise(r => setTimeout(r, 1000));
        return sulpakParser(URL, baseURL, category, page, data);
    }
}