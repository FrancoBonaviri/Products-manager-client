import { crearVenta, getAllventas, getTotalVenta, confirmarVenta, finalizarVenta, getDetallesByVenta } from './ApiService';

export const createVenta = async (venta) => {

    try {
        
        const ventaReq = {
            solicitante: venta.Solicitante,
            detalles: [ ...venta.Detalles ],
            estado: 'Solicitud',
            promos: venta.promos
        }

        const ventaResp = await crearVenta(ventaReq);

        return ventaResp.venta;



    } catch (error) {
        console.log(error);
        throw error;
    }




} 

export const getAll = async ( page, estado ) => {
    try {
        
        const ventas = await getAllventas( page, estado );
        
        return ventas
        
    } catch (error) {
        throw error;
    }
} 

export const getTotal = async ( ventaCode ) => {
    try {
        
        const data = await getTotalVenta( ventaCode );

        return data;
        
    } catch (error) {
        throw  error;
    }
}

export const confirmar = async ( ventaCode ) => {
    try {
        const res = await confirmarVenta( ventaCode );

        return res;
    } catch (error) {
        throw error;
    }
}


export const finalizar = async ( ventaCode ) => {
    try {
        
        const res = await finalizarVenta( ventaCode );

        return res;

    } catch (error) {
        throw error;
    }
}

export const getDetallesByVentaCode = async ( ventaCode ) => {
    try {
        const res = await getDetallesByVenta( ventaCode );


        return res;
    } catch (error) {
        throw error;
    }
}