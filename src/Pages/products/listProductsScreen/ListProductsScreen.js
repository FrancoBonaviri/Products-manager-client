import React, { useEffect, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { getCantidad, get } from '../../../services/productService';
import { EmptyState } from '../../../components/empty/EmptyState';
import { NavLink } from 'react-router-dom'
export const ListProductsScreen = () => {
    
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const [pagesCant, setPagesCant] = useState(1);
    const [inputSearch, setInputSearch] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');



    useEffect(() => {
        get( page, inputSearch, fechaDesde, fechaHasta )
        .then( resProducts => {
            setProducts([...resProducts.productos])
            setPagesCant( Math.ceil( resProducts.total / 20 )  );
        })
        .catch( err => {
            console.log(err);
        });
    }, [page, inputSearch, fechaDesde, fechaHasta ])


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
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon1">
                                            <i className="fas fa-search"></i>
                                        </span>
                                        <input value={ inputSearch } onChange={ ({target}) =>  setInputSearch( target.value ) }  type="text" class="form-control" placeholder="Codigo, Nombre, ..." aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div class="input'roup mb-3">
                                        <input value={ fechaDesde } onChange={ ({target}) => setFechaDesde( target.value )} type="date" class="form-control" placeholder="Desde"  />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div class="input-group mb-3">
                                        <input value={ fechaHasta } onChange={ ({target}) => setFechaHasta( target.value )} type="date" class="form-control" placeholder="Hasta" />
                                    </div>
                                </div>
                            </div>
                        {
                            products.length > 0 ?
                            <>
                            <h4 className="card-title">Productos</h4>
                            <div className="table-responsive" >
                                <table className="table color-table primary-table">
                                    <thead >
                                        <tr>
                                            <th>Codigo</th>
                                            <th>Nombre</th>
                                            <th>Categoria</th>
                                            <th>Precio</th>
                                            <th>Costo</th>
                                            <th>Stock</th>
                                            <th>Detalle</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            products.map( (product, i) => (
                                                <ListProductItem key={ i } product={ product }/>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            </>
                            :
                            <EmptyState itemToAdd='producto' link='/new-product'/>

                        }


                        </div>
                    </div>
                </div>
                
            </div>



            

        {
            pagesCant > 1 &&
            <div className="mt-5">
                <Pagination count={ pagesCant } page={ page } onChange={ handleChange } size="large" />
            </div>
        }

        </>
    );
}


const ListProductItem = ({ product }) => {


    const handleCopyCode = ( code ) => {
        var aux = document.createElement("input");

        // Asigna el contenido del elemento especificado al valor del campo
        aux.setAttribute("value", code );
      
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
        console.log( product.codigo );
    }

    return (
        <tr>
            <td>{ product.codigo || "-" }  <i onClick={ () => handleCopyCode( product.codigo ) } style={{ cursor: 'pointer'}} className="fas fa-copy ml-1"/></td>
            <td>{ product.nombre || "-" }</td>
            <td>{ product.categoria || "-" }  <i onClick={ () => handleCopyCode( product.categoria ) } style={{ cursor: 'pointer'}} className="fas fa-copy ml-1"/></td>
            <td>${ product.precio || "-" }</td>
            <td>${ product.costo || "-" }</td>
            <td>{ product.stock || "-" }</td>
            <td><NavLink to={ `/detalle-producto?id=${ product.codigo }` }><span style={{ cursor: 'pointer' }} className="badge bg-info">Ir al detalle</span></NavLink></td>
        </tr>
    );

}