"use client";
import React, { useState, useEffect } from 'react';
import { Filter, Search, Sneakers, LoaderLayer, Navbar, Footer } from '@/components';
import useFilterSneakers from '@/hooks/useFilterSneakers';
import useSneakers from '@/hooks/useSneakers';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';
   
function Home() {   
   const containerWidth = { width: '-webkit-fill-available' };
   const [params, setParams] = useState({param1: '', param2: '', param3: ''});
   const { data: filteredSnkrs, isLoading: isLoadingFiltered } = useFilterSneakers(params.param1, params.param2, params.param3);
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
       <section>
          <Navbar />
          <main className="flex min-h-screen flex-col items-center justify-between">
             <div className="h-full layer-full" style={containerWidth}>
               <div className="mt-[4em] p-[2em] pb-0 text-xs md:text-base xl:text-lg md:pt-1 xl:pt-2">
                  <Search sneakers={filteredSnkrs} isLoadingFiltered={isLoadingFiltered} />
                  <Filter
                     resellQuery={params.param1}
                     brandQuery={params.param2}
                     dateQuery={params.param3}
                     setResellQuery={(value) => setParams({ ...params, param1: value })}
                     setBrandQuery={(value) => setParams({ ...params, param2: value })}
                     setDateQuery={(value) => setParams({ ...params, param3: value })}
                  />
               </div>
               <Sneakers 
                  sneakerDrops={sneakerDrops} isLoadingPublic={isLoadingPublic}
                  sneakerDropsFiltered={filteredSnkrs} isLoadingFiltered={isLoadingFiltered} 
               />
             </div>
          </main>
       </section>
       <Footer />
     </>
  )
}

export default withTokenCleanup(Home)
