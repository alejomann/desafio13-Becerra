import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { contexto } from '../context/cartContext'
import { db } from "../firebase"
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { useState } from 'react'

const Cart = () => {

  const navigate = useNavigate();

  const {carrito,total,removeItem,clear} = useContext(contexto)

  const handleClear = () => {
    clear()
  }

  const terminarCompra = () => {
    const orden = {
      buyer : {
        nombre : "Pedro",
        telefono : "55664433",
        email : "mail@mail.com"
      },
      items : carrito,
      fecha : serverTimestamp(),
      total : total
    }

    const ordenesCollection = collection(db, "ordenes")
    const nuevaOrden = addDoc(ordenesCollection, orden)

    nuevaOrden
      .then(resultado=>{
        console.log("Pedido realizado!");
        alert("Pedido realizado! Número de pedido: "+resultado.id);
        clear()
        navigate('../Gracias', resultado.id);
        // console.log(resultado.id);
      })
      .catch(()=>{
        console.log("Error al cargar el pedido");
      })
    
  }

  return (
    <>
      <div className='titular'>Mi carrito</div>
        {carrito.length >= 1 ? (
          
          <ul className='carrito'>
            {carrito.map(item => (
              <li key={item.id}>
                <img src={item.image}></img>
                <div className='info'>
                  <h4>{item.title}</h4>
                </div>
                <div className='precio d-flex'>
                  <p><span>{item.cantidadSeleccionada}</span> x $ {item.price}</p>
                </div>
                <div className='total d-flex'>
                  <p>$ {item.cantidadSeleccionada*item.price}</p>
                </div>
                <div className='borrar'>
                  <button onClick={()=>{removeItem(item.id)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                  </button>
                </div>
              </li>
            ))}
            <div className='barratotal'>
              <p>Total: <b>$ {total}</b></p>
            </div>
            <button className='vaciar btn btn-primary px-4 py-2 ms-auto mb-3' onClick={terminarCompra}>FINZALIZAR COMPRA</button>
            <button className='vaciar btn btn-secondary px-4 py-2 ms-auto' onClick={handleClear}>LIMPIAR CARRITO</button>
          </ul>

        ) : (

          <ul className='carrito'>
            <p>Tu carrito esta vacío.</p>
            <Link to="/" className='btn btn-primary px-4 py-2 ms-auto'>Ir a la tienda</Link>
          </ul>

        )}
    </>
  )
}

export default Cart