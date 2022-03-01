import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {

    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [picture, setPicture] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        
    }

    return (
        <>
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

                <div className='my-5'>
                    <label htmlFor='lastname' className='block text-gray-700 text-xl font-bold mb-2'>
                        Perfil picture
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='lastname'
                        type='text'
                        placeholder='Doe'
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                    />
                </div>

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