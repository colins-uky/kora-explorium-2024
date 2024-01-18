import React from "react";
import { FaCog } from "react-icons/fa";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";



interface LoopDetails {
    num_loops: number;
    // Could track a counter variable maybe
};

interface Props {
    type: string;
    loop_details?: LoopDetails;
    index: number;
    moveBlock: (fromIndex: number, toIndex: number) => void;
};




const ScratchBlock: React.FC<Props> = ({ type, index, loop_details, moveBlock}) => {
    let color = "red";
    let isLoop = false;
    const type_copy = type;

    switch (type.toLowerCase()) {
        case "wait":
            color = "#faf3dd";
            break;
    
        case "forward":
            color = "#deca23";
            break;
    
        case "reverse":
            color = "#6cbf4d";
            break;
        
        case "left":
            color = "#00a4e6";
            break;
    
        case "right":
            color = "#ee5c5c";
            break;
        
        case "for":
            color = "#efaac4";
            isLoop = true;
            break;

        case "end for":
            color = "#efaac4";
            isLoop = true;
            break;
    
        default:
            // Code for other cases
            console.log("Invalid type");
    }


    const [, ref] = useDrag({
        type: 'BLOCK',
        item: {index},
    });

    const [, drop] = useDrop({
        accept: 'BLOCK',
        hover: (draggedItem: { index: number }, monitor: DropTargetMonitor) => {
            if (draggedItem.index !== index) {
                moveBlock(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });
    



    if (isLoop) {
        return (
            <div ref={(node) => ref(drop(node))} className="flex cursor-grab active:cursor-grabbing relative w-40 h-9 rounded-md border-2 border-black" style={{ backgroundColor: color }}>
            
            
            
            <h1 className="text-lg font-bold z-10 absolute top-1 left-3 text-black">{type_copy}</h1>
            <h1 className="text-lg font-bold z-10 ml-2 absolute top-1 right-8 text-black">{type_copy === "For" ? loop_details?.num_loops : null}</h1>
            </div>
        )
    }
    else {
        return (
        
            <div ref={(node) => ref(drop(node))} className="flex cursor-grab active:cursor-grabbing relative w-32 h-9 rounded-md border-2 border-black" style={{ backgroundColor: color }}>
                
                
                
                <h1 className="text-lg font-bold z-10 absolute top-1 left-3 text-black">{type_copy}</h1>
                <h1 className="text-lg font-bold z-10 ml-2 absolute top-1 right-2 text-black"></h1>
            </div>
            
        );
    }
    
}



export default ScratchBlock;