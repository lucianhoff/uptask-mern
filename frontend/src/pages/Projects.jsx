import React, { useEffect, useState } from 'react'
import useProject from '../hooks/useProject'

import PreviewProject from "../components/PreviewProject";
import ProjectsTableBody from '../components/ProjectsTableBody';
const Projects = () => {

  const { projects } = useProject();
  const [show, setShow] = useState(null)
  return (
    <>
      <h2 className='text-4xl font-black text-white'>
        Projects
      </h2>

      <div className='bg-white shadow mt-10 rounded-lg'>
        {projects.length ? (
          <>
            {/* {projects.map(project => <PreviewProject project={project} key={project._id} />)} */}

            <div className="w-full sm:px-6">

              <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                <table className="w-full whitespace-nowrap">
                  <thead>
                    <tr className="h-16 w-full text-sm leading-none text-gray-800">
                      <th className="font-bold text-left pl-4 text-indigo-700">Project</th>
                      <th className="font-bold text-left pl-12 text-indigo-700">Progress</th>
                      <th className="font-bold text-left pl-12 text-indigo-700">Tasks</th>
                      <th className="font-bold text-left pl-20 text-indigo-700">Deadline</th>
                      <th className="font-bold text-left pl-20 text-indigo-700">Members</th>
                      <th className="font-bold text-indigo-700 pl-16">Permissions</th>
                      <th className="font-bold text-indigo-700 pl-16 text-center invisible">Viewxddddd</th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {projects.map(project => <ProjectsTableBody key={project._id} project={project} />)}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className='text-center py-5 font-bold text-xl'>
              There are no projects, start one!
            </p>
          </>
        )}
      </div>
    </>
  )
}

export default Projects
