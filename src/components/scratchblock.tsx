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
            // Code for type 5
            console.log("Type 5 selected");
            break;
    
        case "while":
            // Code for type 6
            console.log("Type 6 selected");
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
        
        <div ref={(node) => ref(drop(node))} className="flex cursor-grab active:cursor-grabbing relative p-8 w-32 h-16 rounded-tr-none rounded-bl-none rounded-lg border-2 border-black z-0" style={{ backgroundColor: color }}>
            <div className="w-16 h-4 -top-4 -right-0.5 rounded-t-lg absolute z-2 border-2 border-black border-b-0" style={{ backgroundColor: color }} />
            <div className="w-16 h-4 -bottom-4 -left-0.5 rounded-b-lg absolute z-2 border-2 border-black border-t-0" style={{ backgroundColor: color }} />
            <div className="z-10 w-6 h-6 absolute cursor-pointer flex justify-center items-center top-1 right-1 drop-shadow-md" onClick={handleGearButtonPress}>
                <FaCog color={"black"} />
            </div>
            
            <h1 className="text-lg font-bold z-10 absolute bottom-2 left-3 text-black">{type_copy}</h1>
            <h1 className="text-lg font-bold z-10 ml-2 absolute bottom-2 right-4 text-black">1s</h1>
        </div>
        
    );
}



export default ScratchBlock;