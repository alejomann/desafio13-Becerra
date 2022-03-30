import { createContext } from "react";
import { useState } from "react";

export const contexto = createContext()

// const {Provider, Consumer} = contexto
const {Provider} = contexto

const MiProvider = ({children}) => {

    const [carrito, setCarrito] = useState([])
    const [cantidad, setCantidad] = useState(0)
    const [total, setTotal] = useState(0)


    const addItem = (producto,cantidadSeleccionada) => {

        //siempre tengo que trabajar sobre una copia del carrito verdadero
        const copiaCarrito = [...carrito]
        //copio lo que me vino de 'producto' y le agrego lo que me vino de 'cantidad' (en el mismo objeto)
        const itemAlCarrito = {...producto, cantidadSeleccionada}

        //chequeo si el producto ya esta en el carrito
        if(isInCart(producto.id)){
            //busco la posicion del producto en el carrito
            const index = copiaCarrito.findIndex(item => item.id === producto.id)
            //le sumo la cantidad que me vino
            copiaCarrito[index].cantidadSeleccionada += cantidadSeleccionada
        }else{
            //agrego el 'producto' al nuevo carrito
            copiaCarrito.push(itemAlCarrito)
        }

        //asigno la copia del carrito al estado del verdadero carrito
        setCarrito(copiaCarrito)

        //actualizo la cantidad
        setCantidad(cantidad + cantidadSeleccionada)
        //actualizo el total
        let nuevoTotal = Number(producto.price) * cantidadSeleccionada
        setTotal(total + nuevoTotal)

    }

    const isInCart = (id) => {
        return carrito.some(item => item.id === id)
    }

    const removeItem = (idBorrar) => {
        //GUARDO LA CANTIDADS Y EL TOTAL PARA RESTARLOS
        //copio el carrito y busco la posicion del producto en el carrito
        const copiaCarrito2 = [...carrito]
        const index = copiaCarrito2.findIndex(item => item.id === idBorrar)
        //calculo el total del producto y lo resto del total del carrito
        const totalProducto = copiaCarrito2[index].price * copiaCarrito2[index].cantidadSeleccionada
        setTotal(total - totalProducto)
        //resto la cantidad del producto a la cantidad del carrito
        setCantidad(cantidad - copiaCarrito2[index].cantidadSeleccionada)
        //filtro el carrito en una copia sacando el producto que coincida con el id recibido
        const copiaCarrito = carrito.filter((item) => item.id !== idBorrar);
        //asigno la copia del carrito al estado del verdadero carrito
        setCarrito(copiaCarrito)
    }

    const clear = () => {
        //reinicio todo
        setCarrito([])
        setCantidad(0)
        setTotal(0)
    }

    const valorDelContexto = {
        carrito,
        cantidad,
        total,
        removeItem,
        addItem,
        clear,
        isInCart
    }

    return (
        <Provider value={valorDelContexto}> 
            {children}
        </Provider>
    )

}

export default MiProvider