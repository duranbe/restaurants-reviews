import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Favorites() {

  var favoritesRestaurant = JSON.parse(localStorage.getItem("favorites"));
  if(favoritesRestaurant)
  {return (
    <div className='flex flex-row'>

      <div className='my-8 px-8 py-4 basis-1/2'>
        {favoritesRestaurant.map(item => <FavRestaurantCard key={item} propsId={item} />)}
      </div>
      <div className='px-8 md:basis-1/3 xs:basis-0' >
        <img className="" src="./svg/DrawKit-cooking-kitchen-food-vector-illustrations-15.svg" alt="cooking kitchen shelf"></img>
      </div>

    </div>

  )}else{
    return (<div></div>)
  }


}


function FavRestaurantCard({ propsId }) {
  const [data, setData] = useState(null);



  useEffect(() => {
    const apiURL = "http://" + process.env.REACT_APP_API + "/get_restaurant"
    const fetchData = async () => {

      axios.get(apiURL, {
        params: {
          restaurantId: propsId
        }
      }).then(function (response) {

        setData(response.data.restaurantData)

      }).catch(function (error) {
        console.log(error)
      })
    };

    fetchData();
  }, [propsId]);

  if (data) {

    const restaurantUrl = "/ri/" + propsId

    return (
      <div>
        <div className='font-clash-semibold text-3xl py-2 hover:underline underline-offset-2'>
          <a href={restaurantUrl}>{data.Name}</a>
        </div>
      </div>

    );
  } else {
    return (<div className='font-clash-regular'>Loading</div>);
  }
}