'use client';
import TopBar from '@/components/topbar'
import React, { useState } from 'react'


import ScratchGame from '@/components/scratch_game';

export default function Bert() {



    return (
        <div className='flex flex-col h-[100vh] bg-bluegrass'>
            <TopBar title={"Explorium"} />
            

            <ScratchGame />
            
        </div>
    )
}
