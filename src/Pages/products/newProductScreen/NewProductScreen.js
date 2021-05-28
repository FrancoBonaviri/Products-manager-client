import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { openAlert } from '../../../actions/uiActions';
import { API_URL } from '../../../services/ApiService';
import { GetAllCategoriaSinPaginador } from '../../../services/categoriaService';
import { create, update } from '../../../services/productService';
import { getByCodigo } from '../../../services/productService'
import './NewProductScreen.css'

const initialFormValues = {
    nombre: '',
    descripcion: '',
    categoria: '' ,
    precio: '',
    costo: ''
};
const initialErrorsForm = {
    nombre: false,
    descripcion: false,
    categoria: false ,
    precio: false,
    costo: false
};

export const NewProductScreen = () => {

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initialFormValues);
    const [errors, setErrors] = useState(initialErrorsForm);
    const [categorias, setCategorias] = useState([]);
    const [files, setFiles] = useState([]);
    const [updatedProduct, setUpdatedProduct] = useState(null)

    const search = useLocation().search;

    useEffect(() => {
        const id = new URLSearchParams(search).get('id')
        if( id ) {
            getByCodigo( id )
            .then( producto => {

                setUpdatedProduct( producto );
                const arrayFiles = producto.imagenes.map(image => `${API_URL}/producto/image/${producto.codigo}/${image}`)

                setFiles([...arrayFiles]);
                setFormValues( values => ({
                    ...values,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    precio: producto.precio,
                    costo: producto.costo
                }));
            })
        }
    }, [])




    useEffect(() => {
        GetAllCategoriaSinPaginador().then( cats => {
            setCategorias( [ ...cats ] );
        })
    }, [])




    const handleSubmit = (e) => {


        if( validator() ){
            
            if( updatedProduct ) {
                update( formValues.nombre, formValues.descripcion, formValues.precio, formValues.costo, files, updatedProduct )
                .then( res => {
                    resetForm();
                    dispatch( openAlert('success', 'El producto fue actualizado correctamente ' ) );
                    setUpdatedProduct( null );
                })
                .catch( err => {
                    dispatch( openAlert('error', err.message ));
                });
            } else {                
                create(formValues.nombre, formValues.descripcion, formValues.precio, formValues.categoria, formValues.costo, files)
                .then( res => {
                    console.log(res);
                    resetForm();
                })
                .catch( err => {
                    dispatch( openAlert('error', err.message ));
                });
            }

        }


        e.preventDefault()
    }



    const onDrop = useCallback( acceptedFile => {
        setFiles( [...files, ...acceptedFile]);
    });

    
    
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png, image/jpg',
        noKeyboard: true,
        onDrop,
        noDragf: false
    });


    const onChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const validator = () => {

        const errorTranferObject = { ...initialErrorsForm }


        if( !formValues.nombre || !formValues.nombre.trim() ){
            errorTranferObject.nombre = true;
        }

        if( !formValues.descripcion || !formValues.descripcion.trim() ){
            errorTranferObject.descripcion = true;
        }

        if( !updatedProduct &&  (!formValues.categoria || !formValues.categoria.trim()) ){
            errorTranferObject.categoria = true;
        }

        
        if( !formValues.precio || !formValues.precio.toString().trim() || Number(formValues.precio < 0) ){
            errorTranferObject.precio = true;
        }

        if( !formValues.costo || !formValues.costo.toString().trim() || Number(formValues.costo < 0) ){
            errorTranferObject.costo = true;
        }

        setErrors({...errorTranferObject});

        for( let key of Object.keys( errorTranferObject )) {
            if( errorTranferObject[key] ) {
                return false
            }
        };


        return true;
    };

    const handleDeleteImage = (i) => {
        const temp_files = files.filter( (file, index) => index != i);
        
        setFiles(temp_files);
    }


    const resetForm = () => {
        setErrors( initialErrorsForm );
        setFormValues( initialFormValues );
        setFiles([]);
    };


    return (
        <div className="col-12">
           <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h4 className="m-b-0 text-white">{updatedProduct ? `Actualizar producto: ${ updatedProduct.codigo }` : 'Nuevo producto'}</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={ handleSubmit } onChange={ onChange }>
                                <div className="form-body">
                                    <h3 className="card-title">{ formValues.nombre && formValues.nombre.trim() ? formValues.nombre : 'Nombre del producto'}</h3>
                                    <hr />
                                    <div className="row p-t-20">
                                        <div className="col-md-12">
                                            <div className={ errors.nombre ? 'form-group has-danger' : 'form-group' }>
                                                <label className="control-label">Nombre</label>
                                                <input value={ formValues.nombre } type="text" className="form-control" name="nombre" placeholder="Producto"  tabIndex="1"/>
                                                {    errors.nombre &&  <small className="form-control-feedback"> Debe completar este campo </small> }
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className={ !updatedProduct ? "col-md-6" : 'col-md-12'}>
                                            <div className={ errors.descripcion ? 'form-group has-danger' : 'form-group' }>
                                                <label className="control-label">Descripcion</label>
                                                <input value={ formValues.descripcion } type="text" name="descripcion" className="form-control" placeholder="Descripcion" tabIndex="2"/>
                                                { errors.descripcion &&  <small className="form-control-feedback"> Debe completar este campo </small> }
                                            </div>
                                        </div>
                                        {
                                            !updatedProduct && 
                                            <div className="col-md-6">
                                                <div className={ errors.categoria ? 'form-group has-danger' : 'form-group' } >
                                                    <label className="control-label">Categoria</label>
                                                    <select defaultValue='no-selected' className="form-control custom-select" name="categoria" style={{ minHeight: '48px' }} data-placeholder="Choose a Category" tabIndex="3">
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
                                        }
                                    </div>
                                    <div className="row">

                                        <div className="col-md-6">

                                            <div className={ errors.precio ? 'form-group has-danger' : 'form-group' }>
                                                <label htmlFor="price">Precio</label>
                                                <div className="input-group">
                                                    <div className="input-group-addon"><i className="fas fa-money-bill-wave"></i></div>
                                                    <input value={ formValues.precio } name="precio" type="number" className="form-control" id="price" placeholder="Precio" tabIndex="4"/>
                                                </div>
                                                { errors.precio &&  <small className="form-control-feedback"> Debe completar este campo </small> }
                                            </div>
                                        </div>

                                        <div className="col-md-6">

                                            <div className={ errors.costo ? 'form-group has-danger' : 'form-group' } >
                                                <label htmlFor="cost">Costo</label>
                                                <div className="input-group">
                                                    <div className="input-group-addon"><i className="fas fa-dollar-sign"></i></div>
                                                    <input value={ formValues.costo } name="costo" type="number" className="form-control" id="cost" placeholder="Costo" tabIndex="5"/>
                                                </div>
                                               { errors.costo &&  <small className="form-control-feedback"> Debe completar este campo </small> }
                                            </div>
                                        </div>
                                        
                                    </div>



                                    <div className="row">


                                        <div className="col-12">
                                            <input id='upload' { ...getInputProps() } />
                                            {
                                                files.length <= 0 
                                                ?
                                                    <>
                                                        <div 
                                                            { ...getRootProps() } 
                                                            className="dropzone"
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderRadius: '.25rem'
                                                            }}
                                                        >
                                                        <span>Carga las imagenes aqui</span>

                                                        </div>

                                                    </>
                                                :
                                                <>
                                                    <div className="dropzone">

                                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                                            {
                                                                files.map( (file, i )=> (

                                                                    <div className="card p-2" key={i}>  
                                                                        <div className="card-body image" style={{ backgroundImage: `url(' ${ (typeof file == 'string') ? file : URL.createObjectURL(file) } ') `}}  >
                                                                            <div onClick={ () => handleDeleteImage(i) }>
                                                                                <i className="fas fa-times" />
                                                                            </div>
                                                                        </div> 
                                                                    </div>
                                                                ))
                                                            }

                                                        </div> 
                                                        {
                                                            files.length < 8 &&
                                                            <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <label htmlFor="upload" className="btn btn-primary"> Agregar otra</label>                                   
                                                            </div>

                                                        }
                                                    </div>
                                                </>
                                            }

                                        </div>


                                    </div>

                                </div>
                                <div className="form-actions mt-4">
                                    <button type="submit" className="btn btn-info"> <i className="fa fa-check" tabIndex="6"></i> Guardar</button>                                   
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
