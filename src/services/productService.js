import { addImageToProduct, API_URL, createProduct, getCantidadProductos, getPriceWithPromo, getProductByCode, getProducts, getProductsbyCategoria, removeImageFromProduct, updateProduct } from "./ApiService";

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

export const update = async( nombre, descripcion, precio, costo, imagenes, productoAnterior ) => {

    try {
        
        const res = await updateProduct( nombre, descripcion, precio, costo, productoAnterior.codigo );

        const productoAnteriorCompleto = await getByCodigo( productoAnterior.codigo );

        updateImagenes(imagenes, productoAnteriorCompleto.imagenes, productoAnteriorCompleto.codigo )

        return res.data;

    } catch (error) {
        throw error;
    }


}

const updateImagenes = async( imagenesNuevas = [] , imagensAnteriores = [] , productCode ) => {

    // imagenes a eliminar ( son las que quedaron, que vienen solo como una url( string ) )

    const imagesToRemove = imagensAnteriores.filter( img => !imagenesNuevas.find( imgAnt => typeof imgAnt == "string" && imgAnt.includes( img ) ) );

    // las que tenfo que insertar son las que vienen de tipo object ( las que cargo en el formulario )
    const imagesToAdd = imagenesNuevas.filter( img => typeof img == "object" );

    if( imagesToRemove.length > 0 ){
        await Promise.all(
            imagesToRemove.map( async imgToRm => {
                console.log(imgToRm);
                await removeImage( productCode, imgToRm );
            })
        )
    }

    if( imagesToAdd?.length > 0 ) {
        await Promise.all( 
            imagesToAdd.map( async imgToAdd => {
                await addImage( productCode, imgToAdd );
            })
        )
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

export const removeImage = async( productCode, img ) => {
    try {
        
        const res = await removeImageFromProduct( img, productCode )

        return res.data;

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

export const getProductPriceWithPromo = async ( productoCode, promos ) => {
    try {

        const body = { 
            product: productoCode,
            promos
        };
        
        const res = await getPriceWithPromo( body );
        
        return res.data

    } catch (error) {
        throw error
    }
}