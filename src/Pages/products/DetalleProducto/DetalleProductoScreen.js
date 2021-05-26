import React, { useEffect, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { getByCodigo } from '../../../services/productService';
import { getByCodigo as getCategoriaByCode } from '../../../services/categoriaService'
import { API_URL } from '../../../services/ApiService';



export const DetalleProductoScreen = () => {
    
    const formatter = useMemo(() => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }));


    const [product, setProduct] = useState();
    const [categoria, setCategoria] = useState()
    const search = useLocation().search;

    useEffect(() => {
        getByCodigo( new URLSearchParams(search).get('id') )
        .then( producto => {
            setProduct( producto );
        })
    }, [])


    useEffect(() => {
        if( product ) {
            getCategoriaByCode( product.categoria )
            .then( data => {
                setCategoria(data.categoria);
            });
        }
    }, [product])

    const handleModificar = () => {
        console.log('MODIFICAR CLICK');
    }
    return (
        <>
        <div className="row" style={{ width: '100%'}} >
        
            <div className="col-md-4  col-sm-12">
                <div className="card"> 
                    <img className="card-img-top"  src={ `${API_URL}/categoria/image/${categoria?.codigo}`} alt="Card image" />
                    <div className="card-body social-profile d-flex ">
                        <div className="align-self-center">
                            <h4 className="card-title">{ product?.nombre }</h4>
                            <p className="text-dark">{ product?.descripcion } </p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button onClick={ handleModificar } className="btn btn-danger btn-block">
                            Modificar
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-md-8 col-sm-12">
                <div className="carousel-inner" role="listbox">
                    {
                        product?.imagenes.map( image => (
                            <div className="carousel-item active" key={ image }>
                                <img className="d-block img-fluid" width="100%" height="100%" src={ `${API_URL}/producto/image/${product?.codigo}/${image}`}  alt="First slide" />
                            </div>
                        ))
                    }
                </div>
                <a className="carousel-control-prev"  role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next"  role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>        

        </div>

        <div className="row mt-5" style={{ width: '100%'}}>
            <div className="col-md-12" style={{ minWidth: '100%'}}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title m-b-20">Informacion del producto</h4>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item"> <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home5" role="tab" aria-controls="home5" aria-expanded="true"><span className="hidden-sm-up"><i className="ti-home"></i></span> <span className="hidden-xs-down">Detalle</span></a> </li>
                            <li className="nav-item"> <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile5" role="tab" aria-controls="profile"><span className="hidden-sm-up"><i className="ti-user"></i></span> <span className="hidden-xs-down">Estadisticas</span></a></li>
                        </ul>
                        <div className="tab-content tabcontent-border p-20" id="myTabContent">
                            <div role="tabpanel" className="tab-pane fade show active" id="home5" aria-labelledby="home-tab">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Codigo</th>
                                            <th>Precio</th>
                                            <th>Costo</th>
                                            <th>Stock</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><a href="javascript:void(0)">{ product?.codigo }</a></td>
                                            <td>{ formatter.format( product?.precio ) }</td>
                                            <td>{ formatter.format( product?.costo ) }</td>
                                            <td className={ product?.stock < 5 && 'text-danger'  }>{ product?.stock }</td>
                                            <td>
                                                {
                                                    product?.stock > 0 
                                                    ? <div class="label label-table label-success">Disponible</div>
                                                    : <div class="label label-table label-danger">En Falta</div>
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="profile5" role="tabpanel" aria-labelledby="profile-tab">
                                <p>FUNCIONALIDAD EN DESARROLLO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}



export default DetalleProductoScreen ;