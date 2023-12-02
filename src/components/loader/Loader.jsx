import { ClipLoader } from 'react-spinners';

const Loader = ({ extra }) => {
   return (
      <div className={`layer ${extra} flex justify-center items-start h-full min-h-screen gap-1 bg-transparent`}>
         <ClipLoader color="green" size={22} />
         <p>Loading...</p>
      </div>
  )
}

export default Loader