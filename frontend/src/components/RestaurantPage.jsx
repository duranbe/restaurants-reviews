import React from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';


export default function RestaurantPage() {
    const { id } = useParams();

    axios.get('http://localhost:8000/get_restaurant', {
        params: {
            restaurantId: id
        }
    }).then(function (response) {
        
        console.log(response.data)

    }).catch(function (error) {
        console.log(error);
    })
    return (
        <div>
            Gello {id}
        </div>
    )
}