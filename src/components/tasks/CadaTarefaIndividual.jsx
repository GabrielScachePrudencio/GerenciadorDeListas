import React from "react";
import { Draggable } from "@hello-pangea/dnd";


function CadaTarefaIndividual(props){
    function remTarefaTema2(){
        props.onDel2(props.id);
        
    }

    return(
        <Draggable draggableId={props.id.toString()} index={props.index}>
            {
                (provided) => 
                
                (
                <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}

                >
                    <h3 onClick={remTarefaTema2} key={props.id}>{props.texto}</h3>
                </div>
                )
            }
        </Draggable>
);
}

export default CadaTarefaIndividual;