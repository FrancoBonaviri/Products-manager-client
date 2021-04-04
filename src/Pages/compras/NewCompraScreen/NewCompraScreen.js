import React, { useEffect, useRef, useState } from 'react'
import { GetAllCategoriaSinPaginador } from '../../../services/categoriaService';
import { create } from '../../../services/compraService';
import { getByCategoria } from '../../../services/productService';



import './NewCompraScreen.css'


const initialStateFormErrors = {
    cantidad: false,
    categoria: false,
    producto: false 
};

const initialFormValues = {
    cantidad: undefined,
    categoria: null,
    producto: null,
};

export const NewCompraScreen = () => {

    const productSelect = useRef(null)

    const [formValues, setFormValues] = useState( initialFormValues );
    const [errors, setErrors] = useState(initialStateFormErrors);
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([])
    const [total, setTotal] = useState(0)


    useEffect(() => {
        GetAllCategoriaSinPaginador().then( cats => {
            setCategorias([...cats])
        })
    }, [])

    useEffect(() => {
        
        productSelect.current.value = 'no-selected'
        if( formValues.categoria ){
            getByCategoria( formValues.categoria )
            .then( products => {
                setProductos( [...products] )
            })
            .catch( err => {
                console.log(err);
            })
        }


    }, [ formValues.categoria ])

    useEffect(() => {
        setFormValues({
            ...formValues,
            cantidad: undefined,
            producto: undefined
        });
    }, [  formValues.categoria ])

    useEffect(() => {
        if( formValues.producto && formValues.cantidad ){
            const product = productos.find(p => p.codigo == formValues.producto);
            setTotal(product.costo * formValues.cantidad);
        } else {
            setTotal(0);
        }
    }, [formValues.cantidad, formValues.producto]);



    const handleSubmit = (e) => {
        e.preventDefault();
        if( validator() ){
            create( formValues.producto, formValues.cantidad)
            .then( res => {
                if( res.ok ){
                    clearForm()
                } else {
                    console.log(res);
                }
            })
            .catch( err => {
                console.log(err);
            });
        }
    }


    const validator = () => {
        const errorTranferObjet = { ...initialStateFormErrors };

        if( !formValues.categoria ){
            errorTranferObjet.categoria = true;
        }

        if( !formValues.producto ){
            errorTranferObjet.producto = true;
        }

        if( !formValues.cantidad || formValues.cantidad <= 0 ){
            errorTranferObjet.cantidad = true;
        }


        setErrors({ ...errorTranferObjet });

        for( let key of Object.keys( errorTranferObjet ) ){
            if( errorTranferObjet[key] ){
                return false;
            }
        }
        
        
        
        return true;
    }

    const clearForm = () => {
        setErrors( initialStateFormErrors );
        setFormValues( initialFormValues );
    }

    const onChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h4 className="m-b-0 text-white">Nueva Compra</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={ handleSubmit } >
                                <div className="form-body">
                                    <div className="row p-t-20">
                                        <div className="col-md-6">
                                            <div className={ errors.categoria ? 'form-group has-danger' : 'form-group' } >
                                                <label className="control-label">Categoria</label>
                                                <select onChange={ onChange } defaultValue='no-selected' className="form-control custom-select" name="categoria" style={{ minHeight: '48px' }} data-placeholder="Choose a Category" tabIndex="1">
                                                    <option value='no-selected' disabled >Seleccione...</option>
                                                    {
                                                        categorias.map( data => (
                                                            <option key={data.codigo} value={data.codigo}>{ data.nombre }</option>
                                                        ))
                                                    }
                                                </select>
                                                { errors.categoria &&  <small className="form-control-feedback"> Debe completar este campo </small> }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className={ errors.producto ? 'form-group has-danger' : 'form-group' } >
                                                <label className="control-label">Producto</label>
                                                <select onChange={ onChange } ref={productSelect} defaultValue='no-selected' className="form-control custom-select" name="producto" style={{ minHeight: '48px' }} data-placeholder="Choose a Category" tabIndex="2">
                                                    <option value='no-selected' disabled >Seleccione...</option>
                                                    {
                                                        productos.map( data => (
                                                            <option key={data.codigo} value={data.codigo}>{ data.nombre }</option>
                                                        ))
                                                    }
                                                </select>
                                                { errors.producto &&  <small className="form-control-feedback"> Debe completar este campo </small> }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                                <h3>Cantidad</h3>
                                            <div className="number-imput-place">
                                                <label onClick={ () => document.getElementById('number-input').focus() } htmlFor="number-input" className={ errors.cantidad ? 'has-danger' : undefined} >{ formValues.cantidad || "0" } </label>
                                                <input value={formValues.cantidad} onChange={ ({ target }) => setFormValues({ ...formValues, cantidad: target.value < 0 ? target.value * -1 : target.value })} type="number" tabIndex="3" id="number-input" />
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h2> Total : <span className="font-bold">${ total || "0" }</span></h2>
                                        </div>
                                    </div>

                                </div>
                                <div className="form-actions mt-4">
                                    <button type="submit" className="btn btn-info"> <i className="fa fa-check"></i> Guardar</button>                                   
                                </div>
                         </form>
                     </div>
                 </div>
             </div>
         </div>
     </div>
    )
}
