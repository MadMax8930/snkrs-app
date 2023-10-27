import styles from './sneakers.module.css';

const Toggler = ({ cop }) => {
   const handleSwitcher = () => {}
  return (
    <div className={styles.toggler} onClick={handleSwitcher}
         style={
            cop 
            ? 
            { borderColor: "#53c28b" } 
            : 
            { borderColor: "#c72c2c" }}>
      <div className={styles.choice}>{cop ? "+COP" : ""}</div>
      <div className={styles.choice}>{!cop ? "DROP" : ""}</div>
      <div className={styles.copBall} 
           style={
            cop 
            ? 
            { right: "2px", backgroundColor: "#53c28b" } 
            : 
            { left: "2px", backgroundColor: "#c72c2c" }}>
      </div>
    </div>
  )
}

export default Toggler