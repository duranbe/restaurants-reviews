import RestaurantCard from "./RestaurantCard"

export default function SearchResult({ data }) {


    if (data.data.length === 0) {
        return (

            <div className='flex flex-col items-center my-12'>
                <div className="font-clash-medium text-xl text-black">Nothing found :(</div>
            </div>

        )
    } else {

        return (

            <div className='flex flex-col items-center'>
                <div className='container flex flex-col justify-center relative max-w-4xl'>
                    <div className='absolute blob bg-tangerine z-10  top-40 left-10  h-[15rem] w-[15rem]  sm:h-0 sm:w-0 m-0 p-0'></div>
                    <div className='absolute blob bg-yellow-light rotate-90 z-10  top-96 left-2/3  h-0 w-0  md:h-[20rem] md:w-[20rem] m-0 p-0'></div>
                    <div className=' text-black mx-8 pl-12 z-20'>
                        {data.data.filter((val) => val.normalizedScore > 0.5).map((val) => (<RestaurantCard key={val.id} restaurantData={val} />))}
                    </div>

                </div>
            </div>
        )

    }


}