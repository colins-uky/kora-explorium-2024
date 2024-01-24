import React, { useCallback, useEffect, useState } from "react";
import { DndProvider} from "react-dnd";
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
// Forward
// Reverse
// Left
// Right
// Wait
// For
// End for
const compileScratchBlocks = (block_arr: Block[]) => {
    const opcodes: string[] = []
    let for_count = 0;
    let end_for_count = 0;

    let start = 0;
    let end = 0;

    let nloops = 1;

    for (let i = 0; i < block_arr.length; i++) {
        const block = block_arr[i];
        
        if (block.type === "For") {
            if (for_count == 0) {
                // first for loop
                start = i;
                nloops = block.loop_details?.num_loops || 1;
            }
            for_count++;
        }
        else if (block.type === "End for") {
            end_for_count++;
            if (for_count === end_for_count) {
                // closing end for block
                end = i;

                for_count = 0;
                end_for_count = 0;    
                // Recurse
                const for_loop = block_arr.slice(start + 1, end);
                opcodes.push(...compileScratchBlocks(concatenateArray(for_loop, nloops)));
            }
        }
        else if (for_count == 0) {
            opcodes.push(block.type);
        }
        
    }
    
    //console.log(opcodes);
    return opcodes;
    
}

// Duplicates array and concatenates with itself n times
// Helper function for compiler function
const concatenateArray = (array: Block[], n: number) => {

    // Use Array.from to create a new array with repeated elements
    const concatenatedArray = Array.from({ length: n }, () => [...array]).flat();

    return concatenatedArray;
}

// Compiler helper function that takes in "bert" or "demobot", (defualts to bert),
// and a raw op-code, (See above compileScratchBlocks function for examples (except for))
// and converts it into a motor message string like: "M0000000000000000"
const convertToMotorMessage = (op: string, speed:number, isDemoBot: boolean = false) => {
    let motor1 = "";
    let motor2 = "";
    let motor3 = "";
    let motor4 = "";

    let motor_message = "";
    
    if (!isDemoBot) {
        // NOT DemoBot
        /* Bert: (And every other bot in the future hopefully.)
               (1)--(2)
                |    |
                |    |
               (3)--(4)
        */
        switch(op) {
            case "Forward":
                motor1 = `1${speed}`;
                motor2 = `1${speed}`;
                motor3 = `1${speed}`;
                motor4 = `1${speed}`;
                break;
            case "Reverse":
                motor1 = `0${speed}`;
                motor2 = `0${speed}`;
                motor3 = `0${speed}`;
                motor4 = `0${speed}`;
                break;
            case "Left":
                motor1 = `0${speed}`;
                motor2 = `1${speed}`;
                motor3 = `0${speed}`;
                motor4 = `1${speed}`;
                break;
            case "Right":
                motor1 = `1${speed}`;
                motor2 = `0${speed}`;
                motor3 = `1${speed}`;
                motor4 = `0${speed}`;
                break;
            case "Wait":
                motor1 = "0000";
                motor2 = "0000";
                motor3 = "0000";
                motor4 = "0000";
                break;
            default:
                motor1 = "0000";
                motor2 = "0000";
                motor3 = "0000";
                motor4 = "0000";
                break;
        }

        
    }
    else {
        // DemoBot
        /* DemoBot:
               (2)--(1)
                |    |
                |    |
               (3)--(4) 
            Motors 3 and 4 have direction bit flipped also.
        */
        switch(op) {
            case "Forward":
                motor1 = `1${speed}`;
                motor2 = `1${speed}`;
                motor3 = `0${speed}`;
                motor4 = `0${speed}`;
                break;
            case "Reverse":
                motor1 = `0${speed}`;
                motor2 = `0${speed}`;
                motor3 = `1${speed}`;
                motor4 = `1${speed}`;
                break;
            case "Left":
                motor1 = `1${speed}`;
                motor2 = `0${speed}`;
                motor3 = `1${speed}`;
                motor4 = `0${speed}`;
                break;
            case "Right":
                motor1 = `0${speed}`;
                motor2 = `1${speed}`;
                motor3 = `0${speed}`;
                motor4 = `1${speed}`;
                break;
            case "Wait":
                motor1 = "0000";
                motor2 = "0000";
                motor3 = "0000";
                motor4 = "0000";
                break;
            default:
                motor1 = "0000";
                motor2 = "0000";
                motor3 = "0000";
                motor4 = "0000";
                break;
        }
    }
    // End if (!isDemoBot)


    // Compile motors into one message and return
    return `M${motor1}${motor2}${motor3}${motor4}\n`;

}




interface ScratchGameProps {
    isDemoBot?: boolean;
    websocket_address: string;
    motor_speed: number;
    operation_duration_milliseconds: number;
}


const HALT = "M0000000000000000\n";



