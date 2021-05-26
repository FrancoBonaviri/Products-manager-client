import { craetePromo, deletePromo as deletePromoApi, getAllPromos as getAllPromosApi } from "./ApiService";

export const create  = async ( ObjetoDeAccion, tipoDePromo, porcentaje ) => {

    try {
        
        const body = {
            tipo: tipoDePromo,
            porcentaje,
            ObjetoDeAccion
        };

        const res = await craetePromo( body );

        return res;
    } catch (error) {
        throw error;
    }

}


export const deletePromo = async ( promoCode ) => {

    try {
        
        const res = await deletePromoApi( promoCode );

        return res;


    } catch (error) {
        throw error;
    }

}


export const getAllPromos = async ( page ) => {

    try {
        
        const res = await getAllPromosApi( page );
        return res.data;


    } catch (error) {
        throw error;
    }

}