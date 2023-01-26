import {Schema, model, Document} from 'mongoose';

export interface IProduct extends Document{
    title: string;
    category: string;
    price: string;
    store: string;
    image: string;
    link: string;
}

const productSchema = new Schema<IProduct>({
    title: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: String, required: true},
    store: {type: String, required: true},
    image: {type: String},
    link: {type: String}
});

export default model("Product", productSchema);