import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import CadaTarefaIndividual from "./CadaTarefaIndividual";
import InputTarefaPorTema from "./InputTarefaPorTema";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";



const TarefaCadaTema = ({ title, content, onDel, tipoColuna, id, claroEscuro }) => {
    const [arrayTarefasDentroTema, setArrayTarefasDentroTema] = useState([]);

    //para verificar se esta estendido ou nao
    const [expandido, setExpandido] = useState(false);

    //para criar um botao de + apos criar uma vez
    const [jaCriouUmaVez, setJaCriouUmaVez] = useState(false);

    // para acessar as opcoes
    const [acessarOpcoes, setAcessarOpcoes] = useState(false);

    // para acessar o menu com inputs de titulo e content
    const [acessarNovoInput, setAcessarNovoInput] = useState(false);

    //uma forma de pegar os valores de titulo e contexto antes
    const [tarefa, setTarefa] = useState({
        title: title,
        content: content
    });

    //seta para cima ou para baixo
    const [mudaSeta, setMudaSeta] = useState(false);

    const listParaCorDeFundo = ["#D84040","#A0C878","#3674B5","#8D77AB","#FFCF50"];
    const [corAleatoria, setCorAleatoria] = useState("");

    // UseEffect para gerar a cor aleatória uma vez na inicialização do componente
    useEffect(() => {
        const number = Math.floor(Math.random() * listParaCorDeFundo.length);
        setCorAleatoria(listParaCorDeFundo[number]);
    }, []); 


    function submitTarefaDentroDoTema(tarefa) {
        setArrayTarefasDentroTema(prevItems => {
            return [...prevItems, tarefa];
        })
    }

    function remTarefaPorTema(id){
        setArrayTarefasDentroTema(prevItems => {
            return (
                prevItems.filter((tarefaItem, index) => {
                    return index != id;
                })
            );
        })
    }
    
    function remTarefa(){
        onDel(id);
    }

    function toggleExpandir(){
        setExpandido(!expandido);
    }

    function toggleSeJaCriou2(){
        setJaCriouUmaVez(!jaCriouUmaVez)
    }

    function toggleAcessouOp(){
        setAcessarOpcoes(!acessarOpcoes);
    }

    function toggleAcessouOpDeInputNovo(){
        setAcessarNovoInput(!acessarNovoInput);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setTarefa(prev => ({ ...prev, [name]: value }));
    }
    
    function finalizarEdicao() {
        setAcessarNovoInput(false); // Finaliza a edição
    }

    function toggleMudarSeta(){
        setMudaSeta(!mudaSeta);
    }


    function reorder(list, startIndex, endIndex){
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    function onDragEnd(result) {
        //se for fora da area q pode ser arrastado é cancelado
        if (!result.destination) return;
        
        //apos pegar e soltar ele reorganiza no arra as posições atuais dele
        const items = reorder(arrayTarefasDentroTema, result.source.index, result.destination.index);  
        setArrayTarefasDentroTema(items);
    }
    

    return (
        

        <div style={{"border":"0px solid white"}} className="TemaDeTarefaIndividual" >
            <div className="TarefaCadaTema" style={{ width: tipoColuna ? "100%" : "500px","background-color": corAleatoria }}>
                    <div style={{"background-color": corAleatoria, padding: "10px"}}>
                        <h2 style={{"background-color": corAleatoria}}>{tarefa.title}</h2>
                        <p style={{"background-color": corAleatoria}}>{tarefa.content}</p>
                    </div>

                    {
                        acessarOpcoes === false ? (<FontAwesomeIcon style={{"background-color": corAleatoria, padding: "10px"}} onClick={toggleAcessouOp} icon={faEllipsisVertical} size="2x" />) : 
                        (
                            <div> 
                                {
                                    acessarNovoInput === false ? (
                                        <div className="menuDeOp" style={{"background-color": corAleatoria}}>
                                            <button onClick={toggleAcessouOpDeInputNovo}> fazer Alterar titulo  </button>
                                            <button onClick={toggleAcessouOp}> Voltar </button>
                                            <button onClick={remTarefa}>Remover este tema </button>
                                        </div>
                                    ) : 
                                    (
                                        <div className="menuDeOp2" style={{"background-color": corAleatoria}}> 
                                            <input
                                                    type="text"
                                                    name="title"
                                                    value={tarefa.title}
                                                    placeholder="Nome da tarefa"
                                                    onChange={handleChange}
                                                    />
                                                <br />
                                                <textarea
                                                    name="content"
                                                    rows="1"
                                                    placeholder="Descrição"
                                                    value={tarefa.content}
                                                    onChange={handleChange}
                                                    />
                                            <button onClick={finalizarEdicao}>Finalizar edição</button>
                                        </div>         
                                    )
                                }
                                
                            </div>
                        )
                    }
            </div>

            <div style={{"border": claroEscuro === false ? "1px solid black" : "1px solid white"}}>
                    { expandido && (
                        <div>
                            {
                                jaCriouUmaVez === false ? (<InputTarefaPorTema onAdd={submitTarefaDentroDoTema} onMais={toggleSeJaCriou2}/>) : (<div style={{"text-align":"center"}}> <button onClick={toggleSeJaCriou2}>+</button> </div>)
                            }
                            
                            {
                                //DragdroppContext defini onde tudo vai ser arrastado e solto
                                //Droppable e a area onde os item vao ser soltos
                                //Draggable defini o item q pode ser arrastaddo
                            }
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="tasks" type="list" direction="vertical">
                                    {
                                        (provided) => (
                                            <section 
                                                style={{"paddingLeft": "10px"}}
                                                ref={provided.innerRef} 
                                                {...provided.droppableProps}
                                            >
                                                {arrayTarefasDentroTema.map((tarefaItem, index) => (
                                                    <CadaTarefaIndividual id={index} index={index} key={index} texto={tarefaItem} onDel2={remTarefaPorTema}/>
                                                ))}
                                            
                                            {provided.placeholder}
                                            </section>
                                        )
                                    }
                                </Droppable>
                            </DragDropContext>


                        </div>
                    )}

                
                    <div style={{"textAlign":"center"}} className="classeParaExpandir" onClick={ ()=>{
                        toggleExpandir();
                        toggleMudarSeta();
                    }}>
                    {
                        mudaSeta === false ? <FontAwesomeIcon icon={faArrowDown}  style={{ fontSize: '2.0rem' }}  /> : <FontAwesomeIcon icon={faArrowUp} style={{ fontSize: '2.0rem' }}  />

                    }
                </div>
         
            </div>
        </div>
    );
}

export default TarefaCadaTema;
