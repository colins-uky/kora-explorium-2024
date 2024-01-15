'use client';
import Image from 'next/image'
import TopBar from '@/components/topbar'
import ScratchBlock from '@/components/scratchblock'
import React, { useState } from 'react'
import Joy from '@/components/joy';
import useWebSocket, { ReadyState } from 'react-use-websocket';





export default function Home() {


    return (
        <div className='h-screen w-screen bg-bluegrass'>
            <TopBar title='Explorium'/>
            <div className='flex justify-center items-center mt-10' >
                
            </div>
            
        </div>
    )
}
