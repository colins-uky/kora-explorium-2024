'use client';
import TopBar from '@/components/topbar'
import React, { useState } from 'react'


import ScratchGame from '@/components/scratch_game';

const TEST_URL = "ws://localhost:8765";



const ISDEMOBOT = false;
const BERT_URL = "ws://192.168.1.16:1235";
const MOTOR_SPEED = 125;
const OP_DURATION_MILLISECONDS = 1500;


export default function Bert() {



    return (
        <div className='flex min-h-screen flex-col bg-bluegrass'>
            <TopBar title={"Explorium"} />
            

            <ScratchGame 
                isDemoBot={ISDEMOBOT}
                websocket_address={BERT_URL}
                motor_speed={MOTOR_SPEED}
                operation_duration_milliseconds={OP_DURATION_MILLISECONDS}

            />
            
        </div>
    )
}
