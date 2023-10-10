import React, { useState } from 'react'
import SideNav from '../components/sidenav'

function Home() {
    return (
        <div className='w-[100vw] h-[100vh] bg-[#212121] text-white flex'>
            <div className='w-[240px]'>
                <SideNav />
            </div>
            <div className=''>

            </div>
        </div>
    )
}

export default Home