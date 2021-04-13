import React from 'react'
import empty from '../../assets/images/box.svg'
import { Link } from 'react-router-dom';


export const EmptyState = ({ itemToAdd, link }) => {
    return (
        <div
            style={{
                minHeight: '30vh',
                minWidth: '300px',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'lightgray',
                borderRadius: '5px'
            }}
        >

            <div style={{ textAlign: 'center', margin: '30px', padding: '30px'}}>
                <img src={ empty } style={{ height: '270px', with: '270px' }}  />
                <p className='pt-5' >No hay items en este listado. Podes agregar un { itemToAdd } picando <Link to={ link }> Aqui </Link></p>
            </div>

            

            
        </div>
    )
}
