import axios from 'axios';
import * as env from '../enviroment';


export const { API_URL } = env[process.env.NODE_ENV]

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

export const getCategorias = ( page,  query, dateFrom, dateTo ) => {
    return new Promise( (resolve, reject) => {

        api.get('/categoria?page=' + page + "&search=" + query + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo,{})
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

export const getCategoriaByCode = ( code ) => {
    return new Promise( (resolve, reject) => {

        api.get('/categoria/' + code , {})
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
            else { reject(res.data.err)}
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

export const updateProduct = ( nombre, descripcion, precio, costo, codigo ) => {
    return new Promise( ( resolve, reject ) => {

        const body = {
            nombre, 
            descripcion, 
            precio, 
            costo
        }

        api.put(API_URL + '/producto/update/' + codigo, body, {})
        .then( res => {
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
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.message)}
        })
        .catch( err => {
            reject( err );
        })

    });
}

export const removeImageFromProduct = ( image, productCode ) => {
    return new Promise( (resolve, reject) => {

        api.delete('/producto/image/' + productCode +'/'+ image, {} )
        .then( res => {
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

export const getProducts = ( page, query, dateFrom, dateTo ) => {
    return new Promise( (resolve, reject) => {
        
        api.get('/producto?page=' + page + "&search=" + query + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo , {} )
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            console.log(err);
            reject( err );
        });

    });
}

export const getProductByCode = (code) => {
    return new Promise( (resolve, reject) => {
        
        api.get('/producto/' + code, {} )
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
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

export const getAllComprashistoricas = ( page ) => {
    return new Promise( (resolve, reject) => {

        api.get('compra/getall/historicas?page=' + page, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });


    });
}

export const createSolicitante = ( solicitante ) => {
    return new Promise( (resolve, reject) => {

        api.post('/solicitante', solicitante, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });


    });  
}

export const getAllSolicitantes = ( page, inputSearch, fechaDesde, fechaHasta ) => {
    return new Promise( (resolve, reject) => {

        api.get('/solicitante?page=' + page + "&search=" + inputSearch + "&dateFrom=" + fechaDesde + "&dateTo=" + fechaHasta, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });


    });
}

export const getSolicitanteByCode = ( code ) => {
    return new Promise( (resolve, reject) => {

        api.get('/solicitante/' + code, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });

    });
}

export const crearVenta = ( venta ) => {
    return new Promise( (resolve, reject) => {

        api.post('/ventas/', { ...venta })
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });

    });
}

export const getAllventas = ( page, estado ) => {
    return new Promise( (resolve, reject) => {
    
        api.get('/ventas?page=' + page + '&estado=' + estado, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });
    
    
    });
}

export const getTotalVenta = ( ventaCode ) => {
    return new Promise( (resolve, reject) => {
    
        api.get('/ventas/total/' + ventaCode, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });
    
    
    });
}

export const confirmarVenta = ( ventaCode ) => {
    return new Promise( (resolve, reject) => {
    
        api.put('/ventas/confirmar/' + ventaCode, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });
    
    
    });
}

export const finalizarVenta = ( ventaCode ) => {
    return new Promise( (resolve, reject) => {
    
        api.put('/ventas/finalizar/' + ventaCode, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });
    
    
    });
}

export const getDetallesByVenta = ( ventaCode ) => {
    return new Promise( (resolve, reject) => {
    
        api.get('/detalle-venta/loadbyventa/' + ventaCode, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });
    
    
    });
}

export const craetePromo = ( body ) => {
    return new Promise( (resolve, reject) => {
    
        api.post('/promo' , body)
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });
    
    
    });
}

export const getAllPromos = ( page ) => {
    return new Promise( (resolve, reject) => {
    
        api.get('/promo?page=' + page, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });
    
    
    });
}

export const deletePromo = ( code ) => {
    return new Promise( (resolve, reject) => {
    
        api.delete('/promo/' + code, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });
    
    
    });
}

export const getPriceWithPromo = ( body) => {
    return new Promise( (resolve, reject) => {
    
        api.post('/producto/priceWithPromo' , body, {})
        .then( res => {
            if( res.data.ok ){ resolve(res)}
            else { reject(res.data.err)}
        })
        .catch( err => {
            reject( err );
        });
    
    
    });
}