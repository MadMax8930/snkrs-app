"use client";
import React, { useState } from 'react';
import { Filter, Search, Sneakers } from '@/components';
import useFilterSneakers from '@/hooks/useFilterSneakers';

export default function Home() {
   const containerWidth = { width: '-webkit-fill-available' };

   const [param1, setParam1] = useState('');
   const [param2, setParam2] = useState('');
   const [param3, setParam3] = useState('');
   const { data: filteredSnkrs, isLoading: isLoadingFilteredSnkrs } = useFilterSneakers(param1, param2, param3);
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-full" style={containerWidth}>
         <div className="mt-[4em] p-[2em] pb-0 text-xs md:text-base xl:text-lg md:pt-1 xl:pt-2">
            <Search sneakers={filteredSnkrs} isLoadingSearched={isLoadingFilteredSnkrs} />
            <Filter
               resellQuery={param1} setResellQuery={setParam1}
               brandQuery={param2} setBrandQuery={setParam2}
               dateQuery={param3} setDateQuery={setParam3} 
            />
         </div>
         <Sneakers sneakerDropsFiltered={filteredSnkrs} isLoadingFiltered={isLoadingFilteredSnkrs} />
      </div>
    </main>
  )
}