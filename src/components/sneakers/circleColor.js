export function getBgColor(resellIndex) {
   switch (resellIndex) {
     case 'mauvais':
       return 'red';
     case 'excellent':
       return 'blue';
     case 'moyen':
       return 'gold';
     case 'bon':
       return 'limegreen';
     default:
       return 'pink';
   }
}