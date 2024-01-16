import React from "react";
import { FaCog } from "react-icons/fa";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";


interface Props {
    id: number;
    type: string;
    index: number;
    moveBlock: (fromIndex: number, toIndex: number) => void;
}




const ScratchBlock: React.FC<Props> = ({ id, type, index, moveBlock}) => {
    let color = "red";

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
            color = "#00cecb";
            break;
    
        case "while":
            color = "#efaac4";
            break;
    
        default:
            // Code for other cases
            console.log("Invalid type");
    }

    const handleGearButtonPress = () => {
        console.log("bruh");
    }

    const [, ref] = useDrag({
        type: 'BLOCK',
        item: {id, index},
    });

    const [, drop] = useDrop({
        accept: 'BLOCK',
        hover: (draggedItem: { id: number; index: number }, monitor: DropTargetMonitor) => {
            if (draggedItem.index !== index) {
              moveBlock(draggedItem.index, index);
              draggedItem.index = index;
            }
        },
    });
    

    return (
        
        <div ref={(node) => ref(drop(node))} className="flex cursor-grab active:cursor-grabbing relative w-32 h-9 rounded-lg border-2 border-black" style={{ backgroundColor: color }}>
            
            
            
            <h1 className="text-lg font-bold z-10 absolute top-1 left-3 text-black">{type_copy}</h1>
            <h1 className="text-lg font-bold z-10 ml-2 absolute top-1 right-2 text-black">1s</h1>
        </div>
        
    );
}



export default ScratchBlock;