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
            className={`trashcan absolute right-0 cursor-pointer ${isDragOver ? 'drag-over' : ''}`}
            onMouseEnter={() => setDragOver(true)}
            onMouseLeave={() => setDragOver(false)}
            onClick={handleDelete}
        >
            {/* Display trashcan icon or any other visual representation */}
            <FaTrash size={50} />
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
        <div className="flex flex-col h-full">
            <div> 
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
            <TrashCan handleDelete={handleResetBlocks} onDropTrashCan={(item: Block) => handleDeleteBlock(item)}/>
            </div>
        </div>
    );
}



export default BlockContainer;