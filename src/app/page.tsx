import Image from 'next/image'
import TopBar from '@/components/topbar'

export default function Home() {
    return (
        <div className='h-screen w-screen bg-blue-600'>
            <TopBar />
        </div>
    )
}
