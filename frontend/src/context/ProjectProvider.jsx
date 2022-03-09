import { useState, useEffect, createContext } from "react";
// import io from 'socket.io-client'
import clientAxios from "../config/clientAxios";
const ProjectContext = createContext();
import io from "socket.io-client";

let socket;

const ProjectProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalFormTask, setModalFormTask] = useState(false);
    const [task, setTask] = useState({});
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const [collaborator, setCollaborator] = useState({});
    const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clientAxios.get('/projects', config);
                // console.log(res)
                setProjects(data);
            } catch (error) {
                console.log(error);
            }
        }

        getProjects();
    }, []);

    useEffect(() => {
        // socket = io(import.meta.env.VITE_BACKEND_URL);
    }, []);

    // useEffect(() => {
        
    // });



    const editProjetc = async (project) => {
        console.log('edit project');
        console.log(project);
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.put(`/projects/${project.id}`, project, config);
            console.log(data)

            const projectsUpdated = projects.map(proj => proj._id === data._id ? data : proj);
            setProjects(projectsUpdated);

        } catch (error) {
            console.log(error)
        }
    }

    const newProject = async (project) => {
        console.log('desde newProject')
        console.log(project);
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post('/projects', project, config);
            setProjects([...projects, data.data])
        } catch (error) {
            console.log(error)
        }
    }

    const submitProject = async (project) => {
        // console.log(project)
        // editProjetc(project)
        if (project.id) {
            // console.log('edit')
            await editProjetc(project)
        } else {
            // console.log('new')
            await newProject(project)
        }

    }

    const getProject = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.get(`/projects/${id}`, config);
            setProject(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTask = () => {

        setModalFormTask(!modalFormTask)
        // setTask({})
        setTask({
            name: '',
            description: '',
            priority: 'Low',
            deadline: ''
        })
    }

    const deleteProject = async (id) => {
        console.log('delete id', id);
        console.log(id)
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.delete(`/projects/${id}`, config);
            // console.log(data.response)
            const projectsUpdated = projects.filter(proj => proj._id !== id);
            setProjects(projectsUpdated);
        } catch (error) {
            console.log(error)
        }
    }


    const handleModalEditTask = task => {
        // console.log(task)
        setModalFormTask(true)
        setTask(task)

    }

    const newTask = async (task) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            console.log('taskkkkk nuevo')
            const { data } = await clientAxios.post(`/tasks`, task, config);
            console.log(data)

            const projectUpdated = { ...project };
            projectUpdated.tasks = [...projectUpdated.tasks, data];
            setProject(projectUpdated)
            setModalFormTask(false)

            //SOCKET IO

            // socket.emit('nueva tarea', data)

        } catch (error) {
            console.log(error)

        }
    }

    const editTask = async (task) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);
            console.log(data.data)
            console.log(data)

            // add task to state

            const projectUpdated = { ...project };
            projectUpdated.tasks = projectUpdated.tasks.map(taskState => taskState._id === data.data._id ? data.data : taskState);
            setProject(projectUpdated)
            setModalFormTask(false)
        } catch (error) {
            console.log(error)
        }
    }

    const submitTask = async (task) => {
        // return console.log(task)
        if (task?.id) {
            editTask(task)
        } else {
            await newTask(task)
        }

    }


    const handleDeleteTask = async task => {
        setTask(task)
        setModalDeleteTask(!modalDeleteTask)
    }

    const deleteTask = async (task) => {
        // return console.log(a)
        // console.log('delete task', task);
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.delete(`/tasks/${task._id}`, config);
            console.log(data)

            setModalDeleteTask(false)

            // add task to state

            const projectUpdated = { ...project };

            projectUpdated.tasks = projectUpdated.tasks.filter(taskState => taskState._id !== task._id);
            // await 
            setProject(projectUpdated)
            setTask({
                name: '',
                description: '',
                priority: 'Low',
                deadline: ''
            })

        } catch (error) {
            console.log(error)
        }
    }


    // COLLABORATORS

    const submitCollaborator = async (email) => {

        console.log(email)

        // TODO: PONER QUE CARGA
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // console.log('data')
            const { data } = await clientAxios.post(`/projects/collaborators`, { email }, config);
            setCollaborator(data)
            alert('Colaborador encontrado')
        } catch (error) {
            console.log(error)

            alert('Error al buscar el colaborador')
        }
        // TODO: SACAR QUE CARGA CON FINALLY
    }

    const addCollaborator = async (email) => {
        // console.log(email)

        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // console.log('data')
            const { data } = await clientAxios.post(`/projects/collaborators/${project._id}`, email, config);
            alert(data.msg)
            console.log(data)

            setCollaborator({})
        } catch (error) {

            console.log(error)
            console.log(error.response.data.msg)
            alert(error.response.data.msg)

        }

        // console.log(req.body)
    }

    const handleDeleteCollaborator = async (collaborator) => {
        // console.log(collaborator)
        setModalDeleteCollaborator(!modalDeleteCollaborator)
        setCollaborator(collaborator)
    }

    const deleteCollaborator = async () => {
        // console.log(collaborator)
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // console.log('data')

            const { data } = await clientAxios.post(`/projects/remove-collaborator/${project._id}`, { id: collaborator._id }, config);
            console.log(data)

            const projectUpdate = { ...project };

            projectUpdate.collaborators = projectUpdate.collaborators.filter(collaboratorState => collaboratorState._id !== collaborator._id);

            setProject(projectUpdate)

            // alert(data.msg)
            setCollaborator({})
            setModalDeleteCollaborator(!modalDeleteCollaborator)

        } catch (error) {
            console.log(error)
            console.log(error.response)
        }
    }

    const taskDone = async task => {
        // console.log('task', task)

        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post(`/tasks/state/${task._id}`, {}, config);

            // console.log(data)

            const projectUpdate = { ...project };

            projectUpdate.tasks = projectUpdate.tasks.map(taskState => taskState._id === task._id ? data.data : taskState);

            setProject(projectUpdate)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = async (e) => {
        setSearch(!search)
    }

    // SOCKET IO FUNCTIONS

    const submitTasksProject = (task) => {
        // add task to state
        console.log('provider task', task)
        const projectUpdated = { ...project };
        projectUpdated.tasks = [...projectUpdated.tasks, task];
        setProject(projectUpdated)
    }
    
    return (
        <ProjectContext.Provider
            value={{
                projects,
                submitProject,
                getProject,
                project,
                loading,
                editProjetc,
                deleteProject,
                modalFormTask,
                handleModalTask,
                submitTask,
                handleModalEditTask,
                task,
                handleDeleteTask,
                modalDeleteTask,
                deleteTask,
                submitCollaborator,
                collaborator,
                addCollaborator,
                handleDeleteCollaborator,
                modalDeleteCollaborator,
                deleteCollaborator,
                taskDone,
                handleSearch,
                search,
                submitTasksProject

                // setModalDeleteCollaborator,

            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export { ProjectProvider }

export default ProjectContext;