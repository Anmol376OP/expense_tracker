import React, { useEffect, useState } from 'react'
import '../styles/component.css'
import Doughnut from './doughnutChart'
import Arrow from './arrow'
import LineChart from './lineChart'
import axios from 'axios'
import { datetime } from 'filler/libs/helpers'

function Dashboard() {
    const [utilityData, setUtilityData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
    const [healthcareData, setHealthcareData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [essentialsData, setEssentialsData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [entertainmentData, setEntertainmentData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [miscellaneousData, setMiscellaneousData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [income, setIncome] = useState([20000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 500, 0, 5000, 7125.25])
    const [prevBalance, setPrevBalance] = useState(0)
    const [currBalance, setCurrBalance] = useState(0)
    const [balance, setBalance] = useState([])

    const [sumArray, setSumArray] = useState([0, 0, 0, 0, 1]);
    const [totalExpense, setTotalExpense] = useState(0)

    const [activeGraph, setActiveGraph] = useState(0)

    const setChartData = () => {
        const newSumArray = [0, 0, 0, 0, 0];
        [utilityData, healthcareData, essentialsData, entertainmentData, miscellaneousData].forEach((data, index) => {
            newSumArray[index] = data.reduce((acc, value) => acc + value, 0);
        });

        setSumArray(newSumArray);
        const newTotalExpense = newSumArray.reduce((acc, value) => acc + value, 0);
        setTotalExpense(newTotalExpense.toFixed(2));

        const expenditures = utilityData.map((value, index) => value + healthcareData[index] + essentialsData[index] + entertainmentData[index] + miscellaneousData[index]);
        const dailyBalances = [];
        let currentBalance = prevBalance;
        for (let i = 0; i < income.length; i++) {
            currentBalance += income[i] - expenditures[i];
            dailyBalances.push(currentBalance);
        }
        setBalance(dailyBalances)
        setCurrBalance(dailyBalances[14].toFixed(2))
    }

    const [history, setHistory] = useState()
    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('user'))
            axios.post('http://localhost:5000/api/v1/view/viewHistory', { data }).then(resp => setHistory(resp.data.slice(0, 7)))
        }
        catch (err) {
            console.log(err)
        }
    }, [])
    const fetchDataForType = async (type, index) => {
        try {
            const data = JSON.parse(localStorage.getItem('user'));
            const queryData = { _id: data._id, type: type };
            axios.post('http://localhost:5000/api/v1/data/getData', queryData).then(resp => {
                const sampleUtilityArray = index === 0 ? utilityData : index === 1 ? healthcareData : index === 2 ? essentialsData : index === 3 ? entertainmentData : miscellaneousData
                const arr = resp.data
                for (let i = 0; i < 15 && i < arr.length; i++) {
                    sampleUtilityArray[14 - i] = arr[i].amount
                }
                index === 0 ? setUtilityData(sampleUtilityArray) : index === 1 ? setHealthcareData(sampleUtilityArray) : index === 2 ? setEssentialsData(sampleUtilityArray) : index === 3 ? setEntertainmentData(sampleUtilityArray) : setMiscellaneousData(sampleUtilityArray)

                setChartData()
            })

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        try {
            const typeArr = [{ index: 0, name: 'Utility' }, { index: 1, name: 'Healthcare' }, { index: 2, name: 'Essentials' }, { index: 3, name: 'Entertainment' }, { index: 4, name: 'Miscellaneous' }]
            typeArr.forEach((itr) => {
                fetchDataForType(itr.name, itr.index)
            })
        } catch (err) {
            console.log(err)
        }
    }, [])

    const graphList = ['Balance graph', 'Individual Expenses']
    const [bills, setBills] = useState([{ amount: '720.25', title: 'Electricity', due: 'July 11, 2023' }, { amount: '429.83', title: 'Wi-Fi', due: 'July 18, 2023' }, { amount: '3120.25', title: 'Mess Fee', due: 'July 25, 2023' }])
    const color = ['#6f27c2', '#6f27c2', '#38e9fc', '#38e9fc', '#FFD700', '#FFD700', '#FF4136', '#FF4136', '#80fa1b', '#80fa1b']
    const [a1, setA1] = useState(1)
    const [a2, setA2] = useState(1)
    const [a3, setA3] = useState(1)
    const [a4, setA4] = useState(1)
    const [a5, setA5] = useState(1)

    return (
        <div className='w-full h-auto flex flex-col py-2 pad-8 gap-6'>
            <div className='w-full relative h-[200px] flex gap-4 resp800max'>
                <div className='w-full h-[200px] flex bg-[#1f1f27] flex-[6] rounded-[10px] b250 resp800 items-center'>
                    <div className='w-full h-[200px] flex flex-col py-2 px-6 justify-between'>
                        <div className='text-gray-500 font-semibold text-xl'>Balance</div>
                        <div className='text-white font-semibold text-3xl'>INR {currBalance}</div>
                        <div className='flex w-full h-[80px] gap-4 mt-6'>
                            <div className='flex w-full h-full flex-col'>
                                <div className='font-medium text-gray-500 text-xl resp-xl flex gap-2 items-center'>Income
                                    <Arrow category={1} /></div>
                                <div className='font-semibold text-2xl resp-xl'>INR 40000.00</div>
                            </div>
                            <div className='vertical-line-rp'></div>
                            <div className='flex w-full h-full flex-col'>
                                <div className='font-medium text-gray-500 text-xl resp-xl flex gap-2 items-center'>Expenses
                                    <Arrow category={0} /></div>
                                <div className='font-semibold text-2xl resp-xl'>INR {totalExpense}</div>
                            </div>
                        </div>
                    </div>

                    <div className='vertical-line'></div>
                    <div className='w-full h-[200px] flex items-center justify-around prr'>
                        <Doughnut h={180} w={180} data={sumArray} color={color} />
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
            <div className='w-full relative h-btm flex gap-4 flex-change'>
                <div className='w-full h-[400px] max-h-[400px] relative f2 bg-[#1f1f27] flex flex-col rounded-[10px] py-2 px-6 gap-2 scrollhide overflow-hidden'>
                    <div className='text-gray-500 font-semibold text-xl mb-2'>Recent Activity</div>
                    {history && history.length > 0 && history.map((index) => {
                        return (
                            <div className='bg-[#272731] rounded-[6px] flex justify-between min-h-[40px] items-center px-4'>
                                <div className='flex gap-2 items-center'>{index.description}</div>
                                <div className='flex gap-2 items-center'><Arrow type={index.category === 'Income' ? 1 : 0} />INR {index.amount} </div>
                            </div>
                        )
                    })}
                    {!history && <div className='text-gray-500 italic w-full h-[100px] flex items-center justify-center'>No History Available</div>}
                </div>
                <div className='w-full h-full f5 bg-[#1f1f27] rounded-[10px] p-4 overflow-hidden'>
                    <div className='absolute w-fit h-[30px] rounded-[10px] border text-sm py-1 px-2 flex items-center justify-center right-[20px] bottom-[350px] cursor-pointer' onClick={() => setActiveGraph((activeGraph + 1) % 2)}>{graphList[activeGraph]}</div>
                    {activeGraph === 1 && <div className='absolute w-[70px] h-[30px] rounded-[10px] text-sm py-1 px-2 flex items-center justify-center right-[20px] bottom-[310px] cursor-pointer hide800 flex-wrap gap-2'>
                        <div className='w-3 h-2' style={{ background: `${color[0]}` }} onClick={() => setA1(a1 === 1 ? 0 : 1)}></div>
                        <div className='w-3 h-2' style={{ background: `${color[2]}` }} onClick={() => setA2(a2 === 1 ? 0 : 1)}></div>
                        <div className='w-3 h-2' style={{ background: `${color[4]}` }} onClick={() => setA3(a3 === 1 ? 0 : 1)}></div>
                        <div className='w-3 h-2' style={{ background: `${color[6]}` }} onClick={() => setA4(a4 === 1 ? 0 : 1)}></div>
                        <div className='w-3 h-2' style={{ background: `${color[8]}` }} onClick={() => setA5(a5 === 1 ? 0 : 1)}></div>
                    </div>}
                    {activeGraph === 0 && <LineChart data1={balance} n={1} />}
                    {activeGraph === 1 && <LineChart data1={utilityData} data2={healthcareData} data3={essentialsData} data4={entertainmentData} data5={miscellaneousData} n={5} a1={a1} a2={a2} a3={a3} a4={a4} a5={a5} />}

                </div>
            </div>
        </div>
    )
}

export default Dashboard