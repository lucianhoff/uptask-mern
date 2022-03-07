import React, { useEffect } from 'react'
import FormCollaborator from '../components/FormCollaborator'
import useProject from '../hooks/useProject'
import { useParams } from 'react-router-dom'
import Project from './Project'

const NewCollab = () => {

    const { getProject, project, isLoading, collaborator, addCollaborator} = useProject()
    const params = useParams()
    console.log(params)
    useEffect(() => {
        getProject(params.id)
    }, [])
    console.log(collaborator)
    console.log(project)
    if(isLoading) return "loading"

    return (
        <>
            <h1 className='text-4xl font-black'>Add Collaborator to {project.name}</h1>

            <div className='mt-10 flex justify-center'>
                <FormCollaborator />
            </div>

            {isLoading ? 'loading' : collaborator?._id && (
                <div className='flex justify-center mt-10'>
                    <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
                        <h2 className='text-center mb-10 text-2xl font-bold'>Result:</h2>   

                        <div className='flex justify-between items-center'>
                            <p className='flex justify-center items-center'>{collaborator.name} {collaborator.lastname}</p>

                            <button className='bg-slate-500 px-5 py-2 rounded-lg text-white' type="button" onClick={() => addCollaborator({email: collaborator.email})}> 
                                Add collaborator
                            </button>

                        </div>
                    </div>

                </div>
            )}
        </>
    )
}

export default NewCollab