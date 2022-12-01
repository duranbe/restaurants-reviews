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
                    <div className='py-1'>
                        {"Menu :" + items.Menu}
                    </div>
                    <div className='py-1'>
                        {"Reviews : " + items["Trip_advisor Url"]}
                    </div>
                </div>


            </div>


        )
    }




}