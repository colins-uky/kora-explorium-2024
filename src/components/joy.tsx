import React, { useEffect, useCallback, useState } from 'react';
import JoyTable from './joy_table';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import WebSocketClient from './websocket';
import { Joystick } from 'react-joystick-component';


const uk_image = "@/../public/UK_logo.svg";

const HALT = "M0000000000000000\n";

const joyDeadZone = 0.20;

const BERT_URL = "ws://192.168.1.16:1235";
const DEMOBOT_URL = "ws://192.168.1.4:1235";

const targetFPS = 13;

const NO_BUTTONS = [0, 0, 0, 0]




// Function to detect if the device is a mobile platform
function isMobile() {
    return typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function getFirstNonNullItem(array: any) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== null && array[i] !== undefined) {
            return array[i];
        }
    }
    return null; // If no non-null items are found
}






const Joy: React.FC = () => {

    // Initialize useState vars
    // gamepad == null when no gamepad connected.
    const [gamepad, setGamepad] = useState<Gamepad | null>(null);
    const [gamepadType, setGamepadType] = useState("joy");

    const [prevMessage, setPrevMessage] = useState(HALT);
    const [isDeadSwitch, setIsDeadSwitch] = useState(false);


    // var for debugging purposes, only gets updated when a message is sent over websocket.
    const [latestOutgoingMessage, setLatestOutgoingMessage] = useState(HALT);


    // Joystick control panel
    const [joystick, setJoystick] = useState<any>(null);
    const [showJoystick, setShowJoystick] = useState(false);

    // Hide debug menu button logic
    const [isDebug, setIsDebug] = useState(false);
    
    // Websocket connection input
    const [isConnected, setIsConnected] = useState(false);
    const [webSocketAddress, setWebSocketAddress] = useState<string | null>(null);

    // Quick Websocket connection for Bert and DemoBot
    const [isBertConnected, setIsBertConnected] = useState(false);
    const [isDemoBotConnected, setIsDemoBotConnected] = useState(false);

    // Initialize blank webSocketClient instance
    // Use useState to persist websocket across page updates
    const [isConnectionError, setIsConnectionError] = useState(false);
    const [websocket, setWebsocket] = useState<WebSocketClient>(new WebSocketClient(setIsConnectionError));

    
    
    const calculateMotorSpeeds = useCallback((forwardBackward: number, leftRight: number, buttons: number[], deadSwitch: boolean) => {
        // Joystick deadzone
    
        
        if (Math.abs(forwardBackward) < joyDeadZone){
            forwardBackward = 0;
        }
        
        if (Math.abs(leftRight) < joyDeadZone) {
            leftRight = 0;
        }
    
        
        
        const differential = leftRight * forwardBackward;
    
        let leftSpeedStr = "";
        let rightSpeedStr = "";
    
        let motorSpeedLeft = -1 * (forwardBackward + differential);
        let motorSpeedRight = -1 * (forwardBackward - differential);
    
        
        // Add directional bit to speed strings. 
        if (motorSpeedLeft < 0.01) {
            leftSpeedStr += "0";
        }
        else {
            leftSpeedStr += "1";
        }
    
        if (motorSpeedRight < 0.01) {
            rightSpeedStr += "0";
        }
        else {
            rightSpeedStr += "1";
        }
    
        motorSpeedLeft = Math.abs(motorSpeedLeft);
        motorSpeedRight = Math.abs(motorSpeedRight);
    
        
    
    
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

        let motor1 = rightSpeedStr;
        let motor2 = rightSpeedStr;
        let motor3 = leftSpeedStr;
        let motor4 = leftSpeedStr;

        

        
    
        if (isDemoBotConnected) {
            motor1 = rightSpeedStr;
            motor2 = leftSpeedStr;
            motor3 = leftSpeedStr;
            motor4 = rightSpeedStr;

            let motor3_char_arr = motor3.split('');
            motor3_char_arr[0] = motor3_char_arr[0] === '0' ? '1' : '0';
            motor3 = motor3_char_arr.join('');

            let motor4_char_arr = motor4.split('');
            motor4_char_arr[0] = motor4_char_arr[0] === '0' ? '1' : '0';
            motor4 = motor4_char_arr.join('');
        
            /* DemoBot:
               (2)--(1)
                |    |
                |    |
               (3)--(4) 
                Motors 3 and 4 have direction bit flipped also.
            */
            if (buttons[0] == 1) {
                // Left Turn
                motor1 = "1200";
                motor2 = "0200";
                motor3 = "1200";
                motor4 = "0200";


            }
            else if (buttons[1] == 1) {
                // Right Turn
                motor1 = "0200";
                motor2 = "1200";
                motor3 = "0200";
                motor4 = "1200";
            }
            else if (buttons[2] == 1) {
                // Forward
                motor1 = "1200";
                motor2 = "1200";
                motor3 = "0200";
                motor4 = "0200";
            }
            else if (buttons[3] == 1) {
                // Backward
                motor1 = "0200";
                motor2 = "0200";
                motor3 = "1200";
                motor4 = "1200";
            }
        }
        else {
            /* Bert: (And every other bot in the future hopefully.)
               (4)--(2)
                |    |
                |    |
               (3)--(1)
                lidar is in the front between (2)--(4)
            */
            if (buttons[0] == 1) {
                // Left Turn
                motor1 = "0200";
                motor2 = "1200";
                motor3 = "0200";
                motor4 = "1200";


            }
            else if (buttons[1] == 1) {
                // Right Turn
                motor1 = "1200";
                motor2 = "0200";
                motor3 = "1200";
                motor4 = "0200";
            }
            else if (buttons[2] == 1) {
                // Forward
                motor1 = "1200";
                motor2 = "1200";
                motor3 = "1200";
                motor4 = "1200";
            }
            else if (buttons[3] == 1) {
                // Backward
                motor1 = "0200";
                motor2 = "0200";
                motor3 = "0200";
                motor4 = "0200";
            }
        }


        let message = "M" + motor1 + motor2 + motor3 + motor4 + '\n';
    
        // If deadswitch not being pressed, send HALT
        if (!deadSwitch) {
            message = HALT;
        }
    
        //console.log(message);
        
        
        return message;
    }, [isDemoBotConnected]);

    // Button Handlers
    
    const handleShowJoyStick = () => {
        
        if (gamepad) {
            alert("Diconnect gamepad before using touch joystick.");
            return;
        }
        
        setShowJoystick(prev => !prev);
    }


    const handleButtonPress = () => {
        setIsDebug(prev => !prev);
    }

    const handleWebSocketConnect = () => {
        if (webSocketAddress) {
            if (websocket.isConnected) {
                handleWebSocketDisconnect();
            }


            websocket.connect(webSocketAddress);
            setIsConnected(websocket.isConnected);
           
        }
    };

    const handleWebSocketDisconnect = useCallback(() => {
        websocket.disconnect();
        setIsConnected(false);  
        setIsBertConnected(false);
        setIsDemoBotConnected(false);
    }, [websocket]);

   
    const handleEmergencyStop = () => {
        const interval = 100 // milliseconds
        const numMessages = 30;
        if (websocket.isConnected) {
            let executionsCount = 0;
            const intervalId = setInterval(() => {
                websocket.send(HALT);
                executionsCount++;
                
                if (executionsCount === numMessages) {
                    clearInterval(intervalId); // Stop the interval when done
                }
            }, interval); 
        }
    } 

    const handleQuickConnect = (bot: string) => {
        if (websocket.isConnected) {
            handleWebSocketDisconnect();
        }


        if (bot == "Bert") {
            // Disconnect any existing connection
            // Connect to Bert
            

            websocket?.connect(BERT_URL);
            setIsBertConnected(true);
        }
        else if (bot == "DemoBot") {
            // Connect to DemoBot
            

            websocket?.connect(DEMOBOT_URL);
            setIsDemoBotConnected(true)
        }
    }
    
    // Joystick handlers
    const handleJoyStickMove = (event: any) => {
        setJoystick(event);
    }





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





    /////////////////// useEFFECT HOOKS //////////////////////


    // Hook that executes when joystick is moved
    useEffect(() => {
        if (!joystick) {
            return;
        }


        const y = -1 * joystick.y;
        const x = joystick.x;

        const message = calculateMotorSpeeds(y, x, NO_BUTTONS, true);
        
        console.log(message);
        console.log(prevMessage);

        if (message !== prevMessage) {
            setPrevMessage(message);
        }
        
    }, [joystick, prevMessage, calculateMotorSpeeds]);



    // Exception handling hook for websocket errors and UI
    useEffect(() => {
        if (isConnectionError) {
            setIsBertConnected(false);
            setIsConnected(false);
            setIsDemoBotConnected(false);
            setIsConnectionError(prev => !prev);
        }
    }, [isConnectionError])

    // Main UseEffect Hook for sending motor speeds over websocket
    // Whenever prevMessage is updated this will execute
    useEffect(() => {
        if (!websocket.isConnected) {
            return;
        }
       
        websocket.send(prevMessage);
        setLatestOutgoingMessage(prevMessage);
    

    }, [prevMessage, websocket])


    // useEffect Hook for interpreting input from gamepad controllers
    useEffect(() => {
        if (gamepad) {

            if (gamepadType == "joy") {
                // Specific to controller, need to add ps4 controller support.
                const y = parseFloat(gamepad.axes[1].toFixed(3));
                const x = parseFloat(gamepad.axes[0].toFixed(3));

                const buttons = [gamepad.buttons[2].value, gamepad.buttons[3].value, 0, 0]

                const deadman = gamepad.buttons[0].pressed || gamepad.buttons[1].pressed;
                
                setIsDeadSwitch(deadman);

                const message = calculateMotorSpeeds(y, x, buttons, deadman);

                if (message != prevMessage) {
                    // Only if message is different from prev as to not 
                    // DOS attack our own websocket server
                    setPrevMessage(message);
                }
                

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

                const deadman = gamepad.buttons[7].pressed;
                setIsDeadSwitch(deadman);

                const message = calculateMotorSpeeds(y, x, buttons, deadman);

                if (message != prevMessage) {
                    // Only if message is different from prev as to not 
                    // DOS attack our own websocket server
                    setPrevMessage(message);
                }
            }

            
            
            


        }
        
    }, [gamepad, gamepadType, prevMessage, calculateMotorSpeeds])

    // Handle gamepad connections and disconnections.
    useEffect(() => {
        const handleGamepadConnected = (e: GamepadEvent) => {
            gamepadHandler(e, true);
            setShowJoystick(false);
            // Weird behavior with joystick and game controller being connected at same time.
            if (websocket.isConnected) {
                handleWebSocketDisconnect();
            }
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
    }, [gamepadHandler, handleWebSocketDisconnect, websocket]);



    // Main looping useEffect Hook.
    // Loops on animation frame throttled targetFPS var.
    useEffect(() => {
        let lastUpdateTime = 0;
      
        const updateGamepadState = (currentTime: number) => {
            const deltaTime = currentTime - lastUpdateTime;
      
            // Check if enough time has passed to meet the target FPS
            if (deltaTime > 1000 / targetFPS) {
            // Your gamepad update logic here
      
            const gamepads = navigator.getGamepads();
            const gamepad = getFirstNonNullItem(gamepads);
            setGamepad(gamepad);
      
            lastUpdateTime = currentTime;
      
            // Request the next animation frame
            requestAnimationFrame(updateGamepadState);
        } else {
            // If not enough time has passed, wait until the next frame
            setTimeout(() => {
                requestAnimationFrame(updateGamepadState);
            }, 1000 / targetFPS - deltaTime);
          }
        };
      
        // Start the animation loop
        const animationFrameId = requestAnimationFrame(updateGamepadState);
      
        // Clean up the animation loop on component unmount
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);


    ////////////////// END useEFFECT HOOKS //////////////////////

    return (
        <>
        <div className={`flex justify-center items-center mt-[10vh] lg:absolute lg:left-1/2 lg:bottom-32 ${showJoystick ? "" : "invisible"}`} >
            <Joystick 
                
                size={175} 
                sticky={false}
                baseColor="white" 
                stickColor="blue" 
                move={(event) => handleJoyStickMove(event)} 
                stop={() => websocket.isConnected ? websocket.send(HALT) : null}
                throttle={150}
                >
                
            </Joystick>
        </div>



        <div className='absolute bottom-6 left-4 flex flex-col' >
            
            <Button variant="danger" className='m-2 h-32 w-52' onClick={handleEmergencyStop}>
                E-STOP
            </Button>

            <div className='m-2 w-52 flex flex-row'>
                <Button className={`w-24 ${isBertConnected ? "connected" : "disconnected"}`}
                        onClick={isBertConnected ? handleWebSocketDisconnect : () => handleQuickConnect("Bert")}
                >
                    Bert
                </Button>
                <Button className={`ml-4 w-24 ${isDemoBotConnected ? "connected" : "disconnected"}`}
                        onClick={isDemoBotConnected ? handleWebSocketDisconnect : () => handleQuickConnect("DemoBot")}
                >
                    DemoBot
                </Button>
            </div>



            <InputGroup className="m-2 max-w-72">
                <Form.Control
                placeholder="ws://localhost:1234"
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
            
            { isMobile() ? 
                <Button variant="secondary" className='m-2 w-52' onClick={handleShowJoyStick}>
                    { showJoystick ? 
                        "Hide Joystick"
                        :
                        "Show Joystick"
                    }
                </Button>
                :
                <></>
            }
            
            
            <p className='my-0 ml-2'>Last message to websocket: {latestOutgoingMessage}</p>
        </div>

        { isDebug ? 
            <div className='flex flex-col min-w-80 w-3/4'>
                <JoyTable 
                    axes={gamepad?.axes} 
                    buttons={gamepad?.buttons} 
                    last_message={latestOutgoingMessage}
                    dead_man_switch={isDeadSwitch}
                    gamepadType={gamepadType}
                />
            </div>
            :
            null
        }
        
        </>
    );
};

export default Joy;