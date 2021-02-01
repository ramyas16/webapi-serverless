async function validateProduct(productId) {
    try { 
        console.log(Number.isInteger(productId));
        if (Number.isInteger(parseInt(productId))) {
            if((productId < parseInt(process.env.BIG_COMM_MIN_PRODUCT_ID)) || (productId > parseInt(process.env.BIG_COMM_MAX_PRODUCT_ID))){ 
                const response = await buildErrResponse(productId);
                return response;
             } 
             return '';
        } else {
            const response = await buildErrProductResponse(productId);
            return response;
        }        
    } catch (err) {
        console.log(err)
        const response = {
            'error_code': 404,
            'status': 404,
            'message': 'product restricted',
            'details' : `The Product ${productId} is restricted.`
        }
        return response;
    }
}

const buildErrProductResponse = async ( productId) => {
    const response = {
        'error_code': 500,
        'status': 500,
        'message': `Error in product id: ${productId}`,
        'details' : `Error in product id: ${productId}`,
    }
    return response;
} 

const buildErrResponse = async ( productId) => {
    const response = {
        'error_code': 401,
        'status': 401,
        'message': 'product restricted',
        'details' : `The Product id: ${productId} is restricted.`
    }
    return response;
} 
//eslint-disable-next-line
exports.validateProduct = validateProduct;