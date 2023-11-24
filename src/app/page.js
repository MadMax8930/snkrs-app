"use client";
import React, { useState, useEffect } from 'react';
import { Filter, Search, Sneakers, LoaderLayer, Navbar, Footer } from '@/components';
import useFilterSneakers from '@/hooks/useFilterSneakers';
import useSneakers from '@/hooks/useSneakers';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';
import { fetchServerData as _serverData } from './ssr';

function Home({ initialSneakersData }) {
   
   const containerWidth = { width: '-webkit-fill-available' };
  
   const [param1, setParam1] = useState('');
   const [param2, setParam2] = useState('');
   const [param3, setParam3] = useState('');
   const { data: filteredSnkrs, isLoading: isLoadingFiltered } = useFilterSneakers(param1, param2, param3);
   const { data: sneakerDrops, isLoading: isLoadingPublic } = useSneakers();
   const [isHomeLoading, setIsHomeLoading] = useState(true);

   useEffect(() => {
      if (!isLoadingFiltered || !isLoadingPublic) { 
         setIsHomeLoading(false); 
      }
   }, [isLoadingFiltered, isLoadingPublic]);

   if (isHomeLoading) { return <LoaderLayer /> }
 
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  )
}

Home.getInitialProps = async (ctx) => {
   const { initialSneakersData } = await _serverData(ctx.req);
 
   return { initialSneakersData };
};

export default withTokenCleanup(Home)
