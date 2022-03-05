import { useState, useEffect, createContext } from "react";

import clientAxios from "../config/clientAxios";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalFormTask, setModalFormTask] = useState(false);
    const [task, setTask] = useState({});
    const [modalDeleteTask, setModalDeleteTask] = useState(false);


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

            const {data} = await clientAxios.delete(`/projects/${id}`, config);
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

            // add task to state

            const projectUpdated = {...project};
            projectUpdated.tasks = [...project.tasks, data];

            setProject(projectUpdated)
            setModalFormTask(false)
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

            const projectUpdated = {...project};
            projectUpdated.tasks = projectUpdated.tasks.map(taskState => taskState._id === data.data._id ? data.data : taskState);
            setProject(projectUpdated)
            setModalFormTask(false)
        } catch (error) {
            console.log(error)
        }
    }    
    
    const submitTask = async (task) => {
        // return console.log(task)
        if(task?.id){
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

            const projectUpdated = {...project};

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
                deleteTask
                
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export { ProjectProvider }

export default ProjectContext;