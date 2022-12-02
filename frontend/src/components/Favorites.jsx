import React from 'react';




export default function Favorites() {

    var favoritesRestaurant = JSON.parse(localStorage.getItem("favorites"));

    return (
        <div className='my-8 mx-auto px-8 py-4'>
            {favoritesRestaurant.map(item => <h1 key={item}>{item}</h1>)}
        </div>

    )
}