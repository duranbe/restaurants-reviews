import React from 'react';


export default function Footer() {

  const githubURL = "https://github.com/duranbe/restaurants-reviews"
  const devtoURL = process.env.REACT_APP_DEVTO

  return (
    <footer className='bottom-0 w-full'>
      <div className='font-clash-extralight text-xl font-bold text-center mt-10 mb-2 flex flex-row justify-center'>
        <div className='px-4 hover:underline underline-offset-4'><a href={githubURL}>Github</a></div>
        <div className='px-4 hover:underline underline-offset-4'><a href={devtoURL}>Dev.to</a></div>

      </div>

    </footer>


  )
}