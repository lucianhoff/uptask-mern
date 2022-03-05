import React, { useState } from 'react'
import { Outlet, Navigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'
import Loader from '../components/Loader'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const PrivateRoute = () => {
    const { auth, isLoading } = useAuth()
    // console.log(auth)
    // console.log(auth._id)
    // console.log(isLoading)
    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            {auth._id ? (
                <div className='bg-gray-500'>
                    <Header />

                    <div className='md:flex md:min-h-screen'>
                        <Sidebar />
                        <main className='p-10 flex-1 bg-purple-400'>
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : <Navigate to="/" />}
        </>
    )
}

export default PrivateRoute