import React from 'react'
import NavBar from "./components/NavBar.js"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { contexto } from './context/cartContext.js'

const Header = () => {

  const {cantidad, total} = useContext(contexto)

  return (
    <header className='bg-dark py-4 px-4 d-flex align-items-center'>
      <Link to="/"><h1 className="mb-0 text-white">TIENDA VIRTUAL</h1></Link>
      <NavBar cantidad={cantidad} total={total}/>
    </header>
  )
}
export default Header