import React, { useEffect } from 'react'
import useProject from '../hooks/useProject'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import FormNewProject from '../components/FormNewProject'
const EditProjetc = () => {

    const { id } = useParams()

    const { getProject, project, loading } = useProject()

    useEffect(() => {
        getProject(id)
    }, [])

    if (loading) return <Loader />
    return (
        <>
            <h1>Project to edit: {project.name}</h1>

            <div className='mt-10 flex justify-center'>
                <FormNewProject />
            </div>
        </>
    )
}

export default EditProjetc