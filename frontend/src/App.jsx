import './App.css';
import React from "react";
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RestaurantPage from './components/RestaurantPage';
import Home from './components/Home';
import Footer from './components/Footer';
import Favorites from './components/Favorites'


function App() {

  return (

    
    <div className="mx-5">
      <NavBar />
      
      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/favorites' element={<Favorites/>}></Route>
          <Route path="ri/:id" element={<RestaurantPage />}></Route>
          
        </Routes>
      </BrowserRouter>
      <Footer/>
    
    </div>

  );
}

export default App;
