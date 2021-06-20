import { createSolicitante, getAllSolicitantes, getSolicitanteByCode } from "./ApiService"


export const create = async ( nombre, apellido, email, codArea, telefono, codigoProvincia, codigoLocalidad, codigoPostal, calle, altura, piso ) => {
    try {
        
        const solicitante = {
            nombre,
            apellido,
            email,
            codArea,
            telefono,
            codigoProvincia,
            codigoLocalidad,
            codigoPostal,
            calle,
            altura,
            piso
        }

        const res = await createSolicitante(solicitante);

        console.log(res);

        return res;

    } catch (error) {
        throw error
    }
}

export const getAll = async( page, inputSearch, fechaDesde, fechaHasta ) => {
    try {
       
        console.log(page, inputSearch, fechaDesde, fechaHasta);
        const res = await getAllSolicitantes(page, inputSearch, fechaDesde, fechaHasta);

        return res.data;
        
    } catch (error) {
        throw error
    }
}

export const getByCodigo = async ( code ) => {
    try {
        
        const res = await getSolicitanteByCode( code );


        return res.data;

    } catch (error) {
        throw error
    }
}