import { resellFilterArr, brandFilterArr, dateFilterArr } from './selections';
import styles from './filter.module.css';

const Filter = ({ 
   resellQuery, setResellQuery, brandQuery, setBrandQuery, dateQuery, setDateQuery 
}) => {

   const handleResellChange = (option) => {
      if (option === resellFilterArr[0]) { setResellQuery(''); } else { setResellQuery(option); }
   };
  
   const handleBrandChange = (option) => {
      if (option === brandFilterArr[0]) { setBrandQuery(''); } else { setBrandQuery(option); }
   };
  
   const handleDateChange = (option) => {
      if (option === dateFilterArr[0]) { setDateQuery(''); } else { setDateQuery(option); }
   };

  return (
    <div className={styles.container}>
      <div className={styles.filterBlock}>
         <label htmlFor="resell">By Resell</label>
         <select id="resell" value={resellQuery} onChange={(e) => handleResellChange(e.target.value)}>
            {resellFilterArr.map((resell, index) => (<option key={index} value={resell}>{resell}</option>) )}
         </select>
      </div>
      <div className={styles.filterBlock}>
         <label htmlFor="brand">By Brand</label>
         <select id="brand" value={brandQuery} onChange={(e) => handleBrandChange(e.target.value)}>
           {brandFilterArr.map((brand, index) => (<option key={index} value={brand}>{brand}</option>) )}
         </select>
      </div>
      <div className={styles.filterBlock}>
         <label htmlFor="date">By Date</label>
         <select id="date" value={dateQuery} onChange={(e) => handleDateChange(e.target.value)}>
            {dateFilterArr.map((date, index) => (<option key={index} value={date}>{date}</option>) )}
         </select>
      </div>
    </div>
  )
}

export default Filter