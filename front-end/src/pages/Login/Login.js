import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../SignUp/SignUp.css'
import { Navigate } from 'react-router-dom'


const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [loginData, setLoginData] = useState({})

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const body = {
        username: formData.username,
        password: formData.password
    }


    function handleSubmit (e){
        e.preventDefault()
            axios.post('https://ezemmuoblockchain-5.onrender.com/login', body )
        .then(res =>{
            console.log(res)
            setLoginData(res.data)
            localStorage.setItem('data', JSON.stringify(res.data))
            localStorage.setItem('logged', loggedIn)
            console.log('data sent')
        })
        .catch(err=>{
            console.log(err)
            setError('Wrong Credentials')
        })
      
        console.log(loginData)
    }

    const logged = localStorage.getItem('logged')

useEffect(()=>{
    if(logged){
        setLoggedIn(true)
    }else{
        setLoggedIn(false)
    }
},[logged])
// console.log(loginData)


  return (
    <div className='login'>
    {
        !logged &&  <div className='signUp'>
        <h1>
            Log in
        </h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label>
                Fullname :  
                <input
                 type='text'
                 name='username'
                 onChange={handleChange}
                 value={formData.username}
                 />
            </label>
            </div>
            <div>
            <label>
                Passowrd :  
                <input
                 type='text'
                 name='password'
                 onChange={handleChange}
                 value={formData.password}
                 />
            </label>
            </div>
            <span style={{color:'red', fontFamily: 'Monts boldl'}}>{error}</span>
            <button type='submit'>Login</button>
        </form>
    </div>
    }
    {
        logged && <Navigate to='/admin' />
    }
   </div>
  )
}

export default Login