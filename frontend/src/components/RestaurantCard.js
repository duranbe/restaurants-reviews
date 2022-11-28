
export default function RestaurantCard({ restaurantData }) {

    return (
      <div className="my-3 p-3 hover:cursor-pointer hover:border-l-black hover:border-l-2 rounded-sm">
  
        <div className="underline underline-offset-[3px]   text-xl font-clash-medium hover:italic cursor-pointer">
          {restaurantData.Name}
        </div>
        <div className='font-clash-medium pl-3 font-thin text-lg'>
          {restaurantData.Type}
        </div>
        <div className='font-clash-medium pl-3 font-thin text-lg'>
          {restaurantData["Street Address"]}
        </div>
        <div className='font-clash-medium pl-3 font-thin text-lg'>
          {restaurantData.Location}
        </div>
        <div className='font-clash-medium pl-3 font-thin text-lg'>
          {"Reviews :  " + restaurantData["Reviews"]}
        </div>
        <div className='font-clash-medium pl-3 font-thin text-lg'>
          {restaurantData["Price_Range"]}
        </div>
      </div>
    )
  }
  