const got = require('got');
const moment = require('moment');
 async function getProduct(productId) {
    try {
        console.log(productId);
        let now = moment();
        const requestedOn = now.format();
        const bigCommResponse = await got(`${process.env.BIG_COMM_ENDPOINT}${productId}`,
        {
             
            responseType: "json",
            headers: {
              "X-Auth-Client": process.env.AUTH_CLIENT,
              "X-Auth-Token": process.env.AUTH_TOKEN,
            }
          }
          );
          //eslint-disable-next-line
          if((bigCommResponse.body.hasOwnProperty('status') === true))
          {
            const errResponse = await buildErrResponse (bigCommResponse.body, productId);
            return errResponse;
          }
          const arr = ['id','sku','name','price'];
          const harveyNicolosResponse = await buildResponse (bigCommResponse.body.data,arr);
          harveyNicolosResponse.requestedOn = requestedOn;
        return harveyNicolosResponse;
    } catch (err) {
        console.log(err)
        const response = {
            'error_code': 404,
            'status': 404,
            'message': 'product not found',
            'details' : `Product Id: ${productId} not available`
        }
        return response;
    }
  }

const buildErrResponse = async (data, productId) => {
    const response = {
        'error_code': data.status,
        'status': data.status,
        'message': 'product not found',
        'details' : `Product ${productId} not available`
    }
    return response;
};

const buildResponse = async (data, keys) => {
    let response = {};
    for (const key of keys) {
        if ( data.hasOwnProperty(key) === true) {
            response[key] = data[key];
        }
    }
    return response;
};

exports.getProduct = getProduct;