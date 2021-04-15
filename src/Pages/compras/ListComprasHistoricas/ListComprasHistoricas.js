import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useMemo, useState } from 'react'
import { EmptyState } from '../../../components/empty/EmptyState';
import moment from 'moment'
import { getByCodigo } from '../../../services/productService';
import { getAllHistoricas } from '../../../services/compraService';


export const ListComprasHistoricas = () => {

    const [compras, setCompras] = useState([]);
    const [pagesCant, setPagesCant] = useState(1);
    const [page, setPage] = useState(1);


    useEffect(() => {
        getAllHistoricas(page)
        .then( res => {
            setCompras([ ...res.data.compras ])
            setPagesCant( Math.round( res.data.cantidad / 20 ) )
        })
        .catch( err => {
            console.log(err)
        });
    }, [page])


    

    const onPageChange = ( e, value ) => {
        setPage(value);
    }

    return (
        <>
        <div className="row no-scrollbar" style={{ width : '100%', maxHeight: '79vh', overflowY : 'scroll'  }} >
            <div className="col-12 " >
                <div className="card">
                    <div className="card-body">

                    {
                        compras.length > 0 ?
                        <>
                        <h4 className="card-title">Compras</h4>
                        <div className="table-responsive" >
                            <table className="table color-table primary-table">
                                <thead >
                                    <tr>
                                        <th>Codigo</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Total</th>
                                        <th>Fecha creacion</th>
                                        <th>Fecha confirmacion </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        compras.map( (compra, i) => (
                                            <ListCompraHistoricaItem key={ i } compra={ compra }/>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        </>
                        :
                        <EmptyState itemToAdd='compra' link='/new-compra'/>

                    }
                    </div>
                </div>
            </div>
            
        </div>
    

    {
        pagesCant > 1 &&
        <div className="mt-5">
            <Pagination count={ pagesCant } page={ page } onChange={ onPageChange } size="large" />
        </div>
    }

    </>
    )
}


const ListCompraHistoricaItem = ({ compra }) => {


    console.log(compra)
    const [product, setProduct] = useState(null);

    const formatter = useMemo(() => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }));


    useEffect(() => {
        if( compra.producto ){
            getByCodigo( compra.producto )
            .then( res => {
                setProduct( res.producto );
            })
            .catch( err => {
                console.log(err)
            });
        }
    }, [ compra ]);


    const handleCopyCode = () => {
        var aux = document.createElement("input");

        // Asigna el contenido del elemento especificado al valor del campo
        aux.setAttribute("value", compra.codigo);
      
        // Añade el campo a la página
        document.body.appendChild(aux);
      
        // Selecciona el contenido del campo
        aux.select();
      
        // Copia el texto seleccionado
        document.execCommand("copy");
      
        // Elimina el campo de la página
        document.body.removeChild(aux);
    }

    return (
        <tr>
            <td>{ compra.codigo }  <i onClick={ () => handleCopyCode() } style={{ cursor: 'pointer'}} className="fas fa-copy ml-1"/></td>
            <td>{ product?.nombre || '-' }</td>
            <td>{ compra.cantidad } </td>
            <td>{ formatter.format(compra.precio * compra.cantidad) }</td>
            <td>{ moment(compra.fechaCreacion).format('DD/MM/YYYY HH:mm') } </td>
            <td>{ moment(compra.fechaConfirmacion).format('DD/MM/YYYY HH:mm')  }</td>
        </tr>
    )



}