import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useProject from '../hooks/useProject'
const PreviewProject = ({ project }) => {

  const { auth } = useAuth()

  return (
    <div className='border-b p-5 flex justify-between items-center flex-1'>
      <div className='flex items-center justify-between'>
        <p className='my-3'>{project.name}

          <span className='text-gray-500 uppercase'>{" "}{project.client}</span>
        </p>
        {auth._id !== project.owner && <p className='ml-5 bg-green-600 py-1 px-2 uppercase rounded-lg text-white text-xs'>Collaborator</p>}
      </div>
      <Link to={project._id} className='bg-purple-400 p-2 rounded-lg text-white hover:bg-purple-600 transition-colors'>See project</Link>
    </div>
  )
}

export default PreviewProject