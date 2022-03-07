import React, {useState}from 'react'
import useProject from '../hooks/useProject'
const FormCollaborator = () => {
    const [email, setEmail] = useState('')

    const { submitCollaborator } = useProject()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([email].includes('')) {
            alert('Email is required')
            return 
        }

        submitCollaborator(email)

    }

    return (
        <form className='bg-purple-600 py-10 px-5 md:w-1/2 rounded-lg shadow' onSubmit={handleSubmit}>
            <div className='my-5'>
                <label htmlFor='email' className='block text-white text-xl font-bold mb-2'>
                    Email
                </label>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='email'
                    type='email'
                    placeholder='e-mail@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value="Search"
                className='bg-indigo-500 text-white w-full py-3 font-bold rouded hover:cursor-pointer hover:bg-purple-400 transition-colors '
            />
        </form>
    )
}

export default FormCollaborator