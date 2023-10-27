import React, { useState } from 'react'
import Navbar from '../components/navbar';
import '../styles/home.css'
import bgimg from '../assets/moneyplant.jpg'
import LogoutIcon from '@mui/icons-material/Logout';
import Dashboard from '../components/dashboard'
import Edit from '../components/edit'
import ViewHistory from '../components/viewhistory'
import ContactUs from '../components/contact_us'

function Home() {
    const [active, setActive] = useState(false)
    const [activeIndex, setActiveIndex] = useState(1)
    const NavData = [
        {
            index: 1,
            title: 'Dashboard'
        },
        {
            index: 2,
            title: 'Add Activity'
        },
        {
            index: 3,
            title: 'View History'
        },
        {
            index: 4,
            title: 'Help & Support'
        },
    ]
    return (
        <div className='relative w-[100vw] h-adj bg-[#141518] text-white flex flex-col home-body'>
            <Navbar active={active} setActive={setActive} index={activeIndex} title={NavData[activeIndex - 1].title} />
            <div className={active ? 'sidebar-right active' : 'sidebar-right'}>
                {NavData.map((i) => {
                    return (
                        <div className={active ? 'font-semibold cursor-pointer' : 'hidden'} onClick={() => { setActiveIndex(i.index); setActive(!active) }}>
                            {i.title}
                        </div>
                    )
                })}
            </div>
            <div className={active ? 'sidebar-left-upper active' : 'sidebar-left-upper'}>
                <div className='bg-gray-400 w-[50vw] h-[60vh] z-[100]'>
                    <img src={bgimg} className='w-full h-full' alt='background'></img>
                </div>
            </div>
            <div className={active ? 'sidebar-lower-left active' : 'sidebar-lower-left'}>
                <div className='text-[70px] font-bold pl-8'>Budget Beacon</div>
            </div>
            <div className={active ? 'sidebar-lower-right active' : 'sidebar-lower-right'}>
                <div className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                    <LogoutIcon fontSize='large' />
                    <p className='font-bold text-[45px]'> Logout</p>
                </div>
            </div>
            {activeIndex === 1 && <Dashboard />}
            {activeIndex === 2 && <Edit />}
            {activeIndex === 3 && <ViewHistory />}
            {activeIndex === 4 && <ContactUs />}
        </div>
    )
}

export default Home