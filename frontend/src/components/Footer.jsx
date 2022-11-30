import React from 'react';


export default function Footer(){

    return (
        <div>

        
        <footer className='font-clash-extralight font-bold text-center my-12 flex flex-row justify-center '>
          <div className='px-4 hover:underline underline-offset-4'>About us</div>
          <div className='px-4 hover:underline underline-offset-4'><a href='https://github.com/duranbe/restaurants-reviews'>Github</a></div>
          <div className='px-4 hover:underline underline-offset-4'>Dev.to</div>
        </footer>
        <div className='font-clash-light bottom-0 pb-4'>
          Made by Benoit Durand
        </div>
        </div>
    )
}