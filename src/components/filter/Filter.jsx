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
         <select id="1" title="Filter by Resell" value={resellQuery} onChange={(e) => handleResellChange(e.target.value)}>
            {resellFilterArr.map((resell, index) => (<option key={index} value={resell}>{resell}</option>) )}
         </select> <label htmlFor="1">By Resell</label>
      </div>
      <div className={styles.filterBlock}>
         <select id="2" title="Filter by Brand" value={brandQuery} onChange={(e) => handleBrandChange(e.target.value)}>
           {brandFilterArr.map((brand, index) => (<option key={index} value={brand}>{brand}</option>) )}
         </select> <label htmlFor="2">By Brand</label>
      </div>
      <div className={styles.filterBlock}>
         <select id="3" title="Filter by Date" value={dateQuery} onChange={(e) => handleDateChange(e.target.value)}>
            {dateFilterArr.map((date, index) => (<option key={index} value={date}>{date}</option>) )}
         </select> <label htmlFor="3">By Date</label>
      </div>
    </div>
  )
}

export default Filter