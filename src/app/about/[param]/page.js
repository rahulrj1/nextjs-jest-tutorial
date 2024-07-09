'use client';
import { useParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import DisplayBox from '../../Components/displayBox';

const About = () => {
  const router = useRouter();
  let path = usePathname();
  path = path.split('/')[1];
  // console.log(path);

  const { param } = useParams();
  console.log(param);

  return (
    <div>
      <h1 className="bg-black text-white p-2 flex justify-center">Nextjs jest tutorial</h1>

        <div className='p-2 m-2 border border-lg border-black'>
        <h2>This is the about page</h2>
        <div>Path of the page: <span>{path}</span> </div>
        <DisplayBox />

        </div>
      

      <button data-test="home-button" onClick={()=>{router.push('/')}} className="bg-black text-white p-2 m-2">Home</button>


    </div>
  )
}

export default About
