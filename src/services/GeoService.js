import axios from 'axios';


export const getAllProvincias = async() => {
    try {
        
        const res = await axios.get('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre', {})

        return res.data.provincias;

    } catch (error) {
        throw error
    }
}


export const getLocalidadByProvincia = async( prov ) => {
    try {
        const res = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${ prov }&campos=nombre&max=5000`)

        return res.data.localidades;
    } catch (error) {
        throw error   
    }
}