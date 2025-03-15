import React from "react";
import { useState, useEffect } from "react";

import Header from "./views/Header";
import Main from "./views/Main";
import Footer from "./views/Footer";

function App(){
    const [colunaTrue, setColunaTrue] = useState(false);
    const [comecar, setComecar] = useState(false);
    const [jaCriou, setJaCriou] = useState(false);
    const [claroEscuro, setClaroEscuro] = useState(false);
    
    useEffect(() => {
        document.body.className = claroEscuro ? "dark" : "light";
    }, [claroEscuro]);

    return (
        <div className="container">
            

            <Header setColunaTrue={setColunaTrue} colunaTrue={colunaTrue} comecar={comecar} jaCriou={jaCriou} setJaCriou={setJaCriou} claroEscuro={claroEscuro} setClaroEscuro={setClaroEscuro} />
            <Main colunaTrue={colunaTrue} setComecar={setComecar} comecar={comecar} jaCriou={jaCriou} setJaCriou={setJaCriou} claroEscuro={claroEscuro} />
            <Footer  claroEscuro={claroEscuro} setClaroEscuro={setClaroEscuro} />
        </div>
    );
}

export default App;
