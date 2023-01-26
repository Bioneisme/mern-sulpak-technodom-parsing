import dotenv from "dotenv";
dotenv.config();

// const NODE_ENV: string = process.env.NODE_ENV || 'development';

export const DB_URI: string = process.env.DB_URI || 'mongodb://localhost:27017/test';
export const SERVER_PORT: number = +(process.env.SERVER_PORT || 5000);
export const CLIENT_URL: string = process.env.CLIENT_URL || 'http://localhost:3000';