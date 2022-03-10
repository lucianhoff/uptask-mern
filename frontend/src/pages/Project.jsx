import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import clientAxios from '../config/clientAxios'
import useProject from '../hooks/useProject'
import useAuth from '../hooks/useAuth'
import Loader from "../components/Loader"
import toast, { Toaster } from 'react-hot-toast'
import ModalFormTask from '../components/ModalFormTask'
import Task from '../components/Task'
import DeleteTask from '../components/DeleteTask'
import Collaborator from '../components/Collaborator'
import DeleteCollaborator from '../components/DeleteCollaborator'
import useAdmin from '../hooks/useAdmin'
import io from "socket.io-client";
import TaskManager from "../components/TaskManager"
import { dateFormat } from '../helpers/dateFormat'
import NewCollab from "./NewCollab"

const Project = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getProject, project, loading, deleteProject, handleModalTask, submitTasksProject, taskDone, handleDeleteTask, handleModalEditTask } = useProject()
    const [show, setShow] = useState(null);
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
    console.log(project.tasks)
    const taskArray = project.tasks !== undefined && project.tasks.length
    console.log(taskArray)
    const done = taskArray.length !== undefined && taskArray.filter(task => task.status === true)
    console.log(done)
    const admin = useAdmin()




    if (loading) return <Loader />
    return (
        <>
            <Toaster />
            <div className='flex gap-2 text-white justify-between items-end w-full'>

                <Link to="/projects" className="flex items-center font-normal bg-gray-200  focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 rounded text-indigo-600 px-6 py-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className='px-[0.23rem]'>Projects</span>
                </Link>
                {admin ? (
                    <div className='flex gap-4'>
                        <Link to={`/projects/edit/${id}`} className="flex items-center font-normal bg-gray-200  focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 rounded text-indigo-600 px-6 py-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span className='px-3'>Edit</span>
                        </Link>
                        <button onClick={handleDelete} className="flex items-center font-normal bg-gray-200  focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 rounded text-indigo-600 px-6 py-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className='px-[0.23rem]'>Delete</span>
                        </button>
                    </div>

                ) : (
                    <>
                        <p className="flex items-center font-normal bg-gray-200  focus:outline-none transition duration-150 ease-in-out rounded text-indigo-600 px-6 py-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                            <span className='px-[0.23rem]'>Rol: Collaborator</span>
                        </p>
                    </>
                )}
            </div>
            <div className='flex justify-between mt-8'>
                <div className='flex justify-between w-full'>
                    <h1 className={`text-4xl font-black text-white`}>Project: {project.name}</h1>
                    <h2 className={`text-4xl font-black text-white`}>Client: {project.client}</h2>
                </div>
            </div>



            <div className='bg-white shadow mt-10  rounded-lg'>

                <div className=''>
                    <div className="sm:px-6 w-full">
                        <div className="px-4 md:px-10 py-4 md:py-7">
                            <div className="flex items-center justify-between">
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Tasks</p>

                                {admin && <button className="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                                    onClick={handleModalTask}
                                >
                                    <p className="text-sm font-medium leading-none text-white">Add Task</p>
                                </button>}
                            </div>
                        </div>
                        <div className=" py-4 md:py-7 px-4 md:px-8 xl:px-10 rounded-lg">
                            {project.tasks.length > 1 && <div className="sm:flex items-center justify-between">
                                <div className="flex items-center">
                                    <div >
                                        <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                            <p>All</p>
                                        </div>
                                    </div>
                                    <div >
                                        <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ml-4 sm:ml-8">
                                            <p>Done</p>
                                        </div>
                                    </div>
                                    <div >
                                        <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ml-4 sm:ml-8">
                                            <p>Pending</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                                    <p>Sort By:</p>
                                    <select className="focus:outline-none bg-transparent ml-1">
                                        <option className="text-sm text-indigo-800">Latest</option>
                                        <option className="text-sm text-indigo-800">Oldest</option>
                                    </select>
                                </div>
                            </div>}
                            <div className="mt-7 overflow-x-auto">
                                <table className="w-full whitespace-nowrap">
                                    <tbody>
                                        {project.tasks.length ? project.tasks?.map(task => {
                                            return <tr key={task._id} className="h-16 border border-gray-100 rounded">
                                                <td>
                                                    <div className="py-4 flex items-center">
                                                        <div className="bg-white dark:bg-gray-800 border rounded-sm border-gray-400 dark:border-gray-700 w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                                            <input defaultChecked type="checkbox" className="checkbox opacity-0 absolute cursor-pointer w-full h-full" onClick={() => taskDone(task)} />
                                                            <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                                                {task.state
                                                                    ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                    : null}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td className>
                                                    <div className="flex items-center pl-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{task.name}</p>
                                                    </div>
                                                </td>
                                                <td className="pl-5">
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                                        </svg>
                                                        <p className="text-sm leading-none text-gray-600 ml-2">{task.description}</p>
                                                    </div>
                                                </td>
                                                <td className="pl-24">
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                        </svg>
                                                        <p className="text-sm leading-none text-gray-600 ml-2">{task.priority}</p>
                                                    </div>
                                                </td>

                                                <td className="pl-5">
                                                    <div className='flex items-center gap-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <p className=" text-sm focus:outline-none leading-none text-gray-600 rounded">{dateFormat(task.deadline)}</p>
                                                    </div>
                                                </td>
                                                <td className="pl-4">
                                                    <button className="text-sm leading-none text-white py-3 px-5 bg-indigo-700 rounded transition-colors hover:bg-indigo-500 focus:outline-none"
                                                        onClick={() => handleModalEditTask(task)}
                                                    >Edit</button>
                                                </td>
                                                <td className="pl-4 text-center">
                                                    <button className="text-sm leading-none text-white py-3 px-5 bg-red-700 rounded transition-colors hover:bg-red-500 focus:outline-none"
                                                        onClick={() => handleDeleteTask(task)}
                                                    >Delete</button>
                                                </td>
                                            </tr>
                                        }) : (
                                            <tr >
                                                <td className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800'>
                                                    No tasks yet
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <style>
                        {` .checkbox:checked + .check-icon {
                                    display: flex;
                                }`}
                    </style>
                </div>
            </div>
            {admin && (
                <>
                    <div className=''>
                        <div className='flex justify-between items-center mt-10 '>
                            <h1 className={`text-4xl font-black text-white`}>Collaborators: {project.collaborators?.length > 0 ? null : <span className='font-normal'>There are no collaborators yet, add new ones!</span>} </h1>
                            <button className="font-normal bg-gray-200  focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 rounded text-indigo-600 px-6 py-2 text-sm">Add Collaborator</button>
                        </div>
                        <div className='mt-10'>
                            {project.collaborators?.map((collaborator, index) => {
                                return <div key={collaborator.name} className={`${index > 0 ? "mt-3" : null} rounded-lg bg-white py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 sm:px-10`}>
                                    <div className="flex items-center mb-4 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0">
                                        <div className="relative w-12 h-12 rounded">
                                            <img className="w-full h-full object-cover inset-0 absolute rounded" src={collaborator.image} alt="avatar" />
                                        </div>
                                        <div className="ml-2">
                                            <h2 className="text-gray-800 text-sm font-bold">{`${collaborator.name} ${collaborator.lastname}`}</h2>
                                            <p className="font-normal text-xs text-gray-600 cursor-pointer hover:text-gray-700">{collaborator.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="font-normal bg-gray-200  focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 rounded text-indigo-600 px-6 py-2 text-sm">Options</button>
                                        <button className="ml-2 sm:ml-3 font-normal focus:outline-none bg-indigo-700 dark:hover:bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 dark:bg-indigo-600 rounded text-white px-6 py-2 text-sm">Contact</button>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </>
            )}
            <ModalFormTask />
            <DeleteTask />
            <DeleteCollaborator />
        </>

    )
}

export default Project