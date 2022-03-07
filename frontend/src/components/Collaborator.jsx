import React from 'react'
import useProject from '../hooks/useProject'
import useAdmin from '../hooks/useAdmin'
const Collaborator = ({ collaborator }) => {
  // console.log(collaborator)
  const { handleDeleteCollaborator } = useProject()
  const { name, email, image, lastname } = collaborator

  const admin = useAdmin()
  return (
    admin && (
      <div className='border-b p-5 flex justify-between items-center'>
        <div>
          <p className=''>{name} {lastname}</p>
          <p className='text-sm text-gray-700'>{email}</p>
        </div>
        <div>
          <button type="button"
            className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
            onClick={() => handleDeleteCollaborator(collaborator)}
          >
            Delete
          </button>
        </div>
      </div>
    )
  )
}

export default Collaborator