import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProject from '../hooks/useProject'
import toast, { Toaster } from 'react-hot-toast'
const PRIORITY = ['Low', 'Medium', 'High']
import { useParams } from 'react-router-dom'
const ModalFormTask = () => {


    const { modalFormTask, handleModalTask, submitTask, task } = useProject();

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('Low');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [taskId, setTaskId] = useState(null);


    const { id } = useParams()
    // console.log(id)

    useEffect(() => {
        if (task._id) {
            setTaskId(task._id)
            setTaskName(task.name)
            setTaskDescription(task.description)
            setTaskPriority(task.priority)
            setTaskDeadline(task.deadline?.split('T')[0])
            return
        }

        setTaskName('')
        setTaskDescription('')
        setTaskPriority('Low')
        setTaskDeadline('')
        setTaskId(null)

        //      console.log(task)
    }, [task])

    const handleSubmit = e => {
        e.preventDefault()

        if ([taskName, taskDescription, taskPriority, taskDeadline].includes('')) {

            // alert('error todos los campos son requeridos')
            toast.error('error todos los campos son requeridos')

            return
        }

        const task = {
            name: taskName,
            description: taskDescription,
            priority: taskPriority,
            deadline: taskDeadline,
            project: id,
            id: taskId
        }
        submitTask(task)
        // console.log(task)

        setTaskName('')
        setTaskDescription('')
        setTaskPriority('Low')
        setTaskDeadline('')
        setTaskId(null)

    }


    return (
        <>

            <Toaster />
            <Transition.Root show={modalFormTask} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalTask}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={handleModalTask}
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>


                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                            {taskId ? "Edit Task" : "New Task"}
                                        </Dialog.Title>
                                        <form className='my-10' onSubmit={handleSubmit}>
                                            <div className='mt-5'>
                                                <label
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    htmlFor="taskName"

                                                >
                                                    Task Name
                                                </label>
                                                <input
                                                    id='taskName'
                                                    type='text'
                                                    placeholder='Task name'
                                                    className='border-2 border-purple-600 w-full p-2 mt-2 placeholder-gray-500 rounded-md focus:border-purple-700'
                                                    value={taskName}
                                                    onChange={(e) => setTaskName(e.target.value)}
                                                />
                                            </div>

                                            <div className='mt-5'>
                                                <label
                                                    className='text-gray-700 uppercase font-bold text-sm mt-5'
                                                    htmlFor="taskDescription"

                                                >
                                                    Task Description
                                                </label>
                                                <input
                                                    id='taskDescription'
                                                    type='text'
                                                    placeholder='Task Description'
                                                    className='border-2 border-purple-600 w-full p-2 mt-2 placeholder-gray-500 rounded-md focus:border-purple-700'
                                                    value={taskDescription}
                                                    onChange={(e) => setTaskDescription(e.target.value)}
                                                />
                                            </div>

                                            <div className='mt-5'>
                                                <label
                                                    className='text-gray-700 uppercase font-bold text-sm mt-5'
                                                    htmlFor="taskDeadline"

                                                >
                                                    Task Deadline
                                                </label>
                                                <input
                                                    id='taskDeadline'
                                                    type='date'
                                                    className='border-2 border-purple-600 w-full p-2 mt-2 placeholder-gray-500 rounded-md focus:border-purple-700'
                                                    value={taskDeadline}
                                                    onChange={(e) => setTaskDeadline(e.target.value)}
                                                />
                                            </div>

                                            <div className='mt-5'>
                                                <label
                                                    className='text-gray-700 uppercase font-bold text-sm mt-5'
                                                    htmlFor="taskPriority"

                                                >
                                                    Task Priority
                                                </label>

                                                <select
                                                    id='taskPriority'
                                                    className='border-2 border-purple-600 w-full p-2 mt-2 placeholder-gray-500 rounded-md focus:border-purple-700'
                                                    value={taskPriority}
                                                    onChange={(e) => setTaskPriority(e.target.value)}
                                                // defaultValue='Select Priority'
                                                >
                                                    <option disabled defaultValue='' >Select Priority</option>
                                                    {PRIORITY.map((priority) => (
                                                        <option key={priority} value={priority}>{priority}</option>
                                                    ))}
                                                </select>



                                            </div>

                                            <input
                                                className='p-3 text-white w-full bg-purple-600 rounded-md mt-5 cursor-pointer transition-colors duration-200 hover:bg-purple-700'
                                                type='submit'
                                                value={taskId ? "Edit Task" : "New Task"}
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default ModalFormTask