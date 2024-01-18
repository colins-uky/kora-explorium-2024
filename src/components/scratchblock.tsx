import React from "react";
import { FaCog } from "react-icons/fa";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";

interface Block {
    id: number;
    type: string;
    loop_details: LoopDetails;

}

interface LoopDetails {
    num_loops: number;
    // Could track a counter variable maybe
};

interface Props {
    type: string;
    loop_details?: LoopDetails;
    index: number;
    moveBlock: (fromIndex: number, toIndex: number) => void;
    setBlocks: any;
};




const ScratchBlock: React.FC<Props> = ({ type, index, loop_details, moveBlock, setBlocks}) => {
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


    const handleLoopChange = (index: number, value: string) => {
        setBlocks((prevBlocks: Block[]) =>
            prevBlocks.map((block, i) =>
                i === index
                ? {
                    ...block,
                    loop_details: {
                        ...block.loop_details,
                        num_loops: parseInt(value, 10), // Convert value to a number
                    },
                    }
                : block
            )
        );
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
            
            
            
            <h1 className="text-lg font-bold z-10 absolute top-0.5 left-3 text-black">{type_copy}</h1>
            {(type === "For") ? 
                <input 
                    className="bg-transparent text-lg w-8 text-black font-bold z-10 ml-2 absolute top-0.5 right-4 text-black" 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    min="1" 
                    max="99" 
                    step="1"
                    placeholder="1" 
                    onChange={(event) => handleLoopChange(index, event.target.value)} 
                />
                :
                <></>
            }
            
            </div>
        )
    }
    else {
        return (
        
            <div ref={(node) => ref(drop(node))} className="flex cursor-grab active:cursor-grabbing relative w-32 h-9 rounded-md border-2 border-black" style={{ backgroundColor: color }}>
                
                
                
                <h1 className="text-lg font-bold z-10 absolute top-0.5 left-3 text-black">{type_copy}</h1>
                <h1 className="text-lg font-bold z-10 ml-2 absolute top-0.5 right-2 text-black"></h1>
            </div>
            
        );
    }
    
}



export default ScratchBlock;