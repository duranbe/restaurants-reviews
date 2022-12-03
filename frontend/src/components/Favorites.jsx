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
                console.log(response.data.restaurantData)

            }).catch(function (error) {
                console.log(error);
            })
      };
  
      fetchData();
    }, [propsId]);
  
    if (data) {
      return (<div>{data.Name}</div>);
    } else {
      return (<div>Loading </div>);
    }
  }