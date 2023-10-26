import { FilterSearch, FetchSnkrs } from '@/components';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-full">
         <FilterSearch />
         <FetchSnkrs />
      </div>
    </main>
  )
}