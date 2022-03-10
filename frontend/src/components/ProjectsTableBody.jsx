import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
const ProjectsTableBody = ({ project }) => {
    console.log(project)
    let taskpending = project.tasks.filter(task => task.state === false).length
    let taskdone = project.tasks.filter(task => task.state !== false).length
    // console.log(taskpending)
    const { auth } = useAuth()
    const calculateDays = (currentDate, deadLine) => {
        let aDate1 = currentDate.split('/')
        let aDate2 = deadLine.split('/')

        let bDate1 = Date.UTC(aDate1[2], aDate1[1] - 1, aDate1[0]);
        let bDate2 = Date.UTC(aDate2[2], aDate2[1] - 1, aDate2[0]);
        let dif = bDate2 - bDate1;
        let days = Math.floor(dif / (1000 * 60 * 60 * 24));

        return days;
    }
    let pct = project.tasks.length !== 0 && (taskdone * 100 / project.tasks.length).toFixed()
    console.log(pct)
    const date = new Date();

    const hoy = date.getDate();
    const mesActual = date.getMonth() + 1;
    const year = date.getFullYear();

    // console.log(`${hoy}/${mesActual}/${year}`)

    let currenteDate = `${hoy}/${mesActual}/${year}`

    let deadLine = project.deadline.split('T')[0].split('-').reverse().join('/')

    // console.log(deadLine)
    // console.log(calculateDays(currenteDate,deadLine))
    let missingsDays = calculateDays(currenteDate, deadLine)
    return (
        <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
            <td className="pl-4 cursor-pointer">
                <div className="flex items-center">
                    <div className="w-10 h-10">
                        <img className="w-full h-full" src="https://cdn.tuk.dev/assets/templates/olympus/projects.png" />
                    </div>
                    <div className="pl-4">
                        <p className="text-[17px] flex">{project.name}</p>
                        <p className="text-xs leading-3 text-gray-600 pt-2">{project.client}</p>
                    </div>
                </div>
            </td>
            <td className="pl-12">
                <p className="text-sm font-medium leading-none text-gray-800">{pct}%</p>
                <div className="w-24 h-3 bg-gray-300 rounded-full mt-2" >
                    <div className="w-100 h-3 bg-indigo-700  rounded-full" style={{width: `${pct}%`}}/>
                </div>
            </td>
            <td className="pl-12">
                <p className="font-medium">{`${project.tasks.filter(task => task.state === true).length}/${project.tasks.length}`}</p>
                <p className={`text-xs leading-3 text-gray-600 mt-2`}>
                    {`${taskpending ? `${taskpending} tasks pending` : "No tasks pending"}`}
                </p>
            </td>
            <td className="pl-20">
                <p className="font-medium">{project.deadline.split('T')[0].split('-').reverse().join('.')}</p>
                <p className={`${missingsDays < 5 ? "text-red-600 font-bold animate-pulse" : "text-gray-600"} text-xs leading-3 mt-2`}>{`${missingsDays} days`}</p>
            </td>
            <td className="pl-20">
                <div className="flex items-center">
                    <img className="shadow-md w-8 h-8 rounded-full" src="https://cdn.tuk.dev/assets/templates/olympus/projects(8).png" />
                    <img className="shadow-md w-8 h-8 rounded-full -ml-2" src="https://cdn.tuk.dev/assets/templates/olympus/projects(9).png" />
                    <img className="shadow-md w-8 h-8 rounded-full -ml-2" src="https://cdn.tuk.dev/assets/templates/olympus/projects(10).png" />
                    <div className="shadow-md w-8 h-8 rounded-full -ml-2 text-center bg-indigo-700 text-white flex justify-center items-center">
                        <p className='p-2 md:p-2 lg:p-0' >{`+${project.collaborators.length}`}</p>
                    </div>
                </div>
            </td>
            <td className="text-center pl-16">
                <p className="text-sm font-medium leading-none text-gray-800">
                    {auth._id !== project.owner ? "Collaborator" : "Owner"}
                </p>
            </td>
            <td className="px-7 2xl:px-0 text-center pl-16">
                {/* <div className='flex justify-center items-center' > */}
                <Link to={project._id} className="text-sm w-full bg-indigo-700 py-4 text-center px-4 cursor-pointer rounded-lg text-white">View</Link>
                {/* </div> */}
            </td>
        </tr>
    )
}

export default ProjectsTableBody