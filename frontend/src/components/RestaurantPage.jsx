import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';


const svgPath = process.env.PUBLIC_URL + '/svg/icons/';

export default function RestaurantPage() {
    const { id } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasIcon, setIcon] = useState(false);
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
            if(response.data.restaurantData.icon.length>0){
                setIcon(true);
            }

        }).catch(function (error) {
            console.log(error);
        })


    }, [id])

    if (!isLoaded) {
        return (<div>Loading...</div>)
    } else {
        return (
            <div className='container my-8 mx-8 bg-orange-50 rounded-md px-8 py-4'>
                <div className='flex flex-row space-x-10 pt-4 '>

                    <div className='basis-1/2'>
                        <div className='font-clash-semibold  text-4xl underline underline-offset-4 decoration-tangerine decoration-4'>
                            {items.Name}
                        </div>
                        <div className='font-clash-medium pl-4 font-thin text-xl pt-4'>
                            <div className='py-1'>
                                {items.Type}
                            </div>
                            <div className=''>
                                {items["Street Address"]}

                            </div>
                            <div className=''>

                                {items["Location"]}
                            </div>
                            <div className='py-1'>
                                {"Reviews :" + items.Reviews}
                            </div>
                            <div className='py-1'>
                                {"Price Range :  " + items.Price_Range}
                            </div>
                        </div>
                    </div>



                    <div className='basis-1/2 flex flex-row justify-center pr-8 pt-6'>

                            { hasIcon &&  <Icon iconArray={items.icon}/>}


                    </div>

                </div>

                <div className='flex flex-col space-x-3 pt-4 pl-2'>
                    <div className='text-2xl font-clash-semibold text-black my-2'>Comments</div>
                    <div className='text-lg font-clash-medium text-stone-700'>{items.Comments}</div>
                </div>

                <div className='flex flex-row space-x-3 pl-2 font-clash-medium mt-8'>
                    <div className='bg-tangerine rounded-lg text-lg w-max px-4 mt-4 py-1 text-white'>
                        Menu
                    </div>
                    <div className='bg-tangerine rounded-lg text-lg w-max px-4 mt-4 py-1 text-white'>
                        TripAdvisor
                    </div>
                    <div className='bg-tangerine rounded-lg text-lg w-max px-4 mt-4 py-1 text-white'>
                        Google Maps
                    </div>
                </div>

            </div>


        )
    }

}


function Icon({ iconArray }) {

    const iconPath = iconArray[0].filename
    return (

        <div className='img_bg bg-tangerine-light rounded-full w-60 relative'>
            <img alt="icon" className="w-40 absolute top-0 left-0 right-0 bottom-0 m-auto p-1" src={`${svgPath}${iconPath}`}></img>
        </div>

    )
}