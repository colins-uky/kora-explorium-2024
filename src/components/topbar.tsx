import React from "react";
import Image from "next/image";

const kora_logo = "/kora-logo.png"

const TopBar: React.FC = () => {
    return (
        <div className="top-bar container-center bg-gray-800 text-white p-4 w-full h-[10%]" >
            <div className="flex flex-row">
                <Image src={kora_logo} alt="KORA Logo" width={100} height={1}/>
                <h1 className="text-4xl italic font-bold ml-3"> Explorium </h1>
            </div>
        </div>


    )
}



export default TopBar;