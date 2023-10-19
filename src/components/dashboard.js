import React, { useState } from 'react'
import '../styles/component.css'
import Doughnut from './doughnutChart'

function Dashboard() {
    const [data, setData] = useState([30, 40, 30, 60, 10])
    const [bills, setBills] = useState([{ amount: '720.25', title: 'Electricity', due: 'July 11, 2023' }, { amount: '429.83', title: 'Wi-Fi', due: 'July 18, 2023' }, { amount: '3120.25', title: 'Mess Fee', due: 'July 25, 2023' }])
    const color = ['#6f27c2', '#6f27c2', '#38e9fc', '#38e9fc', '#FFD700', '#FFD700', '#FF4136', '#FF4136', '#80fa1b', '#80fa1b']
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
                <div className='w-full h-[200px] flex flex-col bg-[#1f1f27] flex-[3] rounded-[10px] b250 py-2 px-6 gap-3'>
                    <div className='text-gray-500 font-semibold text-xl'>Upcoming Bills</div>
                    <div className='flex flex-col gap-2'>
                        {bills.length > 0 && bills.map((index) => {
                            return (
                                <div className='bg-[#272731] rounded-[6px] flex justify-between h-[40px] items-center px-4'>
                                    <div className='resp-xl'>{index.title},<span className='text-gray-600 pl-2'>{index.due}</span></div>
                                    <span className='resp-xl'>INR {index.amount}</span>
                                </div>
                            )
                        })}
                        {bills.length === 0 && <div className='text-gray-500 italic w-full h-[100px] flex items-center justify-center'>Wohooo!!! No bills upcoming soon </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard