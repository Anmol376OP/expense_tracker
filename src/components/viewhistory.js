import React from 'react'
import { useState } from 'react'
import Arrow from './arrow'

function Viewhistory() {
    const [history, setHistory] = useState([
        { amount: 500, category: 'Expenditure', desc: 'Pizza' }, { category: 'Expenditure', amount: 200, desc: 'Pizza' }, { category: 'Expenditure', amount: 500, desc: 'Electricity Bill' }, { category: 'Expenditure', amount: 100, desc: 'Taxi' }, { category: 'Expenditure', amount: 5000, desc: 'Prize Money' }, { category: 'Expenditure', amount: 40, desc: 'Cold Drink' }, { category: 'Expenditure', amount: 1200, desc: 'Medicine' }, { category: "Income", amount: 30000, desc: 'Salary' }
    ])
    return (
        <div className='w-full h-full px-4 py-8 flex items-center justify-center'>
            <div className='w-full max-w-[500px] flex flex-col bg-[#1f1f27] gap-4 px-4 py-8' >
                {
                    !history && <div className=''>No history available yet</div>
                }
                {history.length > 0 && history.map((index) => {
                    return (
                        <div className='bg-[#272731] rounded-[6px] flex justify-between min-h-[40px] items-center px-4'>
                            <div className='flex gap-2 items-center'>{index.desc}</div>
                            <div className='flex gap-2 items-center'><Arrow type={index.category === "Income" ? 1 : 0} />INR {index.amount} </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Viewhistory