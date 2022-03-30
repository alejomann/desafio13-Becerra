import ItemList from "./ItemList"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../firebase"
import { collection, getDocs, query, where } from "firebase/firestore";

const ItemListContainer = () => {

    const [loading, setLoading] = useState(true)
    const [productos, setProductos] = useState([])
    const {idCategoria} = useParams()
    // let categoria = "";
    
    useEffect(() => {

        const productosCollection = collection(db, "productos")
        const consulta = getDocs(productosCollection)

        if(!idCategoria){

            consulta
                .then((resultado)=>{
                    const arrayResultados = resultado.docs.map((doc) => {
                        // console.log(doc.data());
                        // console.log(doc.id);
                        return doc.data()
                    });
                    setProductos(arrayResultados)
                })
                .catch(()=>{
                    console.log("Error al cargar los productos");
                })
                .finally(()=>{
                    setLoading(false)
                })

        }else{
            
            const filtroProductos = query(productosCollection, where("category", "==", idCategoria));
            const filtrado = getDocs(filtroProductos)

            filtrado
                .then((resultado)=>{
                    const arrayResultados = resultado.docs.map((doc) => {
                        return doc.data()
                    });
                    setProductos(arrayResultados)
                })
                .catch(()=>{
                    console.log("Error al cargar los productos");
                })
                .finally(()=>{
                    setLoading(false)
                }) 

        }

    },[idCategoria])

    if(loading){
        return <h1>Cargando...</h1>
    }else{
        return <div className='container-xl mt-3 grillaProductos'><ItemList productos={productos}/></div>
    }
}

export default ItemListContainer