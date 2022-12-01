import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function RestaurantPage() {
    const { id } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/get_restaurant', {
            params: {
                restaurantId: id
            }
        }).then(function (response) {
            setIsLoaded(true)

            console.log(response.data)
            setItems(response.data.restaurantData)

        }).catch(function (error) {
            console.log(error);
        })





    }, [id])

    if (!isLoaded) {
        return (<div>Loading...</div>)
    } else {
        return (
            <div className='container my-8 mx-8'>
                <div className='font-clash-semibold  text-2xl  underline underline-offset-8  py-4 '>
                    {items.Name}
                </div>
                <div className='font-clash-medium pl-4 font-thin text-lg'>
                    <div className='py-1'>
                        {items.Type}
                    </div>
                    <div className='py-1'>
                        {items["Street Address"] + " " + items.Location}
                    </div>
                    <div className='py-1'>
                        {"Reviews :" + items.Reviews}
                    </div>
                    <div className='py-1'>
                        {"Price Range :  " + items.Price_Range}
                    </div>


                    <div className='flex flex-row space-x-3 pl-2'>
                        <div className='bg-tangerine rounded-lg text-xl w-max px-4 mt-4 py-1 text-white'>
                            Menu
                        </div>
                        <div className='bg-tangerine rounded-lg text-xl w-max px-4 mt-4 py-1 text-white'>
                            TripAdvisor
                        </div>
                        <div className='bg-tangerine rounded-lg text-xl w-max px-4 mt-4 py-1 text-white'>
                            Google Maps
                        </div>
                    </div>

                    <div className='flex flex-col space-x-3 pt-4 pl-2'>
                        <div className='text-xl font-clash-semibold text-slate-600 my-2'>Comments</div>

                        <div>{items.Comments}</div>
                    </div>
                </div>


            </div>


        )
    }




}