import { createSolicitante, getAllSolicitantes } from "./ApiService"


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

export const getAll = async( page ) => {
    try {
       
        const res = await getAllSolicitantes(page);

        return res.data;
        
    } catch (error) {
        throw error
    }
}