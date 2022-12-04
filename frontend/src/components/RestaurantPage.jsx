import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';


const svgPath = process.env.PUBLIC_URL + '/svg/icons/';
//const svg = process.env.PUBLIC_URL + '/svg/';

function StarIcon({id}) {

    var favs = JSON.parse(localStorage.getItem("favorites"));
    var isAlreadyFavorite = false
    for( var i = 0; i < favs.length; i++){ 
    
            if ( favs[i] === id){ 
                isAlreadyFavorite=true
            }
        
        } 
    const [isFavorite,setFavorite] = useState(isAlreadyFavorite)


    function handleOnClick() {
       

       if(isFavorite){
        var favs = JSON.parse(localStorage.getItem("favorites"));
        for( var i = 0; i < favs.length; i++){ 
    
            if ( favs[i] === id) { 
        
                favs.splice(i, 1); 
            }
        
        }
       
        localStorage.setItem("favorites",JSON.stringify(favs))
        }else{
    
  
        var favorites = JSON.parse(localStorage.getItem("favorites"));
        if(favorites){
            favorites.push(id)
        }else{
            favorites = [id]
        }

        localStorage.setItem("favorites",JSON.stringify(favorites))
       }

       setFavorite(!isFavorite)

       
    }


    if(!isFavorite){
        
    return (
        <div className='flex flex-col items-center justify-center p-4'>

       
        <svg onClick={() => { handleOnClick()}} className='h-8 w-8 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z" /></svg>
        </div>
    )

    }else{

        return(
            <div className='flex flex-col items-center justify-center p-4'>
            <svg onClick={() => { handleOnClick()}} className='h-8 w-8 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg>
            </div>
        )

    }





}



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
            if (response.data.restaurantData.icon.length > 0) {
                setIcon(true);
            }

        }).catch(function (error) {
            console.log(error);
        })


    }, [id])

    if (!isLoaded) {
        return (<div>Loading...</div>)
    } else {

        const googleMapLink = "https://www.google.com/maps/search/"+ items.Name+" "+items["Street Address"]+" "+items["Location"]
        const Review =  "Reviews : " + items.Reviews;
        return (
            <div className='container my-8 mx-auto px-8 py-4'>
                <div className='flex flex-row space-x-10 pt-4 whitespace-pre'>

                    <div className='basis-1/2'>
                        <div className='font-clash-semibold  text-4xl underline underline-offset-4 items-stretch decoration-tangerine decoration-4 flex flex-row'>
                            <div>{items.Name}</div>
                            <StarIcon id={id}/>
                        </div>
                        
                        <div className='font-clash-medium pl-4 font-thin text-xl pt-4'>
                            <div className='py-1'>
                                {items.Type}
                            </div>
                            <div className=''>
                                {items["Street Address"]}

                            </div>
                            <div className='py-1'>

                                {items["Location"]}
                            </div>
                            <div className='py-1 whitespace-pre'>
                               {Review}
                            </div>
                            <div className='py-1'>
                                {"Price Range : " + items.Price_Range}
                            </div>
                        </div>
                    </div>



                    <div className='basis-1/2 flex flex-row justify-center pr-8 pt-6'>

                        {hasIcon && <Icon iconArray={items.icon} />}


                    </div>

                </div>

                <div className='flex flex-col space-x-3 pt-4 pl-2'>
                    <div className='text-2xl font-clash-semibold text-black my-2 whitespace-normal'>Comments</div>
                    <div className='text-lg font-clash-medium text-stone-700'>{items.Comments}</div>
                </div>

                <div className='flex flex-row space-x-3 pl-2 font-clash-medium mt-8'>
                    
                    <div className='bg-tangerine rounded-lg text-lg w-max px-4 mt-4 py-1 text-white'>
                        <a href={items["Trip_advisor Url"]}>Tripadvisor</a>
                    </div>
                    <div className='bg-tangerine rounded-lg text-lg w-max px-4 mt-4 py-1 text-white'>
                        <a href={googleMapLink}>Google Maps</a>
                    </div>
                </div>

            </div>


        )
    }

}


function Icon({ iconArray }) {

    const iconPath = iconArray[0].filename
    return (

        <div className='img_bg bg-tangerine-light rounded-full w-60 h-60 relative'>
            <img alt="icon" className="w-40 absolute top-0 left-0 right-0 bottom-0 m-auto p-1" src={`${svgPath}${iconPath}`}></img>
        </div>

    )
}
