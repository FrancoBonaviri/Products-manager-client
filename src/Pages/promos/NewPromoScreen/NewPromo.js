import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { openAlert } from '../../../actions/uiActions';
import { getAllcategorias } from '../../../services/categoriaService';
import { getByCategoria } from '../../../services/productService';
import { create } from '../../../services/promoService';


const initialStateFormValues = {
    objectActionCode: '',
    porcentaje: ''
}


export const NewPromo = () => {

    const dispatch = useDispatch();

    const [tipoPromo, setTipoPromo] = useState('DeTotalDeVenta');
    const [selectedForm, setSelectedForm] = useState(<FormSelectProduct />)
    const [formValues, setFormValues] = useState(initialStateFormValues)


    useEffect(() => {

        setFormValues( initialStateFormValues );

        switch (tipoPromo) {
            case 'DeProducto':
                setSelectedForm( <FormSelectProduct setFormValues={ setFormValues }/> ); 
            break;
            case 'DeCategoria':
                setSelectedForm( <FormSelectCategoria setFormValues={ setFormValues } /> );
            break;
            case 'DeTotalDeVenta' :
                setSelectedForm( <FormSelectTotalVenta  setFormValues={ setFormValues } /> );
            default:
                break;
        }
    }, [tipoPromo])



    const onChangeTipoPromo = (e) => {
        setTipoPromo( e.target.value );
    }

    const onSubmit = () => {
    
        if( validator() ) {
            
            create(formValues.objectActionCode, tipoPromo, formValues.porcentaje)
            .then( res => {
                console.log(res);
                dispatch( openAlert('success', 'La promo fue creada correctamente, poder verla en el listado de promos.'))
                setTimeout(() => {
                    window.location = '/list-promos'
                }, 2000);
            })
            .catch( err => {
                console.log(err);
                dispatch( openAlert('error', err.message || err ) );
            })

        }
    }


    const validator = () => {

        if( !formValues.porcentaje || formValues.porcentaje < 1 || formValues.porcentaje > 99)  {
            dispatch( openAlert('error', 'Debe completar correctamente el procentaje del formulario (mayor a 1% y menor a 99%)'));
            return false;
        }

        if( tipoPromo != 'DeTotalDeVenta' ) {
            if( !formValues.objectActionCode || formValues.objectActionCode == 'no-selected' ){ 
                dispatch( openAlert('error', 'Debe seleccionar el producto o la categoria en la que se va a efectuar la promo.'));
                return false;
            }
        }


        return true;

    }

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h4 className="m-b-0 text-white">Nueva Promo</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3">
                                    <div className="form-group">
                                        <label className="control-label">Seleccione el tipo de promo</label>
                                        <select onChange={ onChangeTipoPromo } className="form-control custom-select" defaultValue='DeTotalDeVenta' name="TipoPromo" style={{ minHeight: '48px' }} tabIndex="1">
                                            <option value='DeTotalDeVenta' >Sobre el total de venta</option>
                                            <option value='DeProducto' >Sobre un producto</option>
                                            <option value='DeCategoria' >Sobre una categoria</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-9">
                                    { selectedForm }
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row float-right">
                                <button className="btn btn-primary" onClick={ onSubmit }>
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const FormSelectProduct = ({ setFormValues }) => {

    const initialStateFormErrors = {
        categoria: false,
        producto: false,
        porsentaje: false,
    }

    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [errors, setErrors] = useState(initialStateFormErrors)
    const [categoriaSelected, setCategoriaSelected] = useState(null);

    useEffect(() => {
        getAllcategorias()
        .then( data => {
            setCategorias(data);
        })
    }, [])

    useEffect(() => {
        if ( categoriaSelected && categoriaSelected != 'no-selected' ){
            getByCategoria(categoriaSelected)
            .then( data => {
                setProductos( data);
            });
        }
    }, [categoriaSelected])


    return (
        <div className="row">
            
            <div className="col-4">
                <div className={ errors.categoria ? 'form-group has-danger' : 'form-group' } >
                    <label className="control-label">Categoria</label>
                    <select onChange={ (e) => setCategoriaSelected( e.target.value )} defaultValue='no-selected' className="form-control custom-select" name="categoria" style={{ minHeight: '48px' }} data-placeholder="Choose a Category" tabIndex="3">
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

            <div className="col-4">
                <div className={ errors.producto ? 'form-group has-danger' : 'form-group' } >
                    <label className="control-label">Seleccione el producto</label>
                    <select onChange={ (e) => setFormValues( data => ({ ...data, objectActionCode: e.target.value }))} className="form-control custom-select" defaultValue='no-selected' name="product" style={{ minHeight: '48px' }} tabIndex="1">
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

            <div className="col-4">
                <div className={ errors.porsentaje ? 'form-group has-danger' : 'form-group' } >
                    <label className="control-label">Seleccione el procentaje de descuento</label>
                    <input  min="1" max="99"  onChange={ (e) => setFormValues( data => ({ ...data, porcentaje: e.target.value }) )} className="form-control" placeholder="Procentaje" type="number"></input>
                    { errors.porsentaje &&  <small className="form-control-feedback"> Debe completar este campo </small> }
                </div>

            </div>
        </div>
    )
}



const FormSelectCategoria = ( { setFormValues }) => {

    const initialStateFormErrors = {
        categoria: false,
        producto: false,
        porsentaje: false,
    }

    const [categorias, setCategorias] = useState([]);
    const [errors, setErrors] = useState(initialStateFormErrors)
    const [categoriaSelected, setCategoriaSelected] = useState(null);

    useEffect(() => {
        getAllcategorias()
        .then( data => {
            setCategorias(data);
        })
    }, [])

    return (
        <div className="row">
            
            <div className="col-6">
                <div className={ errors.categoria ? 'form-group has-danger' : 'form-group' } >
                    <label className="control-label">Categoria</label>
                    <select  onChange={ (e) => setFormValues( data => ({ ...data, objectActionCode: e.target.value }))} defaultValue='no-selected' className="form-control custom-select" name="categoria" style={{ minHeight: '48px' }} data-placeholder="Choose a Category" tabIndex="3">
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
            
            <div className="col-6">
                <div className="form-group">
                    <div className={ errors.porsentaje ? 'form-group has-danger' : 'form-group' } >
                        <label className="control-label">Seleccione el procentaje de descuento </label>
                        <input min="1" max="99"  onChange={ (e) => setFormValues( data => ({ ...data, porcentaje: e.target.value }) )} className="form-control" placeholder="Procentaje" type="number"></input>
                        { errors.porsentaje &&  <small className="form-control-feedback"> Debe completar este campo </small> }
                    </div>
                </div>
            </div>
        </div>
    )



}




const FormSelectTotalVenta = ( { setFormValues }) => {

    return (
        <div className="row">            
            <div className="col-12">
                <div className="form-group">
                    <label className="control-label">Seleccione el procentaje de descuento</label>
                    <input min="1" max="99" onChange={ (e) => setFormValues( data => ({ ...data, porcentaje: e.target.value }) )} className="form-control" placeholder="Procentaje" type="number"></input>
                </div>
            </div>
        </div>
    )



}