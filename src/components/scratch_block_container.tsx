import React, { useState } from "react";
import ScratchBlock from "./scratchblock";
import { FaTrash } from "react-icons/fa";
import { useDrop } from "react-dnd";



interface LoopDetails {
    num_loops: number;
    // Could track a counter variable maybe
};

interface Block {
    id: number;
    type: string;
    loop_details: LoopDetails;

}

interface BlockContainerProps {
    blocks: any;
    setBlocks: any;
}


interface TrashCanProps {
    onDropTrashCan: (item: Block) => void;
    handleDelete: () => void;
}

const TrashCan: React.FC<TrashCanProps> = ({ onDropTrashCan, handleDelete }) => {
    const [isDragOver, setDragOver] = useState(false);

    const [, drop] = useDrop({
        accept: "BLOCK",
        drop: (item: any) => {
            setDragOver(false); // Reset dragOver state on drop
            onDropTrashCan(item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            className={`trashcan z-10 sticky absolute right-0 bottom-0 flex flex-row-reverse ${isDragOver ? 'drag-over' : ''}`}
            
        >
            <div 
                className="cursor-pointer"
                onClick={handleDelete}
                onMouseEnter={() => setDragOver(true)}
                onMouseLeave={() => setDragOver(false)}
            >
            {/* Display trashcan icon or any other visual representation */}
            <FaTrash size={50} />
            </div>
        </div>
    );
};


const BlockContainer: React.FC<BlockContainerProps> = ({ blocks, setBlocks }) => {


    const moveBlock = (fromIndex: number, toIndex: number) => {
        const updatedBlocks = [...blocks];
        const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
        updatedBlocks.splice(toIndex, 0, movedBlock);
        setBlocks(updatedBlocks);
    };

    const handleDeleteBlock = (deletedItem: any) => {
        setBlocks((prevBlocks: Block[]) => prevBlocks.filter(block => block.id !== deletedItem.id));
    };

    const handleResetBlocks = () => {
        if (blocks.length == 0) {
            return;
        }
        const confirm = window.confirm("Are you sure you want to clear your program?");

        if (confirm) {
            setBlocks([]);
        }   
        
    }

    return (
        <div className="relative flex flex-col h-[400px] md:h-[600px] w-full justify-between">
            <div >
            {blocks.map((block: Block, index: number) => (
                <ScratchBlock 
                    key={index} 
                    type={block.type} 
                    index={index} 
                    id={block.id}
                    moveBlock={moveBlock} 
                    loop_details={block.loop_details}
                    setBlocks={setBlocks}
                />
            ))}
            </div>
            <TrashCan handleDelete={handleResetBlocks} onDropTrashCan={(item: Block) => handleDeleteBlock(item)}/>
        </div>
    );
}



export default BlockContainer;