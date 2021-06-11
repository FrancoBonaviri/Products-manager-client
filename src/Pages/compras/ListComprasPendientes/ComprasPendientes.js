import React, { useEffect, useMemo, useState } from 'react'
import { confirm, getAllPendientes } from '../../../services/compraService';
import { EmptyState } from '../../../components/empty/EmptyState'
import moment from 'moment'
import Pagination from '@material-ui/lab/Pagination';
import { getByCodigo } from '../../../services/productService';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, openAlert } from '../../../actions/uiActions';


export const ComprasPendientes = () => {



    const [compras, setCompras] = useState([]);
    const [page, setPage] = useState(1);
    const [pagesCant, setPagesCant] = useState(1);

    useEffect(() => {
        getAllPendientes(page)
        .then( data => {
            setCompras([ ...data.compras ])
            setPagesCant( Math.ceil( data.cantidad / 20 ) )
        })
        .catch( err => {
            console.log(err)
        });
    }, [page])



    const onPageChange = (e, value) => {
        setPage(value)     
    };


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
                                            <th>Fecha Creacion</th>
                                            <th>Confirmar compra</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            compras.map( (compra, i) => (
                                                <ListCompraPendienteItem key={ i } compra={ compra }/>
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




const ListCompraPendienteItem = ({ compra }) => {
    
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);


    const formatter = useMemo(() => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }));

    useEffect(() => {
        if( compra.producto ){
            getByCodigo( compra.producto )
            .then( res => {
                setProduct( res );
            })
            .catch( err => {
                console.log(err)
            });
        }
    }, [ compra ])



    const handleConfirmClick = () => {
        dispatch( openModal( <ConfirmCompraModal compraCode={ compra.codigo } onCancel={ onCancelConfirmCompra } onConfirm={ onConfirmCompra }/> , <p className='h5'>Confirmar compra</p>) );
    };


    const onCancelConfirmCompra = () => {
        dispatch( closeModal() )
    }

    const onConfirmCompra = () => {
        confirm( compra.codigo )
        .then( res => {
            console.log(res);
            dispatch( openAlert('success', 'La compra fue confirmada completamente, podras verla desde el listado de compras historicas'));
        })
        .catch( err => {
            console.log(err);
            dispatch( openAlert( 'error', err.toString() ) );
        })
        .finally( () => {
            dispatch( closeModal() );
        });
    }



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
            <td>{ compra.codigo }   <i onClick={ () => handleCopyCode() } style={{ cursor: 'pointer'}} className="fas fa-copy ml-1"/></td>
            <td>{ product?.nombre || '-' }</td>
            <td>{ compra.cantidad } </td>
            <td>{ formatter.format(compra.precio * compra.cantidad) }</td>
            <td>{ moment(compra.fechaCreacion).format('DD/MM/YYYY HH:mm') } </td>
            <td><span style={{ cursor: 'pointer' }} onClick={ handleConfirmClick } className="badge bg-info">Confirmar compra</span></td>
        </tr>
    )



};


const ConfirmCompraModal = ({ onConfirm, onCancel, compraCode }) => {

    return (
        <>
            <div className="modal-body">    
                <div className='container'>
                    <p> Esta a punto de confirmar la compra { compraCode }.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <span className='badge bg-danger' style={{ fontSize: '1rem'}}>Esta Seguro/a ?</span>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button onClick={ onCancel } type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button onClick={ onConfirm } type="button" className="btn btn-primary">Confirmar</button>
            </div>
        </>
    )


}