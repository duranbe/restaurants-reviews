import './App.css';
import axios from 'axios';
import { useState } from 'react';



function RestaurantCard({ restaurantData }) {

  return (
    <div className="my-5">

      <div className="underline underline-offset-[3px]  font-clash-medium hover:italic cursor-pointer">
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
    <nav className="font-clash-bold border-gray-300 relative w-full flex flex-wrap items-center justify-between py-2 bg-gray-100">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-3 ">
        <a className="flex items-center text-2xl" href="/">
          CookReview
        </a>
      </div>
    </nav>
  )
}

function App() {

  const [data, setData] = useState({ data: [] });
  const [isVegan, setVegan] = useState(false);

  const [isLoading, setLoadingState] = useState(false);
  const [isLandingPage, setLandingPage] = useState(true);


  function toggleVegan(element) {
    setVegan(element.target.checked);
  }

  function handleKeyPress(e) {

    if (e.key === "Enter") {

      setLoadingState(true);
      setLandingPage(false);

      axios.get('http://localhost:8000/search', {
        params: {
          keyword: e.target.value,
          vegan: isVegan,
        }
      })
        .then(function (response) {


          setLoadingState(false)
          setData({ data: response.data });

        })
        .catch(function (error) {
          console.log(error);
        })

    }

  }



  return (
    <div className="mx-5">
      <NavBar />
      <div className="mt-4 mb-2 mx-10 ">
        <label className="relative block font-light text-xl5">

          <input onKeyPress={handleKeyPress} className="h-12 font-clash-regular placeholder:italic
          
           placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md
            p-2 shadow-sm focus:outline-none focus:border-sky-500 
            focus:ring-sky-500 focus:ring-1 sm:text-sm font-light" placeholder="Search for anything..." type="text" name="search" />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

          </span>
        </label>
        <div className="flex items-center mt-2 ml-3">
          <div className="flex">
            <input type="checkbox" id="choose-me" className="peer hidden" onChange={toggleVegan} />
            <label htmlFor="choose-me" className="select-none cursor-pointer rounded-lg border-1
            py-1 px-2 font-clash-medium transition-colors duration-100 ease-in-out
            bg-slate-500 text-gray-50 text-m border-2 hover:italic
           peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-slate-400">Vegan</label>
          </div>
        </div>

      </div>


      {isLandingPage &&
        <div className='flex flex-col justify-center items-center'>


          <div className='text-black font-clash-semibold text-5xl mx-8 my-2 underline underline-offset-4 decoration-tangerine decoration-2' >
            <div>Find your next favorite place </div>

          </div>
          <img className='max-w-5xl h-auto' src="./svg/DrawKit-cooking-kitchen-food-vector-illustrations-03.svg" alt="kitchen img"></img>


        </div>

      }

      {isLoading &&
        <div className='flex flex-col justify-center items-center'>

          <div className='animate-bounce-slow pt-32'>
            <img className='max-w-5xl h-96' src="svg/DrawKit-cooking-kitchen-food-vector-illustrations-12.svg" alt="img animation"></img>
          </div>
        </div>
      }
      <div className='flex flex-col'>
        <div className='text-black mx-8 pl-12'>
          {data.data.map((val) => (<RestaurantCard key={val.id} restaurantData={val} />))}
        </div>

      </div>
      <footer className='font-clash-regular text-center'>
        About us
      </footer>
    </div>

  );
}

export default App;
