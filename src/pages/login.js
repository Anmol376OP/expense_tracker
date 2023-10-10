import React from 'react'
import '../styles/loginpage.css'
import { useState } from 'react'
import Triangle from '../components/triangle'
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [loginState, setLoginState] = useState(true);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const HandleRegister = async (e) => {
        e.preventDefault()

        const userData = {
            name: username,
            email: email,
            password: password
        }
        try {
            await axios.post('http://localhost:5000/api/v1/users/register', userData)
            console.log('Success !!!!!')
            alert('Signup successfull')
            setLoginState(!loginState)
            setUsername('')
            setEmail('')
            setPassword('')
        } catch (err) {
            console.log("Error Occured : " + err)
        }
    }
    const HandleLogin = async (e) => {
        e.preventDefault()

        const userLoginData = {
            name: username,
            password: password
        }
        try {
            const { data } = await axios.post('http://localhost:5000/api/v1/users/login', userLoginData)
            localStorage.setItem('user', JSON.stringify({ ...data }))
            navigate('/home', { replace: true });
        } catch (err) {
            console.log(err)
        }
    }
    return (
        < div className="LoginBox">
            <Triangle size={'Big'} />
            <Triangle size={'Medium'} />
            <div className='login-main'>
                <div className='login-section1'>
                    <div className='heading visible600'>Budget<span className='color_red'>Beacon</span></div>
                    <div className='section-row'>
                        <div className='heading'>Track your penny, <span>Budget<span className='color_red'>Beacon</span></span></div>
                        <div className='heading-mini' style={{ zIndex: '500' }}>Scratching off your head, tracking all your expenses every day? We're here to help before you get bald. Sign up, and never end with empty pockets - simplify your financial journey today, and watch your savings grow your way!
                        </div>
                        <div className='heading-small'>Login to start tracking</div>
                    </div>
                </div>
                <div className='login-section2'>
                    <div className={loginState ? 'flip-card' : 'flip-card active'}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <div className='container-face'>
                                    <div className='heading'>Login</div>
                                    <CssTextField id="outlined-basic" label="Username" variant="outlined" sx={{ input: { color: 'white' }, width: '75%' }} value={username} onChange={(e) => { setUsername(e.target.value) }} />
                                    <CssTextField id="outlined-basic" type='password' label="Password" variant="outlined" sx={{ input: { color: 'white' }, width: '75%' }} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                    <ColorButton variant="outlined" color='error' onClick={HandleLogin} >Login</ColorButton>
                                    <div className='heading-micro'>Don't have an account?<span className='sign' onClick={() => setLoginState(!loginState)}> SIGN UP</span></div>
                                </div>
                            </div>
                            <div className="flip-card-back">
                                <div className='container-face'>
                                    <div className='heading'>Sign Up</div>
                                    <CssTextField id="outlined-basic" label="Username" variant="outlined" sx={{ input: { color: 'white' }, width: '75%' }} value={username} onChange={(e) => { setUsername(e.target.value) }} />
                                    <CssTextField id="outlined-basic" label="E-Mail" variant="outlined" sx={{ input: { color: 'white' }, width: '75%' }} value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                    <CssTextField id="outlined-basic" type='password' label="Password" variant="outlined" sx={{ input: { color: 'white' }, width: '75%' }} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                    <ColorButton variant="outlined" color='error' onClick={HandleRegister} >Sign Up</ColorButton>
                                    <div className='heading-micro'>Already have an account?<span className='sign' onClick={() => setLoginState(!loginState)}> SIGN IN</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default Login

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
    }
});

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
        backgroundColor: red[800],
    },
}));
