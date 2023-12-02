const translations = {
   resellIndex: {
     'bon': 'good',
     'moyen': 'average',
     'mauvais': 'bad',
   },
   resellPrice: {
     'Aucun resell': 'No resell',
   },
};
 
 export const translateProperty = (type, value) => {
   return translations[type][value] || value;
};