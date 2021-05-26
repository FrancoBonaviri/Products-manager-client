import React, { useEffect, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { getAllcategorias } from '../../../services/categoriaService';
import { getCantidadCategorias } from '../../../services/ApiService';
import {getCantidadByCategoria} from '../../../services/productService'
import { EmptyState } from '../../../components/empty/EmptyState';


export const ListCategoriasScreen = () => {



    const [page, setPage] = useState(1)
    const [categorias, setCategorias] = useState([])
    const [pageCant, setPageCant] = useState(1)


    useEffect(() => {
        getCantidadCategorias().then( res => {
            setPageCant( Math.ceil(res.data.cantidad / 20) )
        })
    }, [])

    useEffect(() => {
        getAllcategorias(page).then( data => {
            setCategorias([...data])
        })
    }, [page])


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
            <td>{ productsCantidad }</td>
            <td><span style={{ cursor: 'pointer' }} onClick={ handleDetailClick } className="badge bg-info">Ir al detalle</span></td>
        </tr>  


    )



}