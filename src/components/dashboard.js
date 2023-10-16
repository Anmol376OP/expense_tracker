import React from 'react'
import '../styles/component.css'

function Dashboard() {
    return (
        <div className='w-full h-full flex flex-col py-2 px-8'>
            <div className='w-full relative h-[200px] flex gap-4 resp800max'>
                <div className='w-full h-[200px] flex bg-[#1f1f27] flex-[6] rounded-[10px] b250 resp800 items-center'>
                    <div className='w-full h-[200px] flex flex-col pt-2 pb-4 px-6 justify-around gap-2'>
                        <div className='text-gray-500 font-semibold text-xl'>Balance</div>
                        <div className='text-white font-semibold text-3xl'>INR 20,153.78</div>
                        <div className='flex w-full h-[80px] gap-4'>
                            <div className='flex w-full h-full flex-col'>
                                <div className='font-medium text-gray-500 text-xl'>Income</div>
                                <div className='font-semibold text-2xl'>INR 30000.00</div>
                            </div>
                            <div className='vertical-line-rp'></div>
                            <div className='flex w-full h-full flex-col'>
                                <div className='font-medium text-gray-500 text-xl'>Expenses</div>
                                <div className='font-semibold text-2xl'>INR 9846.22</div>
                            </div>
                        </div>
                    </div>

                    <div className='vertical-line'></div>
                    <div className='w-full h-[200px]'></div>
                </div>
                <div className='w-full h-[200px] flex bg-[#1f1f27] flex-[3] rounded-[10px] b250'></div>
            </div>
        </div>
    )
}

export default Dashboard