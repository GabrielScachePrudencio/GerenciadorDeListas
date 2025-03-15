import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faColumns, faLightbulb } from "@fortawesome/free-solid-svg-icons";


const Header = ({ setColunaTrue, colunaTrue, comecar, setJaCriou, claroEscuro, setClaroEscuro }) => {
    return (
        <header className="Header">
            <a href="#"><h1>GLT</h1></a>
            <div className="buttonsExp">
                {
                    comecar && (<button onClick={() => setJaCriou(prev => !prev)}> <FontAwesomeIcon icon={faPlus}  style={{ fontSize: '2.5rem', color: claroEscuro === false ? "white" : "black" }}  /> </button>)  
                }
                
                <button onClick={() => setColunaTrue(!colunaTrue)}> <FontAwesomeIcon icon={faColumns} style={{ fontSize: '2.5rem', color: claroEscuro === false ? "white" : "black" }}  /> </button>
                <button onClick={()=> setClaroEscuro(!claroEscuro) }> <FontAwesomeIcon icon={faLightbulb} style={{ fontSize: '2.5rem', color: claroEscuro === false ? "white":"black" }}  /> </button>
            </div>
       </header>
    );
    
};


export default Header;