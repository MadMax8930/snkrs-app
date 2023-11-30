import { ClipLoader } from 'react-spinners';

const Load = () => {
   return (
      <div className="flex justify-center bg-transparent items-start mt-8 min-h-full gap-1">
         <ClipLoader color="red" size={28} />
         <p className='text-xl'>Loading...</p>
      </div>
  )
}

export default Load