import { useState } from 'react';
import './App.css';
import axios from 'axios'
function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(value) {
    value.preventDefault()
    const userData = {
      name: name,
      email: email,
      password: password
    }
    console.log(JSON.stringify(userData))
    try {
      await axios.post('http://localhost:5000/api/v1/users/register', userData)

    } catch (err) {
      console.log("Error Occured : " + err)
    }
  }
  return (
    <div className="App">
      <h1>Register</h1>
      <form className='flex gap-4' onSubmit={registerUser}>
        <input className='border border-black' value={name} onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Name'></input>
        <input className='border border-black' value={email} onChange={(e) => { setEmail(e.target.value) }} type='email' placeholder='Email'></input>
        <input className='border border-black' value={password} onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='Password'></input>
        <input className='border border-black px-2' type='submit' value={'Submit'}></input>
      </form>
    </div>
  );
}

export default App;
