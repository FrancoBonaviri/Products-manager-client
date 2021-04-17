import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Dropdown } from 'semantic-ui-react'
import { openAlert } from '../../../actions/uiActions';
import { getAllProvincias, getLocalidadByProvincia } from '../../../services/GeoService';
import { create } from '../../../services/solicitanteService';

import './NewSolicitanteScreen.css';


const initialStateFormValues = {
    nombre : '',
    apellido : '',
    email : '',
    codArea : '',
    telefono : '',
    provincia : '',
    localidad : '',
    codigoPostal : '',
    calle : '',
    altura : '',
    piso : ''
}
const intialStateFormErrors = {
    email : false,
    telefono : false,
}

export const NewSolictanteScreen = () => {

    const dispatch = useDispatch();

    const selectProv = useRef(null);
    const [provincias, setProvincias] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [formValues, setFormValues] = useState(initialStateFormValues);
    const [formErrors, setFormErrors] = useState(intialStateFormErrors);


    useEffect(() => {
        const arrayProvincias = []; 
        getAllProvincias()
        .then( data => {
            data.forEach( (item, i) => {
                arrayProvincias.push( droplDownItemParser(item, i) );
            });
            setProvincias([ ...arrayProvincias ]);
        })
        .catch( err => {
            dispatch( openAlert('error', 'Error desconocido ' + err) );
        })
    }, [])

    useEffect(() => {
        if( formValues.provincia ) {
            const arrayLocalidades = []; 
            getLocalidadByProvincia( formValues.provincia )
            .then( res => {
                res.forEach( (item, i) => {
                    arrayLocalidades.push( droplDownItemParser( item, i ) );
                });
                setLocalidades( [...arrayLocalidades] );
            })
            .catch( err => {
                dispatch( openAlert('error', 'Error desconocido ' + err) );
            })
        }
    }, [formValues.provincia])
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if( validator() ) {

            create( 
                formValues.nombre, formValues.apellido, formValues.email,
                formValues.codArea, formValues.telefono, formValues.provincia,
                formValues.localidad, formValues.codigoPostal, formValues.calle,
                formValues.altura, formValues.piso
            ).then( res => {
                dispatch( openAlert( 'success', 'El solicitante fue creado correctamente.' ) );
            })
            .finally( () => {
                resetForm();
            });

        }
    }
    
    const onFormChange = ( {target} ) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const droplDownItemParser = ( item, i ) => {
        return {
            key: i,
            value: item.nombre,
            text: item.nombre
        }
    }

    const validator = () => {

        const errorTranferObject = { ...intialStateFormErrors };

        if( (!formValues.email || !formValues.email.trim()) && (!formValues.telefono || !formValues.telefono.trim()) ) {
            errorTranferObject.telefono = true;
            errorTranferObject.email = true;
        }


        setFormErrors( { ...errorTranferObject } );

        for( let key of Object.keys( errorTranferObject ) ){
            if( errorTranferObject[key] ){
                dispatch( openAlert('warning', 'Debe completar el email o el telefono del solicitante.') );
                return false;
            }
        }

        return true;

    }

    const resetForm = () => {
        setFormValues({...initialStateFormValues});
        setFormErrors({...intialStateFormErrors});
        setLocalidades([]);
        selectProv.current.clearValue()
    }

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h4 className="m-b-0 text-white">Nuevo solicitante</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} onChange={ onFormChange }>
                                <div className="form-body">
                                    <h3 className="card-title">{ formValues.nombre || formValues.apellido ? `${formValues.nombre} ${formValues.apellido}` : 'Nombre del solicitante' }</h3>
                                    <hr />
                                    <div className="row p-t-20">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Nombre</label>
                                                <input value={ formValues.nombre } type="text" className="form-control" name="nombre" placeholder="Nombre" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Apellido</label>
                                                <input value={ formValues.apellido } type="text" className="form-control" name="apellido" placeholder="Apellido" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className={ formErrors.email ? "form-group has-danger" : "form-group" }>
                                                <label className="control-label">Email</label>
                                                <input value={ formValues.email } type="text" name="email" className="form-control" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label className="control-label">Cod Area</label>
                                                        <input value={ formValues.codArea } type="text" name="codArea" className="form-control" placeholder="Descripcion" />
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <div className={ formErrors.email ? "form-group has-danger" : "form-group" }>
                                                        <label className="control-label">Telefono</label>
                                                        <input value={ formValues.telefono } type="text" name="telefono" className="form-control" placeholder="Descripcion" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="control-label">Provincia</label>
                                                <Dropdown ref={ selectProv } options={ provincias } onChange={ (e, value) => setFormValues({ ...formValues, provincia: value.value }) } name='provincia' placeholder='Provincia' search selection className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="control-label">Localidad</label>
                                                <Dropdown options={ localidades } placeholder='Localidad' onChange={ (e, value) => setFormValues({ ...formValues, localidad: value.value }) } name='localidad' search selection  className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="control-label">Codigo Postal</label>
                                                <input value={ formValues.codigoPostal } type="text" className="form-control" name="codigoPostal" placeholder="Codigo Postal" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="control-label">Calle</label>
                                                <input value={ formValues.calle } type="text" className="form-control" name="calle" placeholder="Calle" />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="control-label">Altura</label>
                                                <input value={ formValues.altura } type="text" className="form-control" name="altura" placeholder="Altura" />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="control-label">Piso</label>
                                                <input value={ formValues.piso } type="text" className="form-control" name="piso" placeholder="Piso" />
                                            </div>
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
