
const svgPath = process.env.PUBLIC_URL + '/svg/';

export default function Loading() {
  return (<div className='flex flex-col justify-center items-center'>

    <div className='animate-bounce-slow pt-32'>
      <img className='max-w-5xl h-96' src={`${svgPath}DrawKit-cooking-kitchen-food-vector-illustrations-12.svg`} alt="img animation"></img>
    </div>
  </div>)
}