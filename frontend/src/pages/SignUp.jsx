import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from "axios"
import clientAxios from "../config/clientAxios"

// Context & custom hooks

import useAuth from '../hooks/useAuth'


const SignUp = () => {

    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [picture, setPicture] = useState('')

    const alertError = (msg) => {
        toast.error(`${msg}`, {
            duration: 2000,
            position: 'top-center',
            // Styling
            style: {
                background: '#9333ea',
                color: '#fff'
            },
            className: 'bg-purple-500',
            // Change colors of success/error/loading icon
            iconTheme: {
                primary: '#fff',
                secondary: '#6b21a8',
            },
            // Aria
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([name, lastname, email, password, passwordConfirm].includes('')) {

            alertError('All fields are required')
            return
        }

        if (password !== passwordConfirm) {
            alertError('Passwords don\'t match')
            return
        }

        if (password.length < 6) {
            alertError('Password must be at least 6 characters')
            return
        }

        try {
            const { data } = await clientAxios.post(`/users`, {
                name,
                lastname,
                email,
                password
            })
            // console.log(data)

            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-purple-500 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                    alt="Image team"
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-white">
                                    UpTask Team!
                                </p>
                                <p className="mt-1 text-sm text-white">
                                    {data.msg}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ))

            setEmail('')
            setPassword('')
            setPasswordConfirm('')
            setName('')
            setLastName('')
            setPicture('')

            setTimeout(() => { window.location.href = '/' }, 10000)
        } catch (error) {
            alertError(error.response.data.msg)
        }
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h1 className='text-purple-500 font-bold text-6xl p-5 md:text-center'>
                Create your account and manage your
                <span className='text-slate-700 capitalize'> projects</span>
            </h1>
            <form className='my-10 px-5' onSubmit={handleSubmit} >
                <div className='my-5'>
                    <label htmlFor='name' className='block text-gray-700 text-xl font-bold mb-2'>
                        Name
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='name'
                        type='text'
                        placeholder='John'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='my-5'>
                    <label htmlFor='lastname' className='block text-gray-700 text-xl font-bold mb-2'>
                        Lastname
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='lastname'
                        type='text'
                        placeholder='Doe'
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                {/* <div className='my-5'>
                    <label htmlFor='profilepicture' className='block text-gray-700 text-xl font-bold mb-2'>
                        Perfil picture
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='profilepicture'
                        type='text'
                        placeholder='Doe'
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                    />
                </div> */}

                <div className='my-5'>
                    <label htmlFor='email' className='block text-gray-700 text-xl font-bold mb-2'>
                        Email
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='email'
                        type='email'
                        placeholder='johndoe@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='my-5'>
                    <label htmlFor='password' className='block text-gray-700 text-xl font-bold mb-2'>
                        Password
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='password'
                        type='password'
                        placeholder='********'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className='my-5'>
                    <label htmlFor='passwordconfirm' className='block text-gray-700 text-xl font-bold mb-2'>
                        Confirm Password
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='passwordconfirm'
                        type='password'
                        placeholder='********'
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Sign Up"
                    className='my-5 bg-purple-600 text-white w-full py-3 font-bold rouded hover:cursor-pointer hover:bg-purple-800 transition-colors ' />
            </form>

            <nav className="lg:flex lg:justify-center px-5 mb-16">
                <Link to="/"
                    className="block text-center my-5 uppercase text-gray-700 text-sm font-bold lg:mb-0 hover:text-gray-900"
                >
                    have account yet? Sign In!
                </Link>
            </nav>
        </>
    )
}

export default SignUp