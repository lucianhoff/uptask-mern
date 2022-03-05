import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className="px-4 py-5 bg-purple-300">
        <div className="md:flex md:justify-between">
            <h2 className='text-4xl text-purple-500 font-black text-center'>
                UpTask
            </h2>

            <input 
                type='search'
                placeholder='Search projects'
                className='rounded-lg lg:w-96 block p-2 border'
            />

            <div className='flex items-center'>
                <Link to='/projects' className='font-bold text-purple-500 text-xl mr-5'>
                    Projects
                </Link>

                <button className='bg-purple-600 text-white font-bold py-2 px-4 rounded-full'>
                    Sign out
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header