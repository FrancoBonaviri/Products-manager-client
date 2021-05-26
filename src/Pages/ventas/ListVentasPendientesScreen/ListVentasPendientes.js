import React, { useEffect, useMemo, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import moment from 'moment'
import { EmptyState } from '../../../components/empty/EmptyState'
import { finalizar, getAll as getAllVentas, getDetallesByVentaCode } from '../../../services/ventaService';
import { getTotal as getTotalVenta } from '../../../services/ventaService';
import { useDispatch } from 'react-redux';
import { closeModal, openAlert, openModal } from '../../../actions/uiActions'
import { getByCodigo } from '../../../services/productService'
import { getByCodigo as getSolicitanteByCode } from '../../../services/solicitanteService' 

export const ListVentasPendientes = () => {


    
    const [ventas, setVentas] = useState([]);
    const [page, setPage] = useState(1);
    const [pagesCant, setPagesCant] = useState(1);
    const [upaterObject, setUpaterObject] = useState(true)


    useEffect(() => {
        getAllVentas( page, 'SinEnvio' )
        .then( res => {
            setVentas( [ ...res.data.ventas ] )
            setPagesCant( Math.ceil( res.data.total / 20 ) )
        });
    }, [page, upaterObject])


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
                        ventas.length > 0 ?
                        <>
                            <h4 className="card-title">Ventas</h4>
                            <div className="table-responsive" >
                                <table className="table color-table primary-table">
                                    <thead >
                                        <tr>
                                            <th>Codigo</th>
                                            <th>Solicitante</th>
                                            <th>Detalles</th>
                                            <th>Total</th>
                                            <th>Fecha Creacion</th>
                                            <th>Finalizar venta</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            ventas.map( (venta, i) => (
                                                <ListVentaItem key={ i } venta={ venta } setUpdaterObject={ setUpaterObject } />
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                        :
                        <EmptyState itemToAdd='venta' link='/new-venta'/>

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



const ListVentaItem = ({venta, setUpdaterObject}) => {

    const [total, setTotal] = useState(0)
    const dispatch = useDispatch();

    const handleConfirmClick = () => {
        dispatch( openModal( <ConfirmVentaModal  onConfirm={ onConfirm } onCancel={ () => dispatch( closeModal() )} />, 'Finalizar venta' ) ) 
    }
    
    const onConfirm = () => {
        finalizar( venta.codigo )
        .then( res => {
            dispatch( openAlert('La venta fue finalizada con exito, podes encontrarla en el listado de ventas historicas'));
            setUpdaterObject( updateOject => !updateOject)
        })
        .catch( err => {
            console.log(err);
            dispatch( openAlert('error', err));
        })
        .finally( () => {
            dispatch( closeModal() );
        });
    }

    useEffect(() => {
        getTotalVenta( venta.codigo )
        .then( res => {
            setTotal( res.data.total );
        })
    }, [ venta ])


    const formatter = useMemo(() => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }));


    const handleCopyCode = () => {
        var aux = document.createElement("input");

        // Asigna el contenido del elemento especificado al valor del campo
        aux.setAttribute("value", venta.codigo);
      
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
            <td>{ venta.codigo }   <i onClick={ () => handleCopyCode() } style={{ cursor: 'pointer'}} className="fas fa-copy ml-1"/></td>
            <td>{ venta.solicitante }</td>
            <td>{ venta.detalles.length }   <i onClick={ () => dispatch( openModal( <ResumenVentaComponent venta={ venta } />, 'Resumen de Venta') ) } style={{ cursor: 'pointer'}} class="fas fa-eye"></i></td>
            <td>${ total }</td>
            <td>{ moment(venta.fechaPedido).format('DD/MM/YYYY HH:mm') } </td>
            <td><span style={{ cursor: 'pointer' }} onClick={ handleConfirmClick } className="badge bg-info">Finalizar venta</span></td>
        </tr>
    )



}




const ResumenVentaComponent = ({ venta }) => {

    const formatter = useMemo(() => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }));

    const [solicitante, setSolicitante] = useState({});
    const [detalles, setDetalles] = useState([]);
    const [detallesCode, setDetallesCode] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getSolicitanteByCode(venta.solicitante)
        .then( data => {
            setSolicitante(data.solicitante);
        })
    }, [venta])


    useEffect(() => {
        getDetallesByVentaCode( venta.codigo ) 
        .then( res => {
            setDetallesCode( [ ...res.data.detalles ] )
        });
    }, [venta])



    useEffect(() => {
        if( detallesCode ) {
            const detallesArrayTemp = [];
            detallesCode.forEach( async detalle => {
                const product = await getByCodigo(detalle.producto);
                detallesArrayTemp.push({
                    precio: detalle.precio * Number(detalle.cantidad),
                    descripcion: product.nombre,
                    cantidad: detalle.cantidad
                });
                setTotal(total => total + detalle.precio * Number(detalle.cantidad) );
                setDetalles([...detallesArrayTemp]);
            });
        }
    }, [detallesCode])


    return (
        <>
            <div className="modal-body">    
                <div className='container'>
                    <h3>Solicitante: <label>{ `${solicitante.nombre} ${solicitante.apellido} ` }</label></h3>
                </div>
                <hr />
                <br/>

                <ul class="list-group list-group-flush mb-3">

                    { detalles.map( (detalle, i) => (

                        <li key={ i } class="list-group-item d-flex justify-content-between align-items-center">
                            { detalle.descripcion }
                            <span class="badge bg-secondary rounded-pill">{ detalle.cantidad } /u</span>
                            <span class="badge bg-primary rounded-pill">{ formatter.format(detalle.precio) }</span>
                        </li>                    
                    ))}
                </ul>


                <hr/>


                <div className='container mt-2 text-right'>
                    <h3>Total: <label>{ formatter.format(total) }</label></h3>
                </div>
            </div>

        </>
    )


}



const ConfirmVentaModal = ({ onConfirm, onCancel, ventaCode }) => {

    return (
        <>
            <div className="modal-body">    
                <div className='container'>
                    <p> Esta a punto de finalizar la venta { ventaCode }.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <span className='badge bg-danger' style={{ fontSize: '1rem'}}>Esta Seguro/a ? Esta accion NO podra revertirse</span>
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