'use client';
import Image from 'next/image'
import TopBar from '@/components/topbar'
import ScratchBlock from '@/components/scratchblock'
import React, { useState } from 'react'

const red = "bg-[#f00]";
const blue = "bg-[#00f]";
const green = "bg-[#0f0]";

export default function Home() {


    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("Forward");




    return (
        <div className='h-screen w-screen bg-gray-400'>
            <TopBar />
            <div className='flex justify-center items-center mt-10' >
                <ScratchBlock message={message} count={count} color={red} />
                <ScratchBlock message={message} count={count} color={green} />
                <ScratchBlock message={message} count={count} color={blue} />
            </div>
            
        </div>
    )
}
