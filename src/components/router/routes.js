import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ListCategoriasScreen } from '../../Pages/categorias/listCategoriasScreen/ListCategoriasScreen'
import { NewCategoriaScreen } from '../../Pages/categorias/newCategoriaScreen/NewCategoriaScreen'
import { ListComprasHistoricas } from '../../Pages/compras/ListComprasHistoricas/ListComprasHistoricas'
import { ComprasPendientes } from '../../Pages/compras/ListComprasPendientes/ComprasPendientes'
import { NewCompraScreen } from '../../Pages/compras/NewCompraScreen/NewCompraScreen'
import { ListProductsScreen } from '../../Pages/products/listProductsScreen/ListProductsScreen'
import { NewProductScreen } from '../../Pages/products/newProductScreen/NewProductScreen'
import { ListSolicitanteScreen } from '../../Pages/solicitantes/ListSolicitanteScreen/ListSolicitanteScreen'
import { NewSolictanteScreen } from '../../Pages/solicitantes/NewSolicitanteScreen/NewSolictanteScreen'
import { ListSolicitudesVentas } from '../../Pages/ventas/ListSolicitudesVentas/ListSolicitudesVentas'
import { ListVentasHistoricas } from '../../Pages/ventas/ListVentasHistoricasScreen/ListVentasHistoricas'
import { ListVentasPendientes } from '../../Pages/ventas/ListVentasPendientesScreen/ListVentasPendientes'
import { NewVentaScreen } from '../../Pages/ventas/NewVentaScreen/NewVentaScreen'



export const Routes = () => {

    
    return (
        <Switch>
            
            <Route path="/" exact >
                <h1>HOMEPAGE</h1>
            </Route>

            <Route path="/new-product" exact >
                <NewProductScreen />
            </Route>

            <Route path="/list-product" exact >
                <ListProductsScreen />
            </Route>

            <Route path="/new-categoria" exact >
                <NewCategoriaScreen />
            </Route>

            <Route path="/list-categoria" exact >
                <ListCategoriasScreen />
            </Route>

            <Route path="/new-compra" exact >
                <NewCompraScreen />
            </Route>

            <Route path="/list-compras-pendientes" exact >
                <ComprasPendientes />
            </Route>

            <Route path="/compras-historicas" exact >
                <ListComprasHistoricas />
            </Route>

            <Route path="/new-solicitante" exact >
                <NewSolictanteScreen />
            </Route>

            <Route path="/list-solicitante" exact >
                <ListSolicitanteScreen />
            </Route>

            <Route path="/new-venta" exact >
                <NewVentaScreen />
            </Route>

            <Route path="/ventas-pendientes" exact >
                <ListVentasPendientes />
            </Route>

            <Route path="/solicitudes-venta" exact >
                <ListSolicitudesVentas />
            </Route>

            <Route path="/ventas-historicas" exact >
                <ListVentasHistoricas />
            </Route>
            
            <Route path="/profile" exact >
                <h1>PERFIL</h1>
            </Route>

            <Route path="/settings" exact >
                <h1>Settings</h1>
            </Route>


        </Switch>
    )
}
