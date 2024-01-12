import React, { useEffect, useCallback, useState } from 'react';
import JoyTable from './joy_table';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';

import WebSocketClient from './websocket';
import { webcrypto } from 'crypto';

const HALT = "M0000000000000000";

const joyStickDriftTolerance = 0.20;




function getFirstNonNullItem(array: any) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== null && array[i] !== undefined) {
            return array[i];
        }
    }
    return null; // If no non-null items are found
}


function calculateMotorSpeeds(forwardBackward: number, leftRight: number, buttons: number[]) {
    const differential = leftRight * forwardBackward;

    let leftSpeedStr = "";
    let rightSpeedStr = "";

    let motorSpeedLeft = -1 * (forwardBackward + differential);
    let motorSpeedRight = -1 * (forwardBackward - differential);

    
    // Add directional bit to speed strings. 
    if (motorSpeedLeft < 0) {
        leftSpeedStr += "0";
    }
    else {
        leftSpeedStr += "1";
    }

    if (motorSpeedRight < 0) {
        rightSpeedStr += "0";
    }
    else {
        rightSpeedStr += "1";
    }

    motorSpeedLeft = Math.abs(motorSpeedLeft);
    motorSpeedRight = Math.abs(motorSpeedRight);

    if (motorSpeedLeft < joyStickDriftTolerance){
        motorSpeedLeft = 0;
    }
    
    if (motorSpeedRight < joyStickDriftTolerance) {
        motorSpeedRight = 0;
    }


    if (motorSpeedLeft > 1) {
        motorSpeedLeft = 1;
    }
    if (motorSpeedRight > 1) {
        motorSpeedRight = 1;
    }

    const normalizedLeftMotorSpeed = Math.round(motorSpeedLeft * 255);
    const normalizedRightMotorSpeed = Math.round(motorSpeedRight * 255);


    // Add normalized speeds to respective speed strings.

    leftSpeedStr += normalizedLeftMotorSpeed.toString().padStart(3, '0');
    rightSpeedStr += normalizedRightMotorSpeed.toString().padStart(3, '0');

    let message = "M" + leftSpeedStr + rightSpeedStr + leftSpeedStr + rightSpeedStr;

    if (buttons[0] == 1) {
        // Left Turn
        message = "M1150015011500150";
    }
    else if (buttons[1] == 1) {
        // Right Turn
        message = "M0150115001501150";
    }
    else if (buttons[2] == 1) {
        // Forward
        message = "M1150115011501150";
    }
    else if (buttons[3] == 1) {
        // Backward
        message = "M0150015001500150";

    }


    
    //console.log(message);
    
    return message;
}



const Joy: React.FC = () => {

    // Initialize useState vars
    // gamepad == null when no gamepad connected.
    const [gamepad, setGamepad] = useState<Gamepad | null>(null);
    const [gamepadType, setGamepadType] = useState("joy");

    const [prevMessage, setPrevMessage] = useState(HALT);





    // Joystick control panel
    // Hide debug menu button logic
    const [isDebug, setIsDebug] = useState(false);
    // Websocket connection input
    const [isConnecting, setIsConnecting] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [webSocketAddress, setWebSocketAddress] = useState<string | null>(null)

    // Initialize blank webSocketClient instance
    // Use useState to persist websocket across page updates
    const [websocket, setWebsocket] = useState<WebSocketClient | null>(new WebSocketClient());




    // Button Handlers
    const handleButtonPress = () => {
        setIsDebug(prev => !prev);
    }

    const handleWebSocketConnect = () => {
        if (webSocketAddress) {
            websocket?.connect(webSocketAddress);
            setIsConnected(true);
        }
    };

    const handleWebSocketDisconnect = () => {
        if (websocket) {
            websocket.disconnect();
            setIsConnected(false);
        }
        
    };

    // End Button Handlers


    const gamepadHandler = useCallback((event: GamepadEvent, connected: boolean) => {
        if (connected) {
            const id = event.gamepad.id;
            

            if (id.includes("09cc")) {
                // PS4 Controllers
                setGamepadType("ps4")
            }
            else if (id.includes("c215")) {
                // Logitech Joystick
                setGamepadType("joy")
            }


            setGamepad(event.gamepad);
            setIsDebug(false);
        } else {
            setGamepad(null);
        }
    }, []);


    
    

    useEffect(() => {
        if (gamepad) {

            if (gamepadType == "joy") {
                // Specific to controller, need to add ps4 controller support.
                const y = parseFloat(gamepad.axes[1].toFixed(3));
                const x = parseFloat(gamepad.axes[0].toFixed(3));

                const buttons = [gamepad.buttons[2].value, gamepad.buttons[3].value, 0, 0]

                const message = calculateMotorSpeeds(y, x, buttons);
                setPrevMessage(message);
            }
            else if (gamepadType == "ps4") {
                const y = parseFloat(gamepad.axes[3].toFixed(3));
                const x = parseFloat(gamepad.axes[2].toFixed(3));

                const buttons = [
                    // Left Turn
                    gamepad.buttons[14].value, 
                    // Right Turn
                    gamepad.buttons[15].value, 
                    // Forward
                    gamepad.buttons[12].value, 
                    // Backward
                    gamepad.buttons[13].value
                ];

                const message = calculateMotorSpeeds(y, x, buttons);
                setPrevMessage(message);
            }

            
            
            


        }
        
    }, [gamepad, gamepadType])

    useEffect(() => {
        const handleGamepadConnected = (e: GamepadEvent) => {
            gamepadHandler(e, true);
        };

        const handleGamepadDisconnected = (e: GamepadEvent) => {
            gamepadHandler(e, false);
        };
    
        window.addEventListener("gamepadconnected", handleGamepadConnected, false);
        window.addEventListener("gamepaddisconnected", handleGamepadDisconnected, false);
    
        return () => {
            window.removeEventListener("gamepadconnected", handleGamepadConnected);
            window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
        };
    }, [gamepadHandler]);

    useEffect(() => {
        const updateGamepadState = () => {
            // Loop through connected gamepads and log button presses and joystick movements
            const gamepads = navigator.getGamepads();

            const gamepad = getFirstNonNullItem(gamepads)
            
            setGamepad(gamepad);

            
    
            // Request the next animation frame
            requestAnimationFrame(updateGamepadState);
        };
    
        // Start the animation loop
        const animationFrameId = requestAnimationFrame(updateGamepadState);
    
        // Clean up the animation loop on component unmount
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
        <div className='absolute bottom-6 left-4 flex flex-col' >

            <InputGroup className="m-2 max-w-72">
                <Form.Control
                placeholder="socket"
                aria-label="Websocket address"
                aria-describedby="basic-addon2"
                onChange={(e) => setWebSocketAddress(e.target.value)}
                />
                <Button 
                variant="secondary" 
                id="button-addon2"
                className={`w-28 ${isConnected ? "connected" : "disconnected"}`} onClick={isConnected ? handleWebSocketDisconnect : handleWebSocketConnect} 
                >
                { isConnected ? 
                    "Disconnect"
                    :
                    "Connect"
                }
                </Button>
            </InputGroup>


            <Button variant="warning" className='m-2 w-52' onClick={handleButtonPress}>
                { isDebug ? 
                    "Hide Controller Debug"
                    :
                    "Show Controller Debug"
                }
            </Button>

            
            
        </div>

        { isDebug ? 
            <div className='flex flex-col min-w-80 w-3/4'>
                <JoyTable axes={gamepad?.axes} buttons={gamepad?.buttons} />
            </div>
            :
            null
        }
        
        </>
    );
};

export default Joy;