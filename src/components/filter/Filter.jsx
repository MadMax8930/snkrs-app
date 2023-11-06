import { statusFilter, brandFilter, dateFilter } from './selections';
import styles from './filter.module.css';

const Filter = ({ 
   statusQuery, setStatusQuery, brandQuery, setBrandQuery, dateQuery, setDateQuery 
}) => {

   const handleStatusChange = (option) => {
      if (option === statusFilter[0]) { setStatusQuery(''); } 
      else { setStatusQuery(option); }
   };
  
   const handleBrandChange = (option) => {
      if (option === brandFilter[0]) { setBrandQuery(''); }
      else { setBrandQuery(option); }
   };
  
   const handleDateChange = (option) => {
      if (option === dateFilter[0]) { setDateQuery(''); }
      else { setDateQuery(option); }
   };

  return (
    <div className={styles.container}>
      <div className={styles.filterBlock}>
         <label htmlFor="resellIndex">By Resell</label>
         <select id="resellIndex" value={statusQuery} onChange={(e) => handleStatusChange(e.target.value)}>
            {statusFilter.map((status, index) => (
               <option key={index} value={status}>{status}</option>
            ))}
         </select>
      </div>
      <div className={styles.filterBlock}>
         <label htmlFor="brand">By Brand</label>
         <select id="brand" value={brandQuery} onChange={(e) => handleBrandChange(e.target.value)}>
           {brandFilter.map((brand, index) => (
               <option key={index} value={brand}>{brand}</option>
            ))}
         </select>
      </div>
      <div className={styles.filterBlock}>
         <label htmlFor="dateRelease">By Date</label>
         <select id="dateRelease" value={dateQuery} onChange={(e) => handleDateChange(e.target.value)}>
            {dateFilter.map((date, index) => (
               <option key={index} value={date}>{date}</option>
            ))}
         </select>
      </div>
    </div>
  )
}

export default Filter