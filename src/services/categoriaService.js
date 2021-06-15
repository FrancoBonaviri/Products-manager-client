import { setBannerCategoria, insertCategoria, getCategorias, getCategoriasSinPaginador, getCategoriaByCode } from "./ApiService"


export const createCategoria = async(nombre, descripcion, banner) => {

    try {
        
        // creo la categoria ->
        const res = await insertCategoria(nombre, descripcion)
    
        // Si el banner existe, se lo asigno a la categoria ->
        if( banner.lenght > 0 ) {
            await setBannerCategoria(banner, res.data.categoria.codigo);
        }
    } catch (error) {
        throw error; 
    }

}

export const getAllcategorias = async (page, search, dateFrom, dateTo ) => {
    try {
        const res = await getCategorias(page, search, dateFrom, dateTo);
        return res.data;

    } catch (error) {
        throw error
    }
}

export const GetAllCategoriaSinPaginador = async() => {
    try {
        const res = await getCategoriasSinPaginador();

        return res.data.categorias;

    } catch (error) {
        throw error
    }
}

export const getByCodigo = async( code ) => {
    try {
        
        const res = await getCategoriaByCode( code );

        console.log(res);

        return res.data;

    } catch (error) {
        throw error;
    }
}