import React, { useState } from 'react'
import { Outlet, Navigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'
import Loader from '../components/Loader'

const PrivateRoute = () => {
    const { auth, isLoading } = useAuth()
    console.log(auth)
    console.log(auth._id)
    console.log(isLoading)
    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            {auth._id ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}

export default PrivateRoute