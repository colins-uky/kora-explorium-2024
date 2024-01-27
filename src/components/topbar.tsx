import React from "react";
import Image from "next/image";

const kora_logo = "/kora-logo.png"

interface TopBarProps {
    title: string;
};

const TopBar: React.FC<TopBarProps> = ({ title }) => {
    return (
        <div className="top-bar container-center bg-midnight shadow-lg text-white p-4 w-full h-[10%]" >
            <div className="flex flex-row">
                <Image width={100} height={50} className="w-1/3 h-auto" src={kora_logo} alt="KORA Logo"/>
                <h1 className="text-4xl italic font-bold ml-3"> {title} </h1>
            </div>
        </div>


    )
}



export default TopBar;