// import React from 'react'
import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import { BrowserRouter } from "react-router-dom";
import MiProvider from "./context/cartContext.js";

const App = () => {
    return (
        <BrowserRouter>
            <MiProvider>    
                <Header/>
                <Main/>
            </MiProvider>
            <Footer/>
        </BrowserRouter>
    )
}

export default App