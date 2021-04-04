import { createCompra, getAllComprasPendientes } from "./ApiService"

export const create = async ( product, cantida ) => {

    try {
        
        const res = await createCompra(product, cantida);

        return res.data;


    } catch (error) {
        throw error;
    }
}

export const getAllPendientes = async( page ) => {
    try {
        
        const res = await getAllComprasPendientes( page );

        return res.data;

    } catch (error) {
        throw error;
    }
} 