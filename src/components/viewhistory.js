import React from 'react'
import { useState, useEffect } from 'react'
import Arrow from './arrow'
import axios from 'axios'

function Viewhistory() {
    const [history, setHistory] = useState()

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('user'))
            axios.post('http://localhost:5000/api/v1/view/viewHistory', { data }).then(resp => setHistory(resp.data))
        }
        catch (err) {
            console.log(err)
        }
    }, [])
    return (
        <div className='w-full h-full px-4 py-8 flex items-center justify-center'>
            <div className='w-full max-w-[500px] flex flex-col bg-[#1f1f27] gap-4 px-4 py-8' >
                {
                    !history && <div className=''>No history available yet</div>
                }
                {history && history.length > 0 && history.map((index) => {
                    return (
                        <div className='relative bg-[#272731] rounded-[6px] flex justify-between min-h-[40px] items-center px-4'>
                            <div className='flex gap-2 items-center'>{index.description}</div>
                            <div className='flex gap-2 items-center'><Arrow type={index.category === "Income" ? 1 : 0} />INR {index.amount} </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Viewhistory