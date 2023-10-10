import React from 'react'
import '../styles/loginpage.css'
import image1 from '../assets/profile_pic.webp'

function SideNav() {
    const menuItems = [
        {
            index: 1,
            title: 'DASHBOARD'
        },
        {
            index: 2,
            title: 'EDIT ACTIVITY'
        },
        {
            index: 3,
            title: 'TRACK HISTORY'
        },
        {
            index: 4,
            title: 'HELP & SUPPORT'
        }
    ]
    return (
        <div className='w-full relative h-full bg-[#303030] flex flex-col'>
            <div className='flex items-end justify-start min-h-[20px] py-4 pl-4'>
                <div className='font-bold text-2xl'>Budget<span className='color_red'>Beacon</span></div>
            </div>
            <div className='w-full h-[1px] bg-gray-700'></div>
            <div className='w-full h-[150px] px-4 transition-[1s] flex justify-center my-16'>
                <div className='border-[2px] border-gray-600 w-[150px] h-[150px] rounded-[50%] overflow-hidden'>
                    <img className='w-[150px] h-[150px]' src='' alt='' onError={(e) => { e.target.src = image1 }} ></img>
                </div>
            </div>
            <div className='w-full h-[1px] bg-gray-700'></div>
            <div className='text-[rgb(134,134,134)] pl-4 py-4'>MENU</div>
            <div className='w-full h-[1px] bg-gray-700'></div>
            {menuItems.map((index) => {
                return (
                    <div className='pl-4 py-4 hover-bg'>
                        {index.title}
                    </div>
                )
            })}
            <div className='w-full h-[1px] bg-gray-700'></div>
        </div>
    )
}

export default SideNav