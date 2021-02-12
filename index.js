const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const asyncHandler = require('express-async-handler')
const productService = require('./services/product/productService');
const productValidation = require('./middleware/product/productValidation')
app.get('/', function (req, res) {
  res.send('Welcome to Harvey Nicolos!')
})

app.get('/product/:productId', asyncHandler(async(req, res) => {
    const validationResponse = await productValidation.validateProduct(req.params.productId); 
    if(validationResponse != ''){
        res.statusCode = validationResponse.error_code;
        return res.send(validationResponse);
    }
    console.log("hello");
    const productResponse = await productService.getProduct(req.params.productId);
    res.send(productResponse); 
}))

module.exports.handler = serverless(app);