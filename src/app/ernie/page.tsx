'use client';
import TopBar from '@/components/topbar'
import React, { useState } from 'react'


import ScratchGame from '@/components/scratch_game';


const DEMOBOT_URL = "ws://192.168.1.4:1235";


export default function Ernie() {



    return (
        <div className='flex flex-col min-h-screen bg-bluegrass'>
            <TopBar title={"Explorium"} />
            

            <ScratchGame 
                isDemoBot={true} 
                websocket_address={DEMOBOT_URL}
            />
            
        </div>
    )
}
