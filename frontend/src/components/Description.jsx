import axios from 'axios';
import { useState } from 'react';

export default function Description() {

  const [NbOfReviews, setNbOfReviews] = useState(2952);
  const apiURL = "http://" + process.env.REACT_APP_API + "/nb_doc"

  axios.get(apiURL)
    .then(function (response) {

      setNbOfReviews(response.data.nbDocuments)

    })
    .catch(function (error) {
      console.log(error);
    })

  return (

    <div className="text-slate-800 font-clash-medium text-center mx-2 my-2 text-xl z-20">
      Because finding a good place to eat is like finding a needle in a haystack, CookReview let you find hidden gems based on  <span className='text-tangerine font-clash-medium text-2xl'>{NbOfReviews}</span> customers reviews. </div>
  )
}