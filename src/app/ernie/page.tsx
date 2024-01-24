'use client';
import TopBar from '@/components/topbar'
import React, { useState } from 'react'


import ScratchGame from '@/components/scratch_game';




const ISDEMOBOT = true;
const DEMOBOT_URL = "ws://192.168.1.4:1235";
const MOTOR_SPEED = 125;
const OP_DURATION_MILLISECONDS = 1500;

export default function Ernie() {



    return (
        <div className='flex flex-col min-h-screen bg-bluegrass'>
            <TopBar title={"Explorium"} />
            

            <ScratchGame 
                isDemoBot={ISDEMOBOT} 
                websocket_address={DEMOBOT_URL}
                motor_speed={MOTOR_SPEED}
                operation_duration_milliseconds={OP_DURATION_MILLISECONDS}
            />
            
        </div>
    )
}
