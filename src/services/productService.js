import { addImageToProduct, createProduct, getCantidadProductos, getProductByCode, getProducts, getProductsbyCategoria } from "./ApiService";

export const getByCategoria = async (categoriaCode) => {

    try {
        
        const products = await getProductsbyCategoria(categoriaCode);
        return products.data.productos;

    } catch (error) {
        throw error;
    }
}

export const getCantidadByCategoria = async( categoriaCode) => {
    try {
        
        const res = await getProductsbyCategoria(categoriaCode);
        return res.data.productos.length;

    } catch (error) {
        throw error;
    }

}

export const create = async( nombre, descripcion, precio, categoria, costo, images) => {

    try {
        
        const res = await createProduct(nombre, descripcion, precio, categoria, costo );

        if( res.data.ok && images && images.length > 0 ) {

            await Promise.all(
                images.map( async img => {
                    await addImage(res.data.Producto.codigo, img);
                })
            );
        }
        return res;

    } catch (error) {
        throw error
    }

}

export const addImage = async( productCode, img ) => {
    try {
        const res = await addImageToProduct(img, productCode);

        return res;

    } catch (error) {
        throw error;
    }
}

export const get = async ( page ) => {

    try {
        
        const res = await getProducts( page );

        return res.data.productos

    } catch (error) {
        throw error
    }

}

export const getCantidad = async() => {
    try {
        
        const res = await getCantidadProductos();

        return res.data.cantidad;

    } catch (error) {
        throw error;
    }
}

export const getByCodigo = async( code ) => {
    try {
        
        const res = await getProductByCode( code );

        return res.data.producto;


    } catch (error) {
        throw error
    }
};
