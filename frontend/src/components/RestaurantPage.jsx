import React from 'react';
import {useParams} from "react-router-dom";
  

export default function RestaurantPage(){
     const {id} = useParams();
    return (
        <div>
            Gello {id}
        </div>
    )
}