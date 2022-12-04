import React from 'react';


export default function Footer(){

    return (
        <footer className='bottom-0 w-full'>
          <div className='font-clash-extralight text-xl font-bold text-center mt-10 mb-2 flex flex-row justify-center'>
          <div className='px-4 hover:underline underline-offset-4'>About us</div>
          <div className='px-4 hover:underline underline-offset-4'><a href='https://github.com/duranbe/restaurants-reviews'>Github</a></div>
          <div className='px-4 hover:underline underline-offset-4'>Dev.to</div>

          </div>
          
        </footer>
        
       
    )
}