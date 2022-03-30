import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({ producto }) => {
    return (
        <Link to={`/producto/${producto.id}`} className="card p-4">
            <img src={producto.image} className="card-img-top w-100"></img>
            <div className="card-body p-0">
                <span>{producto.category}</span>
                <h5 className="card-title fw-bold">{producto.title}</h5>
                <p className='price mb-3'>{"$"}{producto.price}</p>
                <button className='btn btn-outline-primary mt-2 w-100 btnAgregar'>VER PRODUCTO</button>
            </div>
        </Link>
    )
}

export default Item