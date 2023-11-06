"use client";
import React, { useState } from 'react';
import { Filter, Search, Sneakers } from '@/components';
import useFilterSneakers from '@/hooks/useFilterSneakers';

export default function Home() {
   const containerWidth = { width: '-webkit-fill-available' };

   const [statusQ, setStatusQ] = useState('');
   const [brandQ, setBrandQ] = useState('');
   const [dateQ, setDateQ] = useState('');
   const { data: filteredDrops, isLoading: loadFiltered } = useFilterSneakers(statusQ, brandQ, dateQ);
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-full" style={containerWidth}>
         <div className="mt-[4em] p-[2em]">
            <Filter 
               statusQuery={statusQ} setStatusQuery={setStatusQ}
               brandQuery={brandQ} setBrandQuery={setBrandQ}
               dateQuery={dateQ} setDateQuery={setDateQ} 
            />
            <Search />
         </div>
         <Sneakers filteredDrops={filteredDrops} loadFiltered={loadFiltered} />
      </div>
    </main>
  )
}