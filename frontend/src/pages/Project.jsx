import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import clientAxios from '../config/clientAxios'
import useProject from '../hooks/useProject'
import Loader from "../components/Loader"
import toast, { Toaster } from 'react-hot-toast'
import ModalFormTask from '../components/ModalFormTask'
import Task from '../components/Task'
import DeleteTask from '../components/DeleteTask'

const Project = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getProject, project, loading, deleteProject, handleModalTask, handleDeleteTask } = useProject()

    // const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getProject(id)
    }, [])

    const handleDelete = async () => {
        if (window.confirm('Are you sure?')) {
            try {
                deleteProject(id)
                toast.success('Project deleted')
                navigate('/projects')
            } catch (error) {
                toast.error('Error deleting project')
            }
        } else {
            toast.error('Error deleting projectxd')
        }
    }

    // console.log(project)
    if (loading) return <Loader />
    return (
        <>
            <Toaster />
            <div className='flex justify-between'>
                <div className=''>
                    <h1 className={`text-4xl font-bold`}>{project.name}</h1>

                </div>
                <div className='flex items-center gap-2 text-white'>
                    <Link to={`/projects/edit/${id}`} className="flex hover:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit</span>
                    </Link>
                    <button onClick={handleDelete} className="flex hover:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
            <button onClick={handleModalTask} className="flex bg-purple-600 md:mt-3 gap-2 rounded-lg text-white p-3 hover:text-gray-900 hover:bg-purple-500 transition-colors ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Agregar tarea</span>
            </button>

            <p className='font-bold text-xl mt-10'> Project Task </p>

            <div className='bg-white shadow mt-10'>
                {
                project.tasks?.length 
                    ? (
                        <>
                            {project.tasks?.map(task => <Task key={task._id} task={task} />)}
                        </>
                      )
                    : <p className='text-center text-2xl'>No hay tareas</p>
                }

            </div>
            <ModalFormTask />
            <DeleteTask />
        </>

    )
}

export default Project