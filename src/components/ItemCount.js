import React from 'react'
import { useState } from 'react'

const ItemCount = ({initial,stock,onAdd}) => {

    let [estado,setEstado] = useState(initial)

    //sumo producto
    const clickMenos = () => {
        if(estado>0){
            setEstado(estado-1)
        }
    }

    //resto producto
    const clickMas = () => {
        if(estado<stock){
            setEstado(estado+1)
        }
    }

    //agregar al carrito
    const agregarCarrito = () => {
        onAdd(estado)
    }

    return (
        <div className='contadorProductos'>
            <div className='contSumaResta'>
                <button className='btnResta' onClick={clickMenos}>-</button>
                <input className='numero' value={estado} disabled></input>
                <button className='btnSuma' onClick={clickMas}>+</button>
            </div>
            <button className='btn btn-outline-primary mt-2 w-100 btnAgregar' onClick={agregarCarrito}>AGREGAR</button>
        </div>
    )

}

export default ItemCount