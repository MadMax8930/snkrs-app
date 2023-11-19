export const formatDate = (isoDate) => {
   const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      hour12: false 
   };
   
   return new Date(isoDate).toLocaleString('en-GB', options).replace(/\,/g, ' /');
};