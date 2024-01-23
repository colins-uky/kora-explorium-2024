'use client';
import TopBar from '@/components/topbar'
import React, { useState } from 'react'


import ScratchGame from '@/components/scratch_game';


const BERT_URL = "ws://192.168.1.16:1235";

const TEST_URL = "ws://localhost:8765";

export default function Bert() {



    return (
        <div className='flex min-h-screen flex-col bg-bluegrass'>
            <TopBar title={"Explorium"} />
            

            <ScratchGame 
                websocket_address={TEST_URL}
            />
            
        </div>
    )
}
