import './App.css';
import axios from 'axios';
import { useState } from 'react';


function RestaurantCard({ restaurantData }) {

  return (
    <div  className="my-5">

      <div className="underline underline-offset-[3px]  font-clash-medium hover:italic">
        {restaurantData.Name}
      </div>
      <div className='font-clash-medium pl-3 font-thin text-sm'>
        {restaurantData.Type}
      </div>
      <div className='font-clash-medium pl-3 font-thin text-sm'>
        {restaurantData["Street Address"]}
      </div>
      <div className='font-clash-medium pl-3 font-thin text-sm'>
        {restaurantData.Location}
      </div>
      <div className='font-clash-medium pl-3 font-thin text-sm'>
        {restaurantData["Price_Range"]}
      </div>
    </div>
  )
}
function NavBar() {

  return (
    <nav className="font-clash-bold relative w-full flex flex-wrap items-center justify-between py-2 bg-gray-100">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-3 ">
        <a className="flex items-center" href="/">
          CookReview
        </a>
      </div>
    </nav>
  )
}

function App() {


  const [data, setData] = useState({ data: [] });


  function handleKeyPress(e) {

    if (e.key === "Enter") {

      axios.get('http://localhost:8000/search', {
        params: {
          keyword: e.target.value
        }
      })
        .then(function (response) {

          setData({ data: response.data });

        })
        .catch(function (error) {
          console.log(error);
        })

    }

  }
  //<!--

  return (
    <div className="mx-5">
      <NavBar />
      <div className="mt-4 mb-8 mx-10">
        <label className="relative block font-light">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

          </span>
          <input onKeyPress={handleKeyPress} className="font-clash-regular placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm font-light" placeholder="Search for anything..." type="text" name="search" />
        </label>
      </div>

      <div className='text-black mx-8 my-2'>
        {data.data.map((val) => (<RestaurantCard key={val.id} restaurantData={val} />))}
      </div>


    </div>
  );
}

export default App;
