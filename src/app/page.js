"use client";
import React, { useState } from 'react';
import { Filter, Search, Sneakers, LoaderLayer } from '@/components';
import useFilterSneakers from '@/hooks/useFilterSneakers';
import useSneakers from '@/hooks/useSneakers';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';
// import { sneakerDrops } from '../../sneakers'; // mock data

function Home() {
   const containerWidth = { width: '-webkit-fill-available' };
  
   const [param1, setParam1] = useState('');
   const [param2, setParam2] = useState('');
   const [param3, setParam3] = useState('');
   const { data: filteredSnkrs, isLoading: isLoadingFiltered } = useFilterSneakers(param1, param2, param3);
   const { data: sneakerDrops, isLoading: isLoadingPublic } = useSneakers();

   if (isLoadingFiltered || isLoadingPublic) { return <LoaderLayer /> }
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-full" style={containerWidth}>
         <div className="mt-[4em] p-[2em] pb-0 text-xs md:text-base xl:text-lg md:pt-1 xl:pt-2">
            <Search sneakers={filteredSnkrs} isLoadingFiltered={isLoadingFiltered} />
            <Filter
               resellQuery={param1} brandQuery={param2} dateQuery={param3}
               setResellQuery={setParam1} setBrandQuery={setParam2} setDateQuery={setParam3}
            />
         </div>
         <Sneakers 
            sneakerDrops={sneakerDrops} isLoadingPublic={isLoadingPublic}
            sneakerDropsFiltered={filteredSnkrs} isLoadingFiltered={isLoadingFiltered} 
         />
      </div>
    </main>
  )
}

export default withTokenCleanup(Home)