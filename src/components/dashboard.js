import React, { useState } from 'react'
import '../styles/component.css'
import Doughnut from './doughnutChart'

function Dashboard() {
    const [data, setData] = useState([30, 40, 30, 60, 10])
    const color = ['#fcc612', '#a10500', '#7fc3f0', '#320536', '#1bfa8b', '#0b331f', '#fcc612', '#a10500', '#7fc3f0', '#320536']
    return (
        <div className='w-full h-full flex flex-col py-2 pad-8'>
            <div className='w-full relative h-[200px] flex gap-4 resp800max'>
                <div className='w-full h-[200px] flex bg-[#1f1f27] flex-[6] rounded-[10px] b250 resp800 items-center'>
                    <div className='w-full h-[200px] flex flex-col py-2 px-6 justify-between'>
                        <div className='text-gray-500 font-semibold text-xl'>Balance</div>
                        <div className='text-white font-semibold text-3xl'>INR 20,153.78</div>
                        <div className='flex w-full h-[80px] gap-4 mt-6'>
                            <div className='flex w-full h-full flex-col'>
                                <div className='font-medium text-gray-500 text-xl resp-xl'>Income</div>
                                <div className='font-semibold text-2xl resp-xl'>INR 30000.00</div>
                            </div>
                            <div className='vertical-line-rp'></div>
                            <div className='flex w-full h-full flex-col'>
                                <div className='font-medium text-gray-500 text-xl resp-xl'>Expenses</div>
                                <div className='font-semibold text-2xl resp-xl'>INR 9846.22</div>
                            </div>
                        </div>
                    </div>

                    <div className='vertical-line'></div>
                    <div className='w-full h-[200px] flex items-center justify-around prr'>
                        <Doughnut h={180} w={180} data={data} color={color} />
                        <div className='flex flex-col mr-2'>
                            <div className='legend-item'><div className='w-3 h-2' style={{ background: `${color[0]}` }}></div>Utility</div>
                            <div className='legend-item'><div className='w-3 h-2' style={{ background: `${color[2]}` }}></div>Healthcare</div>
                            <div className='legend-item'><div className='w-3 h-2' style={{ background: `${color[4]}` }}></div>Essentails</div>
                            <div className='legend-item'><div className='w-3 h-2' style={{ background: `${color[6]}` }}></div>Entertainment</div>
                            <div className='legend-item'><div className='w-3 h-2' style={{ background: `${color[8]}` }}></div>Miscellaneous</div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[200px] flex bg-[#1f1f27] flex-[4] rounded-[10px] b250'></div>
            </div>
        </div>
    )
}

export default Dashboard