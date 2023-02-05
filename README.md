# Electronics parser
Parser of sites Sulpak, Technodom by category written using Node.JS, React.js, MongoDB

## Sites
* Sulpak
* Technodom

## Categories
* Laptops
* Phones
* Gadgets
* Tablets
* Televisions
* Computers
* Audio
* Cameras
* Digital

## Endpoints
* [GET] /api/products/getAllProducts - get an array of all products
* [GET] /api/products/getProductById/:id - get a product by id
* [POST] /api/products/createProduct - creates a product
* [PATCH] /api/products/updateProduct/:id - updates a product
* [DELETE] /api/products/deleteProduct/:id - deletes a product

* [GET] /api/parsers/startGeneralParser - starts parsing all stores and categories
* [POST] /api/parsers/startParse {store, category} - starts parsing a specific store and category

## Visualization
![image](https://user-images.githubusercontent.com/92920845/216822378-e0831f03-c3b3-4030-b298-c23547424a65.png)


## Getting Started
### Prerequisites
* NodeJS, NPM (https://www.npmjs.com/get-npm)
* ReactJS (https://reactjs.org)
* MongoDB (https://www.mongodb.com)

### Installing
```bash
# Get the latest snapshot
git clone https://github.com/Bioneisme/nodejs-sulpak-technodom-parse.git
```
``` bash
# Change directory
cd nodejs-sulpak-technodom-parse
```
``` bash
# Install dependencies in client side
cd client && npm install
# Install dependencies in server side
cd server && npm install
```
In server create an .env file locally. You can duplicate .env.example and name the new copy .env. Adapt the variables to your needs.
``` bash
# After setting up .env start app
npm run start # in all project sides (client/server)
# or npm run dev
```
