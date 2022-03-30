import Item from "./Item"

const ItemList = ({ productos }) => {
    return (
        <div className='listado'>
            {productos.map((producto) => {
                return <Item key={producto.id} producto={producto} />
            })}
        </div>
    )
}

export default ItemList