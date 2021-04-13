import axios from 'axios';
import * as env from '../enviroment';


const { API_URL } = env[process.env.NODE_ENV]

const api = axios.create({
    baseURL: API_URL
});

export const insertCategoria = (nombre, descripcion) => {
    return new Promise( (resolve, reject) => {
        const body = {
            nombre,
            descripcion
        };
    
        api.post('/categoria', body).then( res => {
            if( res.data.ok ){ resolve(res) }
            else { reject( res.data.message ) }
        })
        .catch( err => {
            reject(err)
        })
    });

};

export const setBannerCategoria = (banner, categoriaCode) => {
    return new Promise( ( resolve, reject ) => {
        
        let formData = new FormData();
        formData.append('banner', banner);


        api.post('/categoria/setbanner/' + categoriaCode, formData, { headers: {'Content-Type': 'form-data'} } )
        .then( res => {
            console.log(res);
            if( res.data.ok ){ resolve(res) }
            else { reject( res.data.message ) }
        })
        .catch( err => {
            reject( err );
        });

    });
}

export const getCategorias = (page) => {
    return new Promise( (resolve, reject) => {

        api.get('/categoria?page=' + page,{})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.message)}
        })
        .catch( err => {
            reject( err );
        });
    });
}

export const getCantidadCategorias = () => {
    return new Promise( (resolve, reject) => {

        api.get('categoria/get/Cantidad', {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.message)}
        })
        .catch( err => {
            reject( err );
        });

    })
}

export const getProductsbyCategoria = (categoriaCode) => { 
    return new Promise( (resolve, reject) => {

        api.get('/producto/categoria/' + categoriaCode, {} )
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.message)}
        })
        .catch( err => {
            reject( err );
        })

    });
}

export const getCategoriasSinPaginador = () => {
    return new Promise( (resolve, reject) => {

        api.get('/categoria/getAll/sinpaginador', {} )
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.message)}
        })
        .catch( err => {
            reject( err );
        })

    });
}

export const createProduct = ( nombre, descripcion, precio, categoria, costo ) => {
    return new Promise( (resolve, reject) => {

        const body = {
            nombre, descripcion, precio, categoria, costo,
            estado: true,
            stock: 0
        };

        api.post('/producto', body, {} )
        .then( res => {
            console.log(res);
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.message)}
        })
        .catch( err => {
            reject( err );
        })


    });
}

export const addImageToProduct = ( image, productCode ) => {
    return new Promise( (resolve, reject) => {

        let formData = new FormData();
        formData.append('file', image);

        api.post('/producto/addImage/' + productCode, formData, {} )
        .then( res => {
            console.log(res);
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.message)}
        })
        .catch( err => {
            reject( err );
        })



    });
}

export const getCantidadProductos = () => {
    return new Promise( (resolve, reject) => {

        api.get('/producto/get/cantidad', {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.message)}
        })
        .catch( err => {
            reject( err );
        });

    })
}

export const getProducts = ( page ) => {
    return new Promise( (resolve, reject) => {
        
        api.get('/producto?page=' + page, {} )
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.message)}
        })
        .catch( err => {
            reject( err );
        });

    });
}

export const getProductByCode = (code) => {
    return new Promise( (resolve, reject) => {
        
        api.get('/producto/' + code, {} )
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.message)}
        })
        .catch( err => {
            reject( err );
        });

    });
}

export const createCompra = ( productoCode, cantidad ) => {
    return new Promise( (resolve, reject ) => {

        const body = {
            producto: productoCode,
            cantidad
        };


        api.post('/compra', body, {} )
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });


    });
}

export const getAllComprasPendientes = (page) => {
    return new Promise( (resolve, reject) => {

        api.get('/compra/getall/pendientes?page=' + page, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });


    });
}

export const confirmCompra = ( compraCode ) => {
    return new Promise( (resolve, reject) => {

        api.put('/compra/finalizar/' + compraCode , {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });


    });
}