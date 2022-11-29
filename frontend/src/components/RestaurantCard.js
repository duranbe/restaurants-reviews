
export default function RestaurantCard({ restaurantData }) {

  return (
    <div className="my-3 p-5 hover:cursor-pointer font-clash-medium hover:border-l-black hover:border-l-2 flex flex-row">
      <div className="basis-1/2">
        <div className="underline underline-offset-[3px] text-xl hover:italic cursor-pointer">
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

      <div className="basis-2/3 pt-3">
        <div className="text-tangerine text-xl font-clash-bold">Comment</div>
        <div className="font-clash-ligth">{restaurantData["Comments"]}</div>
       
       
      </div>
    </div>
  )
}
