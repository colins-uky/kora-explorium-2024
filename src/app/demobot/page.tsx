'use client';
import TopBar from '@/components/topbar'
import React, { useState } from 'react'


import ScratchGame from '@/components/scratch_game';

export default function DemoBot() {



    return (
        <div className='flex flex-col min-h-screen bg-bluegrass'>
            <TopBar title={"Explorium"} />
            

            <ScratchGame />
            
        </div>
    )
}
