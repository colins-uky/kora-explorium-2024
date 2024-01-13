'use client';
import Image from 'next/image'
import TopBar from '@/components/topbar'
import ScratchBlock from '@/components/scratchblock'
import React, { useState } from 'react'
import Joy from '@/components/joy';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import 'bootstrap/dist/css/bootstrap.min.css';


const red = "bg-[#f00]";
const blue = "bg-[#00f]";
const green = "bg-[#0f0]";

export default function Admin() {


    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("Forward");



    return (
        <div className='h-screen w-screen bg-bluegrass'>
            <TopBar title='Explorium'/>
            <div className='flex justify-center items-center mt-10' >
                
                
            </div>
            
        </div>
    )
}
