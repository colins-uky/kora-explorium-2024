import React, { useEffect, useState } from "react";
import ScratchBlock from "./scratchblock";
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import Button from "react-bootstrap/Button";







interface BlockContainerProps {
    blocks: any;
    setBlocks: any;
}

const BlockContainer: React.FC<BlockContainerProps> = ({ blocks, setBlocks }) => {


    const moveBlock = (fromIndex: number, toIndex: number) => {
        const updatedBlocks = [...blocks];
        const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
        updatedBlocks.splice(toIndex, 0, movedBlock);
        setBlocks(updatedBlocks);
    };

    return (
        <div>
          {blocks.map((block: Block, index: number) => (
            <ScratchBlock key={block.id} id={block.id} type={block.type} index={index} moveBlock={moveBlock} />
        ))}
        </div>
    );
}


interface Block {
    id: number;
    type: string;

}

const ScratchGame: React.FC = () => {

    // Function to detect touch support
    function isTouchDevice() {
        return typeof window !== 'undefined' && 'ontouchstart' in window;
    }

    // Function to detect if the device is a mobile platform
    function isMobile() {
        return typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Initialize state vars
    const [blocks, setBlocks] = useState<Block[]>([]);
    
    
    // Button handlers

    const handleAddBlock = (type: string) => {
        const blockId = blocks.length + 1;

        const newBlock: Block = {
            id: blockId,
            type: type,
        };

        // Concatenate blocks with newBlock
        setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    }





    useEffect(() => {
        console.log(blocks);
    }, [blocks])


    return (
        <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
            <div className="w-full h-full flex flex-col items-center">

                <div className="w-11/12 max-w-[1000px] h-2/3 mt-10 border-8 border-white">
                    <BlockContainer blocks={blocks} setBlocks={setBlocks} />
                </div>



                <div className="btn-menu w-11/12 max-w-[1000px] mt-10 border-4 border-white flex flex-col p-2">

                    <div className="btn-row flex flex-row justify-between items-center">
                        <Button style={{ backgroundColor: '#faf3dd' }} className="border-2 border-black text-black" onClick={() => handleAddBlock("Wait")}>
                            Add Wait Block
                        </Button>
                        
                        <Button style={{ backgroundColor: '#deca23' }} className="border-2 border-black text-black" onClick={() => handleAddBlock("Forward")}>
                            Add Forward Block
                        </Button>

                        <Button style={{ backgroundColor: '#6cbf4d' }} className="border-2 border-black text-black" onClick={() => handleAddBlock("Reverse")}>
                            Add Reverse Block
                        </Button>
                    </div>

                    <div className="btn-row flex flex-row justify-between items-center mt-4">
                        <Button style={{ backgroundColor: '#00a4e6' }} className="border-2 border-black text-black" onClick={() => handleAddBlock("Left")}>
                            Add Left Turn Block
                        </Button>

                        <Button style={{ backgroundColor: '#ee5c5c' }} className="border-2 border-black text-black" onClick={() => handleAddBlock("Right")}>
                            Add Right Turn Block
                        </Button>

                        <Button style={{ backgroundColor: '#faf3dd' }} className="border-2 border-black text-black" onClick={() => handleAddBlock("Wait")}>
                            Add Wait Block
                        </Button>
                    </div>

                    
                </div>

            </div>
        </DndProvider>
    )
}



export default ScratchGame;