const ScratchGame: React.FC<ScratchGameProps> = ({ isDemoBot, websocket_address, motor_speed, operation_duration_milliseconds }) => {

    // Function to detect touch support
    function isTouchDevice() {
        return typeof window !== 'undefined' && 'ontouchstart' in window;
    }

    isDemoBot = isDemoBot || false;
    

    // Initialize state vars
    const [blocks, setBlocks] = useState<Block[]>([]);
    
    
    //const [websocket, setWebsocket] = useState<WebSocket | null>(null)

    
    const [isExecuting, setIsExecuting] = useState<boolean>(false);



    // Takes in an array of opcodes and sends the corresponding motor messages to the bot.
    const sendCommandsToWebsocket = useCallback(
        async (opcodes: string[]) => {
        
            //const websocket = new WebSocket(websocket_address);
            
            const connectPromise = new Promise<WebSocket>((resolve, reject) => {
                try {
                    const websocket = new WebSocket(websocket_address);
                
                    // Resolve the promise if connected successfully
                    websocket.onopen = () => {
                        resolve(websocket);
                    };
                
                    // Reject the promise if there is an error during connection
                    websocket.onerror = (error) => {
                        reject(error);
                    };
                } catch (error) {
                    // Reject the promise if there is an exception during connection
                    reject(error);
                }
            });

            

            let websocket: WebSocket | undefined;

            connectPromise.then(
                (result) => { 
                   websocket = result;
                },
                (error) => { 
                   console.error(error);
                   setIsExecuting(false);
                   return;
                }
            );
            
           

            for (let i = 0; i < opcodes.length; i++) {
                
                
                
                // Duration of the HALT messages.
                await new Promise(resolve => setTimeout(resolve, 2000));
                

                if (websocket?.readyState != 1) {
                    console.log(websocket);
                    setIsExecuting(false);
                    return;
                }

                // Convert raw instruction into a meaningful message for the bot's motors
                const motor_message = convertToMotorMessage(opcodes[i], motor_speed, isDemoBot);
                websocket.send(motor_message);


                // Let motor_message run for timeoutMilliseconds
                // Should be enough for a 90 degree turn 
                // using one "left" or "right" opcode
                // Duration of the meaningful motor messages.
                await new Promise(resolve => setTimeout(resolve, operation_duration_milliseconds));

                
                // Stop motors before awaiting next instruction
                websocket.send(HALT);
            
            }


            // set isExecuting to false and close websocket
            setIsExecuting(false);
            websocket?.close();
        }, 
    [isDemoBot, websocket_address]);






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
        if (blocks.length > 0) {
            setIsExecuting(true);

            const opcodes = compileScratchBlocks(blocks);
            sendCommandsToWebsocket(opcodes);
        }
    }


    const handleStopProgram = () => {

    }

  
    

    return (
        <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
            <div className="w-full flex flex-col items-center">

                <div className="overflow-scroll relative w-11/12 max-w-[1000px] h-1/2 mt-10 p-3 border-4 border-ukblue rounded-xl bg-white shadow-lg">
                    <BlockContainer blocks={blocks} setBlocks={setBlocks} />
                </div>



                <div className="btn-menu w-11/12 max-w-[1000px] mt-8 mb-4 border-0 border-white flex flex-col p-2">

                    <div className="btn-row flex flex-row justify-between items-center">
                        <Button style={{ backgroundColor: '#efaac4' }} className="border-2 border-black text-black w-24 m-0" onClick={() => handleAddBlock("For")}>
                            For Loop
                        </Button>
                        
                        <Button style={{ backgroundColor: '#deca23' }} className="border-2 border-black text-black w-24" onClick={() => handleAddBlock("Forward")}>
                            Forward
                        </Button>

                        <div className="w-24"></div>
                    </div>

                    <div className="btn-row flex flex-row justify-between items-center mt-4">
                        <Button style={{ backgroundColor: '#deca23' }} className="border-2 border-black text-black w-24" onClick={() => handleAddBlock("Left")}>
                            Left
                        </Button>

                        <Button style={{ backgroundColor: '#00a4e6' }} className="border-2 border-black text-black w-24" onClick={() => handleAddBlock("Wait")}>
                            Wait
                        </Button>

                        <Button style={{ backgroundColor: '#deca23' }} className="border-2 border-black text-black w-24" onClick={() => handleAddBlock("Right")}>
                            Right
                        </Button>

                    </div>

                    <div className="btn-row flex flex-row-reverse justify-between items-center mt-4">
                        <Button className={`border-2 border-black text-black w-24 shadow-lg shadow-green ${isExecuting ? "connected" : "disconnected"}`} onClick={isExecuting ? handleStopProgram : handleExecuteProgram}>
                            {
                                isExecuting ? "STOP" : "Run"
                            }
                        </Button>

                        <Button style={{ backgroundColor: '#deca23' }} className="border-2 border-black text-black w-24" onClick={() => handleAddBlock("Reverse")}>
                            Reverse
                        </Button>

                        <div className="w-24"></div>

                    </div>
                    
                </div>

            </div>
        </DndProvider>
    )
}



export default ScratchGame;