import { useState, useEffect, createContext } from 'react'
import clientAxios from '../config/clientAxios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setIsLoading(false)
                return
            }
    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    
            try {
                const {data} = await clientAxios('/users/perfil', config)  // default method is get
                setAuth(data)
                navigate('/projects')
            } catch (error) {
                setAuth({})
                console.log(error)
            } 
            
            setIsLoading(false)
            
        }
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext