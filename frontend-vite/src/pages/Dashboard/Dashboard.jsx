import React, { useEffect} from 'react'
import './Dashboard.css'
import NavBar from '../../components/NavBar/NavBar'
import { Outlet, Navigate } from 'react-router-dom'
import TopNav from '../../components/TopNav/TopNav'

const Dashboard = () => {
    const isLogged = localStorage.getItem('logged')

    useEffect(()=>{
        if(isLogged){
            setTimeout(()=>{
                localStorage.removeItem('logged')
            },3* 60 * 60 * 1000)
        }
    })
    

    return (
        <>
            {
                isLogged && <div className='dashboard'>
                    <div className='dNav'>
                        <NavBar />
                    </div>
                    <div className='body'>
                        <TopNav />
                        <Outlet />
                    </div>
                </div>
            }
            {
                !isLogged && <Navigate to='/login' />
            }
        </>


    )
}

export default Dashboard

