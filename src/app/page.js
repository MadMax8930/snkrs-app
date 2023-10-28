import { SearchSnkrs, Sneakers } from '@/components';

export default function Home() {
   const containerWidth = { width: '-webkit-fill-available' };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-full" style={containerWidth}>
         <SearchSnkrs />
         <Sneakers />
      </div>
    </main>
  )
}