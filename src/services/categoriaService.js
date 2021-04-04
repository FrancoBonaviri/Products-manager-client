import { setBannerCategoria, insertCategoria, getCategorias, getCategoriasSinPaginador } from "./ApiService"


export const createCategoria = async(nombre, descripcion, banner) => {

    try {
        
        // creo la categoria ->
        const res = await insertCategoria(nombre, descripcion)
    
        // Si el banner existe, se lo asigno a la categoria ->
        if( banner ) {
            await setBannerCategoria(banner, res.data.categoria.codigo);
        }
    } catch (error) {
        throw error; 
    }

}

export const getAllcategorias = async (page) => {
    try {
        const res = await getCategorias(page);
        return res.data.categorias;

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