import React from 'react'
import ItemCount from "./ItemCount.js"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { contexto } from '../context/cartContext.js'

const ItemDetail = ({item}) => {

    const {addItem} = useContext(contexto)

    let [cantSeleccionada,setCantSeleccionada] = useState(0)
    
    //agrego al carrito
    const onAdd = (cantidadSeleccionada) => {
        setCantSeleccionada(cantidadSeleccionada)
        addItem(item,cantidadSeleccionada)
    }

    return (
        <div className='contDetalle'>
            <div className='contFoto'>
                <img src={item.image} alt="" className="card-img-top w-100" />
            </div>
            <div className="contData">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p className='price'>{"$"}{item.price}</p>
                <p className="descripcion">{item.description}</p>
                <ItemCount stock={10} onAdd={onAdd} initial={1}/>

                {cantSeleccionada  ? (
                    <Link to="../carrito" className='btn-primary btn mt-3 px-4 py-2'>Terminar mi compra</Link>
                ) : (
                    <span></span>
                )}

            </div>
        </div>
    )
}

export default ItemDetail