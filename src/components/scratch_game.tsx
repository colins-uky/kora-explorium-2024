import React, { useEffect, useState } from "react";
import ScratchBlock from "./scratchblock";
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import Button from "react-bootstrap/Button";

import BlockContainer from "./scratch_block_container";

interface LoopDetails {
    num_loops: number | null;
    // Could track a counter variable maybe
};

interface Block {
    id: number; // integer describing its position within the blocks[] array.
    type: string;
    loop_details?: LoopDetails | null;

}


// Compiler function
// Takes in array of blocks.
// Returns array of strings representing raw opcodes
// (i.e. the same opcodes without loops).
const compileScratchBlocks = (block_arr: Block[]) => {
    const stack = [];

    // Extract the instructions from the Block objects
    const opcodes = block_arr.map((block) => block.type);

    console.log(opcodes);
    for (let i = 0; i < opcodes.length; i++) {
        switch (opcodes[i]) {
            case "bruh":

                break;

        }
    }





    return opcodes;
}



const ScratchGame: React.FC = () => {

    // Function to detect touch support
    function isTouchDevice() {
        return typeof window !== 'undefined' && 'ontouchstart' in window;
    }

    

    // Initialize state vars
    const [blocks, setBlocks] = useState<Block[]>([]);
    
    
    // Button handlers

    const handleAddBlock = (type: string) => {
        const blockId = blocks.length + 1;

        let loop_det: LoopDetails = {
            num_loops: 1,
        }



        // Handle adding for and while loops
        // Add two blocks, a start and an end for the loop
        if (type === "For") {
            const newBlock1: Block = {
                id: blockId,
                type: type,
                loop_details: loop_det,
            };
            // Add additional closing block
            const newBlock2: Block = {
                id: blockId + 1,
                type: "End for",
                loop_details: loop_det,
            };

            setBlocks((prevBlocks) => [...prevBlocks, newBlock1, newBlock2]);
        }
        else {
            const newBlock: Block = {
                id: blockId,
                type: type
            };

            // Concatenate blocks with newBlock
            setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
        }


        
    }


    const handleExecuteProgram = () => {
        const motor_messages = compileScratchBlocks(blocks);
        console.log(motor_messages);
    }


    useEffect(() => {
        console.log(blocks);
    }, [blocks])


    return (
        <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
            <div className="w-full h-full flex flex-col items-center">

                <div className="relative w-11/12 max-w-[1000px] h-2/3 mt-10 p-3 border-4 border-ukblue rounded-xl bg-white shadow-lg">
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

                        <Button style={{ backgroundColor: '#efaac4' }} className="border-2 border-black text-black" onClick={() => handleAddBlock("For")}>
                            Add For Loop
                        </Button>
                        

                    </div>

                    <div className="btn-row flex flex-row-reverse justify-between items-center mt-4">
                        <Button variant="secondary" className="border-2 border-black text-black" onClick={handleExecuteProgram}>
                            Run
                        </Button>

                        

                    </div>
                    
                </div>

            </div>
        </DndProvider>
    )
}



export default ScratchGame;