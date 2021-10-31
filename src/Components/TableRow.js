import styles from "../Styles/TableRow.module.css";
import { useSelector } from "react-redux";
import { selectAssigneesByTask } from "../Redux/selectors";
import StatusButton from "./StatusButton";


const TableRow = ({task, i, setRowID, rowID}) => {

    const taskAssignees = useSelector(selectAssigneesByTask);
    

    let date = new Date(task.data.dueData);
    let formattedDate1 = date.toDateString().substring(4)
    let formattedDate2 = formattedDate1.substring(0,6) + "," + formattedDate1.substring(6);

    const handleChildren = () => {
        rowID !== task.id ?  setRowID(task.id)
                          :  setRowID("");
    }
   

    return(
        <>
           
            <tr className={styles.tr} 
                key={task.id}>
                    <td className={`${styles.td} ${styles.tdTitle}`}
                    >  <span style={task.pid ? {paddingLeft: 30} : {}}>
                            {task.hasChildren ? 
                                <ion-icon 
                                    name="chevron-forward-outline" 
                                    style={(task.pid && task.id === rowID) ? 
                                        {paddingLeft: 20, color:`var(--electric-blue)`,fontSize: 18, paddingRight: 6, verticalAlign: "-20%"} :
                                        {color:`var(--electric-blue)`,fontSize: 18, paddingRight: 6, verticalAlign: "-20%", transform: `rotate(90deg)`}}
                                    onClick={handleChildren}
                                    >
                                </ion-icon>
                            : ""}
                            <span style={(!task.hasChildren && task.pid) ? {paddingLeft: 60}: {}}>
                                {task.data.title}
                            </span>
                        </span>
                    </td>
                    <td className={`${styles.td} ${styles.tdAssignees}`}>{taskAssignees[i].join(", ")}</td>
                    <td className = {`${styles.td} ${styles.tdStatus}`}>
                    <StatusButton 
                        status={task.data.status}
                        taskID={task.id}
                    />
                    </td>
                    <td className={`${styles.td} ${styles.tdDuedate}`}>{formattedDate2}</td>
            </tr>
        </>
    )
}

export default TableRow;