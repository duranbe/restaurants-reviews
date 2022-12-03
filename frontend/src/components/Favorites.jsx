import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Favorites() {

    var favoritesRestaurant = JSON.parse(localStorage.getItem("favorites"));

        return (
            <div className='my-8 mx-auto px-8 py-4'>
                {favoritesRestaurant.map(item => <FavRestaurantCard key={item} propsId={item}/>)}
            </div>

        )

    


}


function FavRestaurantCard({propsId}) {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        console.log(propsId)
        axios.get('http://localhost:8000/get_restaurant', {
                params: {
                    restaurantId: propsId
                }
            }).then(function (response) {

                setData(response.data.restaurantData)
                
            }).catch(function (error) {
                
            })
      };
  
      fetchData();
    }, [propsId]);
  
    if (data) {
      return (
        <div>
             <div className='font-clash-semibold text-3xl py-2'>
                <a href={`http://localhost:3000/ri/${propsId}`}>{data.Name}</a>
            </div>
        </div>
     
      );
    } else {
      return (<div>Loading </div>);
    }
  }