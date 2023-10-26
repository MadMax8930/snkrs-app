import Image from 'next/image';
import { sneakerDrops } from '../../../sneakers';

const FetchSnkrs = () => {
   if (!sneakerDrops || sneakerDrops.length === 0) {
      return <p>No sneakers found.</p>
   }

  return (
    <div>
      <h1>Sneakers</h1>
      <ul>
        {sneakerDrops.map((sneaker) => (
          <li key={sneaker.id}>
            <Image src={sneaker.img} width={20} height={20} alt={sneaker.name} />
            <p>Name: {sneaker.name}</p>
            <p>Model: {sneaker.model}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchSnkrs


export async function getServerSideProps() {
   const filePath = path.join(process.cwd(), 'sneakers.json');
   try {
     const jsonContent = await fs.readFile(filePath, 'utf-8');
     const sneakers = JSON.parse(jsonContent);
     console.log(sneakers);
     return {
       props: { sneakers },
     };
   } catch (error) {
     console.error('Error reading sneakers data:', error);
     return {
       props: { sneakers: [] },
     };
   }
   
 }
 