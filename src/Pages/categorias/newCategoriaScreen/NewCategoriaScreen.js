import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { createCategoria } from '../../../services/categoriaService';

import './NewCategoriaScreen.css'


export const NewCategoriaScreen = () => {


    const [errors, setErrors] = useState({
        nombre: false,
        descripcion: false
    });
    const [formValues, setFormValues] = useState({
        nombre: '',
        descripcion: ''
    });
    const [file, setFile] = useState([]);
    const [banner, setBanner] = useState(null)






    const onFormChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if( validator() ){
            createCategoria(formValues.nombre, formValues.descripcion, file)
            .then( () => {
                console.log('Categoria Cargada correctamente');
                clearForm();
            })
            .catch( err => {
                console.log(err);
            })
        }

    }


    const validator = () => {

        const errorsTranferObject = {
            descripcion: false,
            nombre: false
        };

        if( !formValues.nombre || !formValues.nombre.trim() ) {
            errorsTranferObject.nombre = true;
        }

        if( !formValues.descripcion || !formValues.descripcion.trim()) {
            errorsTranferObject.descripcion = true;
        }

 

        setErrors( errorsTranferObject );
        if( errorsTranferObject.descripcion || errorsTranferObject.nombre ){
            return false;
        }

        return true;
    }

    const clearForm = () => {
        setFormValues({
            nombre: '' ,
            descripcion: ''
        });
        setBanner( null );
        setFile([]);
        setErrors({
            descripcion: false,
            nombre: false
        });
    }

    const onDrop = useCallback( acceptedFile => {
        const file = acceptedFile[0];
        setFile(file);

        setBanner( URL.createObjectURL( file ) );
    });
    

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png, image/jpg',
        noKeyboard: true,
        onDrop,
        noDragf: false
    });


    return (
        <div className="col-12">
        <div className="row">
             <div className="col-lg-12">
                 <div className="card">
                     <div className="card-header bg-primary">
                         <h4 className="m-b-0 text-white">Nueva Categoria</h4>
                     </div>
                     <div className="card-body">
                         <form onSubmit={ handleSubmit } onChange={ onFormChange }>
                             <div className="form-body">
                                 <h3 className="card-title">{ formValues.nombre?.trim() ? formValues.nombre : 'Nombre de la categoria' }</h3>
                                 <hr />
                                 <div className="row p-t-20">
                                     <div className="col-md-12">
                                         <div className={ errors.nombre ? "form-group has-danger" : "form-group" }>
                                             <label className="control-label">Nombre</label>
                                             <input value={ formValues.nombre } type="text" className="form-control" name="nombre" placeholder="Categoria" />
                                             { errors.nombre && <small className="form-control-feedback"> Debe completar este campo </small> } 
                                         </div> 
                                     </div>
                                 </div>
                                 <div className="row">
                                     <div className="col-md-12">
                                         <div className={ errors.descripcion ? "form-group has-danger" : "form-group" }>
                                             <label className="control-label">Descripcion</label>
                                             <input value={ formValues.descripcion } type="text" name="descripcion" className="form-control" placeholder="Descripcion" />
                                             { errors.descripcion && <small className="form-control-feedback"> Debe completar este campo </small> } 
                                         </div>
                                     </div>
                                 </div>

                                 <div className="row">


                                     <div className="col-12">
                                        { !banner 
                                            ?  <>
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
                                                <input { ...getInputProps() } />
                                            </>
                                            : <div className="banner-image" style={{ 
                                                backgroundImage: `url('${ banner }')`,
                                            }}>
                                                <div onClick={ () => setBanner( null ) }>
                                                    <i className="fas fa-times" />
                                                </div>

                                            </div>
                                         
                                        }

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
