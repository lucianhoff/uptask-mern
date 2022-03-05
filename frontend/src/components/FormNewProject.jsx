import React, { useState, useEffect } from 'react'
import useProject from "../hooks/useProject"
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'


const FormNewProject = () => {
    const params = useParams()
    console.log(params);

    const navigate = useNavigate()

    const { submitProject, projects, project } = useProject();
    // console.log(projects)

    const [id, setId] = useState(null);
    const [nameProject, setNameProject] = useState('');
    const [descriptionProject, setDescriptionProject] = useState('');
    const [client, setClient] = useState('');
    const [deadLine, setDeadLine] = useState('');
    useEffect(() => {

        if (params.id) {
            // console.log(project.)
            setNameProject(project.name)
            setId(project._id)
            setDescriptionProject(project.description)
            setClient(project.client)
            setDeadLine(project.deadline.split('T')[0])
        } else {
            setId(null)
        }



    }, [params])
    console.log(id)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([nameProject, descriptionProject, client, deadLine].includes('')) {
            toast.error('All fields are required')
            return
        }

        // send data to provider

        await submitProject({
            id: id,
            name: nameProject,
            description: descriptionProject,
            client: client,
            deadline: deadLine
        })

        if(id === null) {
            toast.success('Project created')
        } else {
            toast.success('Project updated')
        }
        
        // clear form

        setNameProject('')
        setDescriptionProject('')
        setClient('')
        setDeadLine('')
        setId(null)

        setTimeout(() => {
            navigate('/projects')
        }, 1000)

    }

    return (
        <>

            <Toaster />
            <form
                className='bg-purple-500 py-10 px-5 md:w-1/2 rounded-lg'
                onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor="nameProject" className='text-white font-bold text-md'>
                        Name Project
                    </label>
                    <input type="text"
                        id="nameProject"
                        className='border border-white mt-2 p-2 w-full rounded-md'
                        placeholder='Name Project'
                        value={nameProject}
                        onChange={(e) => setNameProject(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="description" className='text-white font-bold text-md'>
                        Description Project
                    </label>
                    <textarea
                        id="description"
                        className='border border-white mt-2 p-2 w-full rounded-md'
                        placeholder='Description Project'
                        value={descriptionProject}
                        onChange={(e) => setDescriptionProject(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="dead-line" className='text-white font-bold text-md'>
                        deadLine
                    </label>
                    <input type="date"
                        id="dead-line"
                        className='border border-white mt-2 p-2 w-full rounded-md'
                        placeholder='Dead line'
                        value={deadLine}
                        onChange={(e) => setDeadLine(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="client" className='text-white font-bold text-md'>
                        Client
                    </label>
                    <input type="text"
                        id="client"
                        className='border border-white mt-2 p-2 w-full rounded-md'
                        placeholder='Client name'
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                    />
                </div>

                <input type="submit"
                    value={id === null ? 'Create Project' : 'Edit Project'}
                    className='mt-10 bg-purple-600 w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-purple-800 transition-colors'
                />

            </form>
        </>
    )
}

export default FormNewProject