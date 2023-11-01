import React from 'react'
import { useState } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

function Edit() {
    const [hover, setHover] = useState(false)
    const [amount, setAmount] = useState('')
    const [desc, setDesc] = useState('')
    const [type, setType] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const ExpenseType = [
        { value: 'Utility', index: '1' },
        { value: 'Healthcare', index: '2' },
        { value: 'Essentials', index: '3' },
        { value: 'Entertainment', index: '4' },
        { value: 'Miscellaneous', index: '5' }
    ]
    const categories = [{ value: 'Income' }, { value: 'Expenditure' }]
    const MenuProps = {
        PaperProps: {
            style: {
                color: 'white',
                backgroundColor: '#31313b'
            }
        }
    }

    const HandleClick = async (amt, description, type, category, date) => {
        if (amt === '' || description === '' || type === '' || category === '' || date === '') {
            setErrorMsg('All feilds must be filled')
            return
        }

        if (!(!isNaN(amt) && isFinite(amt))) {
            setErrorMsg('Not a valid number')
        }

        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(date)) {
            setErrorMsg('Invalid date format, use DD/MM/YYYY')
            return
        }
        const [day, month, year] = date.split('/').map(Number);
        const newdate = new Date(year, month - 1, day);
        let currDate = new Date();
        let isProperDate = day >= 1 &&
            day <= (month === 2 ? (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28) : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]) &&
            month >= 1 &&
            month <= 12 &&
            newdate.getFullYear() === year &&
            newdate.getMonth() === month - 1 &&
            newdate.getDate() === day

        if (!isProperDate) {
            setErrorMsg('Not a valid date')
            return
        }
        if (newdate > currDate) {
            setErrorMsg(`Pls adjust your time machine, today\'s date is ${currDate}`)
            return
        }
        setErrorMsg('')
        const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const requestData = {
            userId: userData._id,
            username: userData.name,
            amount: parseFloat(amount),
            description: desc,
            type: type,
            category: category,
            date: date
        };
        try {
            await axios.post('http://localhost:5000/api/v1/transaction/addTransaction', requestData)
            alert('Transaction added successfully')
            setAmount('')
            setCategory('')
            setDate('')
            setType('')
            setDesc('')
        } catch (err) {
            console.log("Error Occured : " + err)
        }
        return
    }
    return (
        <div className='w-full h-full flex flex-col py-8 px-4 items-center'>
            <div className='bg-[#1f1f27] flex flex-col w-full max-w-[500px] h-fit gap-4 px-4 py-8 items-center rounded-lg'>
                <div className='flex relative w-full h-fit justify-between px-[7.5%] items-center'>
                    <div className='text-2xl font-semibold text-gray-500 '>Activity Details</div>
                    <div className='mt-[5px]' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}><InfoIcon /></div>
                    {hover && <div className='absolute top-[35px] right-[0] bg-white text-black p-2 z-[100] flex flex-col'>
                        Enter all the details so we can categorise and display accordingly
                    </div>}
                </div>
                <div className='w-full h-full flex flex-col gap-6 items-center text-white'>
                    <CssTextField id="outlined-basic" label="Amount" variant="outlined" sx={{ input: { color: 'white' }, width: '85%' }} value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                    <CssTextField id="outlined-basic" label="Description" variant="outlined" sx={{ input: { color: 'white' }, width: '85%' }} value={desc} onChange={(e) => { setDesc(e.target.value) }} />

                    <Select displayEmpty MenuProps={MenuProps} sx={{
                        width: '85%', border: '1px solid grey', '& .MuiSelect-icon': {
                            fill: 'grey'
                        }
                    }} renderValue={() => {
                        return type ? <span className='text-white'>{type}</span> : <span className='text-white'>Type</span>
                    }} value={type} onChange={(e) => setType(e.target.value)} >
                        {ExpenseType.map((i) => (
                            <MenuItem
                                key={i.index}
                                value={i.value}
                            >
                                {i.value}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select displayEmpty MenuProps={MenuProps} sx={{
                        width: '85%', border: '1px solid grey', '& .MuiSelect-icon': { fill: 'grey' }, '&:focus': {
                            border: '1px solid white',
                        }
                    }} renderValue={() => {
                        return category ? <span className='text-white'>{category}</span> : <span className='text-white'>Category</span>
                    }} value={category} onChange={(e) => setCategory(e.target.value)} >
                        {categories.map((i) => (
                            <MenuItem
                                key={i.value}
                                value={i.value}
                            >
                                {i.value}
                            </MenuItem>
                        ))}
                    </Select>

                    <CssTextField id="outlined-basic" label="Date (DD/MM/YYYY)" variant="outlined" sx={{ input: { color: 'white' }, width: '85%' }} value={date} onChange={(e) => { setDate(e.target.value) }} />

                </div>
                {errorMsg && <div className='text-red-700 px-[7.5%] text-left'>{errorMsg}</div>}
                <div className=''>
                    <ColorButton variant="outlined" color='error' onClick={() => { HandleClick(amount, desc, type, category, date) }}>Add Activity</ColorButton>
                </div>
            </div>

        </div>
    )
}
const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'grey',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
    "& .MuiFormLabel-root": {
        color: 'white'
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: 'white'
    },
    '& .MuiSelect-icon': {
        fill: 'white',
    },
    '& .Mui-focused': {
        color: 'white'
    },
    '& .Mui-root': {
        color: 'white'
    }
});


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
        backgroundColor: red[800],
    },
}));

export default Edit
