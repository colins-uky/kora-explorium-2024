import Image from 'next/image'
import TopBar from '@/components/topbar'
import ScratchBlock from '@/components/scratchblock'

export default function Home() {
    return (
        <div className='h-screen w-screen bg-blue-600'>
            <TopBar />
            <div className='flex justify-center items-center' >
                <ScratchBlock />
            </div>
            
        </div>
    )
}
