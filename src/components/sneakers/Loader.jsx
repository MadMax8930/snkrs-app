import { ClipLoader } from 'react-spinners';

const Loader = () => {
   return (
      <div className="flex justify-center items-start h-full min-h-screen gap-1">
         <ClipLoader color="green" size={22} />
         <p>Loading...</p>
      </div>
  )
}

export default Loader