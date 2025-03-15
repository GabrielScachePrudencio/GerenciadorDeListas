import React, {useState} from "react";

function CadaTarefaIndividual(props){
    const [novaTarefa, setNovaTarefa] = useState(""); 

    function handleInputChange(event) {
        setNovaTarefa(event.target.value);
    }

    function submitTarefaDentroDoTema(event){
        if(novaTarefa === ""){
            return;
        }
        else {
            props.onAdd(novaTarefa);
            props.onMais(true);
        }
        event.preventDefault();
        setNovaTarefa("");
    }


    return(
        <div className="classeParaCriarTarefasDeCadaTema">
                <input
                    placeholder="Tarefa para colocar dentro desse tema de tarefa"
                    value={novaTarefa}
                    onChange={handleInputChange}
                />
                <button onClick={submitTarefaDentroDoTema}> 
                    add
                </button>
        </div>

    );
}

export default CadaTarefaIndividual;