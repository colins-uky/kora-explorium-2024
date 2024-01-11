import React from "react";
import { FaCog } from "react-icons/fa";
import Draggable from "react-draggable";

interface Props {
    message: string;
    count: number;
    color: string;
}




const ScratchBlock: React.FC<Props> = (props) => {
    const color = "bg-[#000]"

    const handleGearButtonPress = () => {
        console.log("bruh")
    }

    return (
        <Draggable>
        <div className={"flex relative p-8 w-32 h-16 bg-white rounded-tr-none rounded-bl-none rounded-lg border-2 border-black z-0 " + props.color}>
            <div className={"w-16 h-4 bg-white -top-4 -right-0.5 rounded-t-lg absolute z-2 border-2 border-black border-b-0 " + props.color} />
            <div className={"w-16 h-4 -bottom-4 -left-0.5 bg-white rounded-b-lg absolute z-2 border-2 border-black border-t-0 " + props.color} />
            <div className="z-10 w-6 h-6 absolute flex justify-center items-center top-1 right-1" onClick={handleGearButtonPress}>
                <FaCog color={"white"} />
            </div>
            
            <h1 className="text-lg font-bold z-10 absolute bottom-2 left-3 text-white">{props.message}</h1>
            <h1 className="text-lg font-bold z-10 ml-2 absolute bottom-2 right-4 text-white">{props.count}s</h1>
        </div>
        </Draggable>
    )
}



export default ScratchBlock;