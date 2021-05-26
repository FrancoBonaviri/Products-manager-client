import React, { useEffect, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { EmptyState } from '../../../components/empty/EmptyState'
import { deletePromo, getAllPromos } from '../../../services/promoService';
import { getByCodigo } from '../../../services/productService';
import { getByCodigo as getCategoriaByCodigo } from '../../../services/categoriaService'
import { useDispatch } from 'react-redux';
import { closeModal, openAlert, openModal } from '../../../actions/uiActions';


export const ListPromos = () => {

    const [promos, setPromos] = useState([]);
    const [page, setPage] = useState(1);
    const [pagesCant, setPagesCant] = useState(1);
    const [ updaterProp , setUpdaterProp] = useState(false)



    useEffect(() => {
        getAllPromos(page)
        .then( data => {
            setPromos([ ...data.promos ])
            setPagesCant( Math.ceil( data.promos / 20 ) )
        })
        .catch( err => {
            console.log(err)
        });
    }, [page, updaterProp])



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
                            promos.length > 0 ?
                            <>
                            <h4 className="card-title">Compras</h4>
                            <div className="table-responsive" >
                                <table className="table color-table primary-table">
                                    <thead >
                                        <tr>
                                            <th>Codigo</th>
                                            <th>Tipo de promo</th>
                                            <th>Total</th>
                                            <th>Descuento</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            promos.map( (promo, i) => (
                                                <ListPromoItem key={ i } promo={ promo } setUpdaterProp={ setUpdaterProp } />
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            </>
                            :
                            <EmptyState itemToAdd='Promo' link='/new-promo'/>

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


const ListPromoItem = ({ promo, setUpdaterProp }) => {
    

    const dispatch = useDispatch();

    const [actionOject, setactionOject] = useState();

    useEffect(() => {
        if ( promo.tipo == 'DeProducto') {
            getByCodigo( promo.ObjetoDeAccion)
            .then( data => {
                setactionOject( data.nombre )
            });
        } 
        else if ( promo.tipo == 'DeCategoria') {
            getCategoriaByCodigo( promo.ObjetoDeAccion )
            .then( data => {
                setactionOject( data.categoria.nombre )
            })
        }
    }, [promo])



    const handleCancelPromo = () => {
        dispatch( openModal(<DeletePromoModal promoCode={ promo.codigo } onConfirm={ onConfimCancelPromo } onCancel={ () => dispatch( closeModal() )} />, 'Eliminar promo') )
    } 

    const onConfimCancelPromo = () => {
        deletePromo( promo.codigo )
        .then( data => {
            dispatch( openAlert('success', 'La promo fue eliminada correctamente'))
        })
        .catch( err => {
            dispatch( openAlert('error', err.message || err ) );
        })
        .finally( () => {
            dispatch( closeModal() );
            setUpdaterProp( data => !data );
        })
    }

    const handleCopyCode = () => {
        var aux = document.createElement("input");

        // Asigna el contenido del elemento especificado al valor del campo
        aux.setAttribute("value", promo.codigo);
      
        // Añade el campo a la página
        document.body.appendChild(aux);
      
        // Selecciona el contenido del campo
        aux.select();
      
        // Copia el texto seleccionado
        document.execCommand("copy");
      
        // Elimina el campo de la página
        document.body.removeChild(aux);
    }

    const getTipeString = () => {
        switch (promo.tipo) {
            case 'DeProducto':
                return 'De Producto'
            case 'DeTotalDeVenta': 
                return 'De Total de venta'
            case 'DeCategoria':
                return 'De Categoria'
        }
    }

    
    
    return ( 
        <tr>
            <td>{ promo.codigo }   <i onClick={ () => handleCopyCode() } style={{ cursor: 'pointer'}} className="fas fa-copy ml-1"/></td>
            <td>{ getTipeString() }</td>
            <td>{ actionOject || '-' }</td>
            <td>% { promo.porcentaje } </td>
            <td><span style={{ cursor: 'pointer' }} onClick={ handleCancelPromo } className="badge bg-danger">Eliminar Promo</span></td>
        </tr>

    )
}


const DeletePromoModal = ({ promoCode, onCancel, onConfirm }) => {



    return (
        <>
            <div className="modal-body">    
                <div className='container'>
                    <p> Esta a punto de cancelar la promo { promoCode }.</p>
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