import React, { useState } from 'react'
import '../styles/home.css'
import bgimg from '../assets/moneyplant.jpg'

function Home() {
    const col = '1f1f27';
    const [active, setActive] = useState(false)
    return (
        <div className='relative w-[100vw] h-[100vh] bg-[#141518] text-white flex home-body'>
            <button className='z-[200] p-2 bg-red-300' onClick={() => setActive(!active)}>Click Me</button>
            <div className={active ? 'sidebar-right active' : 'sidebar-right'}></div>
            <div className={active ? 'sidebar-left-upper active' : 'sidebar-left-upper'}>
                <div className='bg-gray-400 w-[50vw] h-[60vh] z-[100]'>
                    <img src={bgimg} className='w-full h-full'></img>
                </div>
            </div>
            <div className={active ? 'sidebar-lower-left active' : 'sidebar-lower-left'}>
                <div className='text-[70px] font-bold pl-4'>Budget Beacon</div>
            </div>
            <div className={active ? 'sidebar-lower-right active' : 'sidebar-lower-right'}></div>
        </div>
    )
}

export default Home