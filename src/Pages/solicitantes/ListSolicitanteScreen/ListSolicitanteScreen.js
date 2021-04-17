import React, { useEffect, useState } from 'react'
import { EmptyState } from '../../../components/empty/EmptyState';
import Pagination from '@material-ui/lab/Pagination';
import { getAll } from '../../../services/solicitanteService';
import { useDispatch } from 'react-redux';
import { openAlert } from '../../../actions/uiActions';
import moment from 'moment'


export const ListSolicitanteScreen = () => {

    const dispatch = useDispatch();

    const [pageCant, setPageCant] = useState(1);
    const [page, setPage] = useState(1);
    const [solicitantes, setSolicitantes] = useState([]);



    useEffect(() => {
        getAll(page)
        .then( data => {
            setPageCant( Math.round(data.cantidad / 20) );
            setSolicitantes([...data.solicitantes])
        })
        .catch( err => {
            dispatch( openAlert('error', 'Error desconocido ' + err ) );
        });
    }, []);


    console.log(solicitantes)
    const handleChange = (e, value) => {
        setPage(value)     
    }



    return (
        <>
        <div className="row no-scrollbar" style={{ width : '100%', maxHeight: '79vh', overflowY : 'scroll'  }} >
            <div className="col-12 " >
                <div className="card">
                    <div className="card-body">
                    {
                        solicitantes.length > 0 ?
                        <>
                            <h4 className="card-title">Categorias</h4>
                            <div className="table-responsive" >
                                <table className="table color-table primary-table">
                                    <thead >
                                        <tr>
                                            <th>Codigo</th>
                                            <th>Nombre completo</th>
                                            <th>email / telefono</th>
                                            <th>Fecha de alta</th>
                                            <th>Detalle</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        { solicitantes.map( item => (
                                            <ListSolicitanteItem solicitante={ item } key={ item.codigo }/>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                        : <EmptyState link='/new-solicitante'  itemToAdd='solicitante'/>
                    }

                    </div>
                </div>
            </div>


            
        </div>

        {
            pageCant > 1 &&
            <div className="mt-5">
                <Pagination count={pageCant} page={ page } onChange={ handleChange } size="large" />
            </div>
        }

        </>
    )
}


const ListSolicitanteItem = ({ solicitante }) => {
    
    
    const handleCopyCode = () => {
        var aux = document.createElement("input");

        // Asigna el contenido del elemento especificado al valor del campo
        aux.setAttribute("value", solicitante.codigo);
      
        // Añade el campo a la página
        document.body.appendChild(aux);
      
        // Selecciona el contenido del campo
        aux.select();
      
        // Copia el texto seleccionado
        document.execCommand("copy");
      
        // Elimina el campo de la página
        document.body.removeChild(aux);
    }


    const handleDetailClick = () => {
        console.log('TODO IMPLEMENTAR DETALLE CATEGORIA');
    }

    return (
        <tr>
            <td>{solicitante.codigo}   <i onClick={ () => handleCopyCode() } style={{ cursor: 'pointer'}} className="fas fa-copy ml-1"/></td>
            <td>{solicitante.nombre || solicitante.apellido ? `${ solicitante.nombre } ${ solicitante.apellido }` : '-'}</td>
            <td>{solicitante.email ? solicitante.email : solicitante.telefono | '-' } </td>
            <td>{ moment(solicitante.fechaAlta).format('DD/MM/YYYY HH:mm') }</td>
            <td><span style={{ cursor: 'pointer' }} onClick={ handleDetailClick } className="badge bg-info">Ir al detalle</span></td>
        </tr>  
    )
}