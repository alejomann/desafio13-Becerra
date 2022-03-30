import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import ItemDetail from "./ItemDetail.js"
import { db } from "../firebase"
import { collection, getDocs, query, where } from "firebase/firestore";

const ItemDetailContainer = () => {

    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);
    const {idProducto} = useParams()

    useEffect(()=>{

      const productosCollection = collection(db, "productos")
      //filtro la base en el producto que tenga el id que tengo en al url (hay que pasar ese id a numero, porque es string)
      const filtroProductos = query(productosCollection, where("id", "==", Number(idProducto)));
      const filtrado = getDocs(filtroProductos)

      filtrado
        .then((resultado)=>{
            //seteo el primer esultado, que es el producto que tengo que mostrar
            setItem(resultado.docs[0].data())
        })
        .catch(()=>{
            console.log("Error al cargar los productos");
        })
        .finally(()=>{
            setLoading(false)
        }) 
    
      },[idProducto])
    
      if(loading){
        return <h1>Cargando...</h1>
      }else{
        return (
          <ItemDetail item={item}/>
        )
      }
    }  

export default ItemDetailContainer