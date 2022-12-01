import Loading from './Loading';
import SearchResult from './SearchResult';
import LandingPage from './LandingPage';
import axios from 'axios';
import { useState } from 'react';
import '../App.css';


export default function Home() {

    const [data, setData] = useState({ data: [] });
    const [isVegan, setVegan] = useState(false);
    const [isNewYork, setNewYork] = useState(false);

    const [isLoading, setLoadingState] = useState(false);
    const [isLandingPage, setLandingPage] = useState(true);


    function toggleVegan(element) {
        setVegan(element.target.checked);
    }

    function toggleNewYork(element) {
        setNewYork(element.target.checked);
    }

    function handleKeyPress(e) {

        setData({ data: [] })


        if (e.key === "Enter" || e.type === "click") {

            setLoadingState(true);
            setLandingPage(false);

            let searchValue;
            if (e.type === "click") {
                searchValue = document.getElementById("search-bar").value;
            } else {
                searchValue = e.target.value;
            }

            axios.get('http://localhost:8000/search', {
                params: {
                    keyword: searchValue,
                    vegan: isVegan,
                    nyc: isNewYork,
                }
            }).then(function (response) {
                setLoadingState(false)
                setData({ data: response.data });
                console.log(response.data)

            }).catch(function (error) {
                    console.log(error);
            })

        }

    }

    return (
<div>
        <div className="mt-4 mb-2 mx-10">
            <label className="relative block font-light text-xl5">

                <input autoComplete="off" id="search-bar" onKeyPress={handleKeyPress} className="h-12 font-clash-regular 
          placeholder:italic
          
          placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md
            p-2 shadow-sm focus:outline-none focus:border-sky-500 
            focus:ring-sky-500 focus:ring-1 text-lg font-light" placeholder="Search for anything..." type="text" name="search" />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleKeyPress}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </span>
            </label>
            <div className="flex items-center mt-2 ml-3">
                <div className="flex mx-1 ">
                    <input type="checkbox" id="choose-me" className="peer hidden" onChange={toggleVegan} />
                    <label htmlFor="choose-me" className="select-none cursor-pointer rounded-lg border-1
            py-1 px-2 font-clash-medium transition-colors duration-100 ease-in-out
            bg-tangerine text-gray-50 text-m border-2 
          peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-slate-400">Vegan</label>
                </div>
                <div className="flex mx-1">
                    <input type="checkbox" id="choose-nyc" className="peer hidden" onChange={toggleNewYork} />
                    <label htmlFor="choose-nyc" className="select-none cursor-pointer rounded-lg border-1
            py-1 px-2 font-clash-medium transition-colors duration-100 ease-in-out
            bg-tangerine text-gray-50 text-m border-2 
          peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-slate-400">New York City</label>
                </div>
            </div>

        </div>

      {isLandingPage && <LandingPage></LandingPage> }

    { isLoading && <Loading></Loading> }

    { !isLoading && !isLandingPage && <SearchResult data={data}></SearchResult> }
      
    </div>
    )
}