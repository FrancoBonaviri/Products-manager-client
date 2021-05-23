import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Label } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { closeModal, openAlert, openModal } from '../../../actions/uiActions'
import { GetAllCategoriaSinPaginador } from '../../../services/categoriaService'
import { getByCategoria, getByCodigo } from '../../../services/productService'
import { getByCodigo as getSolicitanteByCode } from '../../../services/solicitanteService';
import { createVenta as crearVentaService } from '../../../services/ventaService';
import './NewVentaScreen.css'



const initialStateDetalles = {
    1: {
        producto: '',
        cantidad: ''
    }
}

export const NewVentaScreen = () => {
    
    const dispatch = useDispatch();

    const [detalles, setDetalles] = useState(initialStateDetalles);
    const [categorias, setCategorias] = useState([]);
    const [solicitante, setSolicitante] = useState('');
    const [errorSolicitante, setErrorSolicitante] = useState(false);
 
        
    useEffect(() => {
        GetAllCategoriaSinPaginador()
        .then( res => {
            setCategorias( [...res] );
        })
        .catch( err => {    
            dispatch( openAlert('error', 'Error desconocido ' + err) );
        });
    }, [])
 
    
    const handlerAddDetalle = () => {
        const cantidad = Object.keys( detalles ).length;
        const detallesTransferObject = { ...detalles };

        detallesTransferObject[cantidad + 1] = {
            producto: '',
            cantidad: ''
        }
        setDetalles( { ...detallesTransferObject } );
    }

    const handleDeleteDetail = () => {
        const cantidad = Object.keys( detalles ).length;
        const detallesTransferObject = { ...detalles };
 

        delete detallesTransferObject[cantidad];
        setDetalles( { ...detallesTransferObject } );
    }

    const handleSubmit = async(e) => {

        if( validator() ) {
            getSolicitanteByCode( solicitante )
            .then( data => {
                if( data.ok ){ 

                    const venta = createVenta();

                    dispatch( openModal(<ResumenVentaComponent venta={ venta } onCancel={ () => dispatch( closeModal() ) } onConfirm={ () =>  crearVenta( venta ) } />, 'Resumen de venta' ) )

                }
            })
            .catch( err => {
                dispatch( openAlert('error', err) );
            })
        }
    }

    const crearVenta = async ( venta ) => {
     
        crearVentaService(venta)
        .then( ventaResp => {
            dispatch( openAlert('success', 'La venta fue creada correctamente, podes verla desde el listado de solicitudes'))
           
            setTimeout(() => {
                window.location = '/solicitudes-venta';
            }, 3000);

        })
        .catch( err => {
            dispatch( openAlert('error', err.message ));
        })
        .finally( () => {
            dispatch( closeModal() );
        });

    }



    const validator = () => {

        const errorTranferObject = {};

        if( !solicitante || !solicitante.trim() ){
            errorTranferObject.solicitante = true;
        } 
        
        
        
        if ( errorTranferObject.solicitante ){
            setErrorSolicitante( true );
        } else {
            setErrorSolicitante( false );
        }

        if( !detalles[1].cantidad || !detalles[1].cantidad.trim() || detalles[1].cantidad < 1 ){
            dispatch( openAlert('warning', 'Debe completar el primer detalle para poder crear la venta' ));
        }

        for( let key of Object.keys( errorTranferObject ) ) {
            if( errorTranferObject[key] ){
                return false;
            }
        }


        return true;

    }


    const createVenta = () => {
        const venta = {
            Solicitante: solicitante,
            Detalles: []
        }

        Object.keys( detalles ).forEach( key => {
            if( detalles[key].producto && detalles[key].cantidad ) {
                venta.Detalles.push({
                    producto: detalles[key].producto,
                    cantidad: detalles[key].cantidad
                })
            }
        });


        return venta
    }


 

    return (
        <div className="row" style={{ minWidth: '100% ' }}>
            <div className="col-md-4 col-sm-12">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header bg-primary">
                                <h4 className="m-b-0 text-white">Datos de la venta</h4>
                            </div>
                            <div className="card-body">
                                <div className='form-body'>
                                    <div className="row p-t-20">
                                        <div className="col-md-12">
                                            <div className={ errorSolicitante ? 'form-group has-danger' : 'form-group'}>
                                                <label className="control-label">Codigo de Solicitante</label>
                                                <input
                                                    type="text" 
                                                    className="form-control"  
                                                    placeholder="Solicitante"  
                                                    tabIndex="1"
                                                    onChange={ ({target}) => setSolicitante(target.value) }
                                                />
                                                { errorSolicitante &&  <small className="form-control-feedback"> Debe completar este campo </small> }
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-md-8 col-sm-12">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header bg-primary">
                                <h4 className="m-b-0 text-white">Detalle de venta</h4>
                            </div>
                            <div className="card-body" >
                                <div className="no-scrollbar" style={{ width : '100%', maxHeight: '79vh', overflowY: 'scroll' }}>
                                    { 
                                        Object.keys( detalles ).map( (key, i) => (
                                            <DetalleVentaItem 
                                                key={key} 
                                                prop={key} 
                                                index={i} 
                                                cantidad={ Object.keys( detalles ).length } 
                                                onDelete={ handleDeleteDetail }
                                                cats={ categorias }
                                                setDetalles={ setDetalles }
                                            />
                                        ))
                                    }
                                    <div className="form-actions mt-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <button onClick={ handlerAddDetalle } type="submit" className="btn btn-primary "> <i className="fa fa-plus" tabIndex="6"></i> Agregar otro</button>     
                                        <button onClick={ handleSubmit } type="submit" className="btn btn-info "> <i className="fa fa-check" tabIndex="6"></i> Guardar</button>                                                                           
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



const DetalleVentaItem = ({ prop, index, cantidad, onDelete, cats, setDetalles }) => {


    const dispatch = useDispatch();

    const formatter = useMemo(() => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }));

    const [total, setTotal] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [formValues, setFormValues] = useState({
        producto: '',
        categoria: '',
        cantidad: ''
    });

    useEffect(() => {
        if( cats.length > 0){
            const catTempArray = []; 
            cats.forEach( ( item, i ) => {
                catTempArray.push( droplDownItemParser( item, i ) );
            });
            setCategorias( [ ...catTempArray ] );
        }
    }, [cats])

    useEffect(() => {
        if( formValues.categoria ) {
            const productsTempArray = [];
            getByCategoria(formValues.categoria)
            .then( res => {
                res.forEach( ( item, i ) => {
                    productsTempArray.push( droplDownItemParser( item, i ))
                });
                setProductos([...productsTempArray]);
            })
            .catch( err => {
                dispatch( openAlert('error', 'Error desconocido ' + err) );
            })
        }
        setFormValues( {
            ...formValues,
            producto: '',
            cantidad: ''
        })
    }, [formValues.categoria])


    useEffect(() => {
        onProductChange();
        setTotal(0)
        if( formValues.producto && formValues.cantidad && formValues.categoria ){
            getByCodigo(formValues.producto)
            .then( res => {
                setTotal( res.precio * formValues.cantidad );
            })
            .catch( err => {
                dispatch( openAlert('error', 'Error desconocido ' + err) );
            })
        }
    }, [formValues.producto, formValues.cantidad])



    const onProductChange = () => {
        setDetalles( detail => { return {
            ...detail,
            [prop]: {
                producto: formValues.producto,
                cantidad: formValues.cantidad
            }
        }})
    }



    const droplDownItemParser = ( item, i ) => {
        return {
            key: i,
            value: item.codigo,
            text: item.nombre
        }
    }

    return (
        <>
            <div className="row p-t-20">
                <div className="col-md-3">
                    <div className='form-group'>
                        <label className="control-label">Categoria</label>
                        <Dropdown 
                            options={ categorias } 
                            onChange={ (e,  { value } ) => setFormValues( { ...formValues, categoria: value } )  }
                            placeholder='Categoria' 
                            search selection 
                            className="form-control"
                        />
                    </div> 
                </div>
                <div className="col-md-3">
                    <div className='form-group'>
                        <label className="control-label">Producto</label>
                        <Dropdown 
                            placeholder='Producto' 
                            search selection 
                            className="form-control"
                            options={ productos } 
                            onChange={ (e,  { value } ) => setFormValues( { ...formValues, producto: value } )  }
                        />
                    </div> 
                </div>
                <div className="col-md-3" >
                    <div className='form-group'>
                        <label className="control-label">Cantidad</label>
                        <input value={ formValues.cantidad }  onChange={ ({target}) => setFormValues( { ...formValues, cantidad: target.value} ) } type="number" className="form-control"  placeholder="cantidad"/>
                    </div> 
                </div>
                <div className="col-md-3">
                    <div className='form-group' style={{ position: 'relative' }}>
                        <Label size='huge' style={{ marginTop: '1.5rem', zIndex: '9999' }} >
                            { formatter.format( total || 0 ) }
                        </Label>

                        {
                            ( prop == cantidad && prop != 1 ) &&
                            <div onClick={ onDelete } style={{ fontSize: '1.5rem', top: '0', right: '0', position: 'absolute', cursor: 'pointer' }} >
                                <i className="far fa-times-circle"></i>
                            </div>
                        }
                    </div> 
                </div>
            </div>
            <hr />
        </>
    )



}


const ResumenVentaComponent = ({ venta, onCancel, onConfirm }) => {

    const formatter = useMemo(() => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }));

    const [solicitante, setSolicitante] = useState({});
    const [detalles, setDetalles] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getSolicitanteByCode(venta.Solicitante)
        .then( data => {
            setSolicitante(data.solicitante);
        })
    }, [venta])


    useEffect(() => {
        if( venta.Detalles ) {
            const detallesArrayTemp = [];
            venta.Detalles.forEach( async detalle => {
                const product = await getByCodigo(detalle.producto);
                detallesArrayTemp.push({
                    precio: product.precio * Number(detalle.cantidad),
                    descripcion: product.nombre
                });
                setTotal(total => total + product.precio * Number(detalle.cantidad) );
                setDetalles([...detallesArrayTemp]);
            });
        }
    }, [venta.Detalles])


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
                            <span class="badge bg-primary rounded-pill">{ formatter.format(detalle.precio) }</span>
                        </li>                    
                    ))}
                </ul>


                <hr/>


                <div className='container mt-2 text-right'>
                    <h3>Total: <label>{ formatter.format(total) }</label></h3>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={ onCancel }>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={ onConfirm }>Confirmar</button>
            </div>
        </>
    )


}