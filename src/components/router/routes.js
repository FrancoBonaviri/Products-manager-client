import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ListCategoriasScreen } from '../../Pages/categorias/listCategoriasScreen/ListCategoriasScreen'
import { NewCategoriaScreen } from '../../Pages/categorias/newCategoriaScreen/NewCategoriaScreen'
import { NewCompraScreen } from '../../Pages/compras/NewCompraScreen/NewCompraScreen'
import { ListProductsScreen } from '../../Pages/products/listProductsScreen/ListProductsScreen'
import { NewProductScreen } from '../../Pages/products/newProductScreen/NewProductScreen'



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
                <h1>Compras Pendientes</h1>
            </Route>

            <Route path="/compras-historicas" exact >
                <h1>Compras Historicas</h1>
            </Route>

            <Route path="/new-venta" exact >
                <h1>Nueva Venta</h1>
            </Route>

            <Route path="/ventas-pendientes" exact >
                <h1>Ventas Pendientes</h1>
            </Route>

            <Route path="/solicitudes-venta" exact >
                <h1>Solicitudes Venta</h1>
            </Route>

            <Route path="/ventas-historicas" exact >
                <h1>Ventas historicas</h1>
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
