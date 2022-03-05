import React from 'react'
import useProject from '../hooks/useProject'

import PreviewProject from "../components/PreviewProject";

const Projects = () => {

  const { projects } = useProject();

  // console.log(projects);

  return (
    <>
      <h2 className='text-4xl font-black text-white'>
        Projects
      </h2>

      <div className='bg-white shadow mt-10 rounded-lg'>
        {projects.length ? (
          <>
            {projects.map(project => <PreviewProject project={project} key={project._id} />)}
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