import React from 'react'
import '../styles/navbar.css'

function Navbar(props) {
    return (
        <div className='w-full h-[60px] flex items-center justify-between px-4'>
            <div className='text-3xl'>{props.title}</div>
            <div className='flex gap-2'>
                <div className='relative button-icon z-[200] flex flex-col border w-[40px] h-[40px] rounded-[10px]' onClick={() => props.setActive(!props.active)}>
                    <div className={props.active ? 'bar horizontal active' : 'bar horizontal'}></div>
                    <div className={props.active ? 'bar vertical active' : 'bar vertical'}></div>
                </div>
            </div>
        </div>
    )
}

export default Navbar