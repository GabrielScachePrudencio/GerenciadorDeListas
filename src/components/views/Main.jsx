import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from 'uuid'; // para gerar IDs únicos

import CreateTarefa from "../tasks/CreateTarefa";
import TarefaCadaTema from "../tasks/TarefaCadaTema";

const Main = ({ colunaTrue, comecar, setComecar, jaCriou, setJaCriou, claroEscuro, setClaroEscuro }) => {
    const [todasTarefas, setTodasTarefas] = useState([]);
    
    function addTarefa(tarefa){
        const novaTarefa = { ...tarefa, id: uuidv4() }; // Adicionando id único
        setTodasTarefas(prevItems => {
            return [...prevItems, novaTarefa];
        });
    }

    function remTarefa(id){
        setTodasTarefas(prevItems => {
            return prevItems.filter((tarefaItem) => tarefaItem.id !== id); // Removendo pela id
        });
    }
    
    function toggleSeJaCriou(){
        setJaCriou(!jaCriou);
    }

    function onDragEnd(result) {
        if (!result.destination) return;

        const items = [...todasTarefas];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodasTarefas(items);
    }

    return (
        <main className="Main">
            {
                comecar === false ? 
                (
                    <div style={{"textAlign":"center"}}>
                        <button  onClick={ () => setComecar(true)} style={{"border": claroEscuro === false ? "1px solid black" : "1px solid white"}}>
                           <h2>Começar</h2> 
                        </button>
                    </div>
                )
                : 
                (    
                    jaCriou && (
                        <CreateTarefa onAdd={addTarefa} onMais={toggleSeJaCriou} claroEscuro={claroEscuro}/>
                    )
                )
            }

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="tarefas" direction={colunaTrue ? "vertical" : "horizontal"}>
                    {(provided) => (
                        <div 
                            className="mostreAsTarefas" 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={!colunaTrue ? { flexWrap: "wrap", display: "flex" } : { flexDirection: "column", display: "flex" }}
                        >
                            {
                                todasTarefas.map((tarefaItem, index) => (
                                    <Draggable 
                                        key={tarefaItem.id} 
                                        draggableId={tarefaItem.id} 
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <TarefaCadaTema
                                                    id={tarefaItem.id}
                                                    key={tarefaItem.id} 
                                                    index={index}
                                                    title={tarefaItem.title}
                                                    content={tarefaItem.content}
                                                    onDel={remTarefa}
                                                    tipoColuna={colunaTrue}
                                                    claroEscuro={claroEscuro}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </main>
    );
}

export default Main;
