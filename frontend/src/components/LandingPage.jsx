import Description from "./Description";

export default function LandingPage() {

    return (
        <div className='flex flex-col items-center'>

            <div className='text-black font-clash-semibold text-2xl sm:text-3xl md:text-5xl mx-8 mt-1 xl:mt-2 z-0 underline underline-offset-4 decoration-tangerine decoration-4' >
                <div>Find your next favorite place </div>

            </div>
            <div className='text-black font-clash-medium text-xl mx-8 z-20' >
                <div>Discover exquisites restaurants thanks to our reviews-powered search engine</div>
            </div>

            <div className='container flex flex-col justify-center relative sm:max-w-3xl lg:max-w-4xl 3xl:max-w-5xl '>
                <img className="z-20" src="/svg/DrawKit-cooking-kitchen-food-vector-illustrations-03.svg" alt="kitchen img"></img>
                <div className='blob absolute sm:h-16 sm:w-26 animate-slow-translate bg-tangerine z-10  bottom-80 left-10  md:h-[15rem] md:w-[15rem]'></div>
                <div className='blob absolute  bg-yellow-light z-10 
               
                sm:bottom-[5rem] sm:left-[5rem] 
                md:top-[20rem] md:left-[40rem] 
                
                md:h-[18rem] md:w-[18rem] 
                sm:h-0 sm:w-0 animate-slow-translate-rotate '></div>
            </div>

            <Description />


        </div>
    )
}