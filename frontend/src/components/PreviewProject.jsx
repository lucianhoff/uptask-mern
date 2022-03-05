import React from 'react'
import { Link } from 'react-router-dom'
const PreviewProject = ({project}) => {

  // console.log(project)

  return (
    <div className='border-b p-5 flex justify-between items-center flex-1'>
      <p className='my-3'>{project.name} 
      
        <span className='text-gray-500 uppercase'>{" "}{project.client}</span>
      </p>

      <Link to={project._id} className='bg-purple-400 p-2 rounded-lg text-white hover:bg-purple-600 transition-colors'>See project</Link>
    </div>
  )
}

export default PreviewProject