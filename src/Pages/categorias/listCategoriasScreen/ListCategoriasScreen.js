import React, { useEffect, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { getAllcategorias } from '../../../services/categoriaService';
import {getCantidadByCategoria} from '../../../services/productService'
import { EmptyState } from '../../../components/empty/EmptyState';
import moment from 'moment';

export const ListCategoriasScreen = () => {



    const [page, setPage] = useState(1)
    const [categorias, setCategorias] = useState([])
    const [pageCant, setPageCant] = useState(1)
    const [inputSearch, setInputSearch] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    useEffect(() => {
        getAllcategorias(page, inputSearch, fechaDesde, fechaHasta).then( data => {
            setCategorias( [ ...data.categorias ] )
            setPageCant( Math.ceil(data.total / 20) )
            console.log(data.categorias);
        })
    }, [page, inputSearch, fechaDesde, fechaHasta])



    const handleChange = (e, value) => {
        setPage(value)     
    }





    return (
        <>
        <div className="row no-scrollbar" style={{ width : '100%', maxHeight: '79vh', overflowY : 'scroll'  }} >
            <div className="col-12 " >
                <div className="card">
                    <div className="card-body">

                        <div className="row">
                            <div className="col-6">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-search"></i>
                                    </span>
                                    <input value={ inputSearch } onChange={ ({target}) =>  setInputSearch( target.value ) }  type="text" className="form-control" placeholder="Codigo, Nombre, ..." aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="input'roup mb-3">
                                    <input value={ fechaDesde } onChange={ ({target}) => setFechaDesde( target.value )} type="date" className="form-control" placeholder="Desde"  />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="input-group mb-3">
                                    <input value={ fechaHasta } onChange={ ({target}) => setFechaHasta( target.value )} type="date" className="form-control" placeholder="Hasta" />
                                </div>
                            </div>
                        </div>
                        
                    {
                        categorias.length > 0 ?
                        <>
                            <h4 className="card-title">Categorias</h4>
                            <div className="table-responsive" >
                                <table className="table color-table primary-table">
                                    <thead >
                                        <tr>
                                            <th>Codigo</th>
                                            <th>Nombre</th>
                                            <th>Banner</th>
                                            <th>Fecha de Alta</th>
                                            <th>Productos</th>
                                            <th>Detalle</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        { categorias.map( item => (
                                            <ListCategoriaItem categoria={ item } key={ item.codigo }/>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                        : <EmptyState link='/new-categoria'  itemToAdd='categoria'/>
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



const ListCategoriaItem = ({categoria}) => {


    const [productsCantidad, setProductsCantidad] = useState(0)

    useEffect(() => {
        getCantidadByCategoria(categoria.codigo).then( data =>{ 
            setProductsCantidad( data );
        })
    }, [categoria])


    const handleCopyCode = () => {
        var aux = document.createElement("input");

        // Asigna el contenido del elemento especificado al valor del campo
        aux.setAttribute("value", categoria.codigo);
      
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
            <td>{categoria.codigo}   <i onClick={ () => handleCopyCode() } style={{ cursor: 'pointer'}} className="fas fa-copy ml-1"/></td>
            <td>{categoria.nombre}</td>
            <td>{categoria.banner || 'Sin banner'} </td>
            <td>{ moment( categoria.fechaAlta ).format('DD/MM/YYYY HH:mm')  } </td>
            <td>{ productsCantidad }</td>
            <td><span style={{ cursor: 'pointer' }} onClick={ handleDetailClick } className="badge bg-info">Ir al detalle</span></td>
        </tr>  


    )



}