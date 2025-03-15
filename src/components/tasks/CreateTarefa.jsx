import React, {useState} from "react";

const CreateTarefa = ({onAdd, onMais, claroEscuro}) => {
    const [tarefa, setTarefa] = useState({
        title: "",
        content: ""
    });

    function colocarTarefa(event){
        const {name, value} = event.target;

        setTarefa((prevTarefa) => {
            return{
                ...prevTarefa,
                [name]: value

            };
        })
    }

    function submitTarefa(event){
        if(tarefa.title === ""){
            return;
        }
        else {
            onAdd(tarefa);
            onMais(true);
        }
        event.preventDefault();
        setTarefa({
            title:"",
            content:""
        })
    }


    return (
        <div className="ConteinerCriacaoTemas" style={{"border": claroEscuro === false ? "1px solid black" : "1px solid white"}} >
            <div className="verComoFicaCriacaoTema">
                <h3>Titulo: {tarefa.title}</h3>
                <p>Descrição: {tarefa.content}</p>
            </div>  
            <div>    
                <input
                    type="text"
                    name="title"
                    value={tarefa.title}
                    placeholder="Nome da tarefa"
                    onChange={colocarTarefa}
                />
                <br />
                <textarea 
                    name="content"
                    rows="1"
                    width="100"
                    placeholder="descrição"
                    value={tarefa.content}
                    onChange={colocarTarefa}
                />        
                <br />
                <button onClick={submitTarefa}>Criar Tarefa</button>
            </div>
        </div>
    );
}

export default CreateTarefa;