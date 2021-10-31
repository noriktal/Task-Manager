import styles from "../Styles/TableHeader.module.css";

const TableHeader = () => {

        return (
            <tr className={styles.row}>
              <th className={styles.titleCell}>Task</th>
              <th className={styles.titleCell}>Assignee</th>
              <th className={styles.titleCell}>Status</th>
              <th className={styles.titleCell}>Due Date</th>
            </tr>
        )
}

export default TableHeader;