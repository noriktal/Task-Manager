import styles from "../Styles/MainComp.module.css";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

function MainComp() {
    
    return (
      <main className={styles.main}>
        <table className={styles.table}>
          <thead>
            <TableHeader />
          </thead>
            <TableBody />
        </table>
      </main>
    );
}
  
export default MainComp;