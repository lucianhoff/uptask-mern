import React from 'react'
import { useState, useEffect } from 'react'
import { dateFormat } from '../helpers/dateFormat'
import useProject from '../hooks/useProject'
import deleteTask from "../components/DeleteTask"
import useAdmin from '../hooks/useAdmin'
const Task = ({ task }) => {

    const { name, description, deadline, priority, _id, state, taskManager } = task
    const admin = useAdmin()
    // console.log("state", state)
    // console.log(task)    
    const { handleModalEditTask, handleDeleteTask, taskDone } = useProject();
    return (
        <div className='border-b p-5 flex justify-between flex-col'>
            <div>
                <p className='text-xl mb-1'>{name}</p>
                <p className="text-sm text-gray-500 uppercase mb-1">{description}</p>
                {/* <p className='text-xl'>{deadline.split('T')[0].split("-").reverse().join("/")}</p> */}
                {/* <p className='text-xl mb-1'>{deadline.split('T')[0].split('-').join('/')}</p> */}
                <p className='text-sm mb-1'>{dateFormat(deadline)}</p>
                <p className='text-gray-600 mb-1'>Priority: <span>{priority}</span></p>
                {state ? <p className='text-gray-600 mb-1'>Complete by: <span>{taskManager.name} {taskManager.lastname}</span></p> : null}
            </div>

            <div className='flex justify-between mt-2'>
                <div>
                    {admin && (
                        <button
                            onClick={() => handleModalEditTask(task)}
                            className='bg-indigo-600 px-4 py-3 text-white font-bold text-sm rounded-lg mr-1'
                        >
                            Edit
                        </button>
                    )}

                    <button
                        className={`${admin ? "mx-1" : "mx-0"} ${state ? "bg-emerald-500" : "bg-gray-500"}  px-4 py-3 text-white font-bold text-sm rounded-lg mx-1`}
                        onClick={() => taskDone(task)}
                    >
                        {state ? "Completed" : "Pending"}
                    </button>


                </div>
                {admin && (
                    <button
                        onClick={() => handleDeleteTask(task)}
                        className='bg-red-600 px-4 py-3 text-white font-bold text-sm rounded-lg'
                    >
                        Delete
                    </button>
                )}

            </div>
        </div>
    )
}

export default Task