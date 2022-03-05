import React from 'react'
import { Link, useParams } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

const Sidebar = () => {

  const { auth, isLoading } = useAuth()
  return (
    <aside className='md:w-80 lg:w-96 px-5 py-10'>
      <p className='text-xl font-bold'>Hola: {auth.name} {auth.lastname}</p>
      <Link
        className='text-white bg-purple-600 block p-3 font-bold rounded-lg text-center text-xl hover:bg-purple-800 transition-colors'
        to='newproject'>
        New project
      </Link>
    </aside>
  )
}

export default Sidebar