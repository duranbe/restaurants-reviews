import './App.css';

import React from "react";

import NavBar from './components/NavBar';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RestaurantPage from './components/RestaurantPage';
import Home from './components/Home';

function App() {
  
  return (

    
    <div className="mx-5">
      <NavBar />
      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<Home/>}>
          
          </Route>
            
          
          <Route path="ri/:id" element={<RestaurantPage />}>
            
          </Route>
          
        </Routes>
      </BrowserRouter>
      <footer className='font-clash-extralight font-bold text-center my-12 flex flex-row justify-center '>
          <div className='px-4 hover:underline underline-offset-4'>About us</div>
          <div className='px-4 hover:underline underline-offset-4'><a href='https://github.com/duranbe/restaurants-reviews'>Github</a></div>
          <div className='px-4 hover:underline underline-offset-4'>Dev.to</div>
        </footer>
        <div className='font-clash-light fixed bottom-0 pb-4'>
          Made by Benoit Durand
        </div>
    </div>

  );
}

export default App;
