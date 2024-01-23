import React, { useRef } from "react";
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
    id: number;
    moveBlock: (fromIndex: number, toIndex: number) => void;
    setBlocks: any;
};




const ScratchBlock: React.FC<Props> = ({ type, index, id, moveBlock, setBlocks}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    let color = "red";
    let isLoop = false;
    const type_copy = type;

    let symbol = "";

    switch (type.toLowerCase()) {
        case "wait":
            color = "#00a4e6"; //"" #faf3dd
            symbol = "1s"
            break;
    
        case "forward":
            color = "#deca23";
            symbol = "&uarr;";
            break;
    
        case "reverse":
            color = "#deca23";
            symbol = "&darr;";
            break;
        
        case "left":
            color = "#deca23";
            symbol = "&larr;";
            break;
    
        case "right":
            color = "#deca23";
            symbol = "&rarr;";
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



    const [{ isDragging }, drag] = useDrag({
        type: 'BLOCK',
        item: {index, id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
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
    
    drag(ref);
    drop(ref);

    

    if (isLoop) {
        return (
            <div ref={ref} className="w-full">
                <div  className={`flex cursor-grab active:cursor-grabbing relative w-48 h-9 rounded-md border-2 border-black`} style={{ backgroundColor: color }}>
                
                    <h1 className="text-lg font-bold z-10 absolute top-0.5 left-3 text-black">{type_copy}</h1>
                    {(type === "For") ? 
                        <input 
                            className="bg-[#d182a0] rounded-md flex text-lg w-8 pl-2 text-black font-bold z-10 absolute top-0.5 right-4 text-black" 
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
            </div>
        )
    }
    else {
        return (
            <div ref={ref} className="w-full">
                <div className="flex cursor-grab active:cursor-grabbing relative w-40 h-9 rounded-md border-2 border-black" style={{ backgroundColor: color }}>
                    
                    
                    
                    <h1 className="text-lg font-bold z-10 absolute top-0.5 left-3 text-black">{type_copy}</h1>
                    <h1 
                        className="text-lg font-bold z-10 ml-2 absolute top-0.5 right-2 text-black"
                        dangerouslySetInnerHTML={{ __html: symbol }}
                    ></h1>
                </div>
            </div>
        );
    }
    
}



export default ScratchBlock;