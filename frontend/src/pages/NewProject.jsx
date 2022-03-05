import React from 'react'
import FormNewProject from '../components/FormNewProject'

const NewProject = () => {

  

  return (
    <>
      <h1 className='text-4xl font-black text-white'>New Project</h1>

      <div className='mt-10 flex justify-center'>
          <FormNewProject />
      </div>
    </>
  )
}

export default NewProject