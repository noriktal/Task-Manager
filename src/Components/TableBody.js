import { useSelector } from "react-redux";
import {  selectSortedFilteredTasks } from "../Redux/selectors";
import { useState } from "react";
import TableRow from "./TableRow";


const TableBody = () => {

    const sortedFilteredTasks = useSelector(selectSortedFilteredTasks);
    const [rowID, setRowID] = useState("");

    
    return (
            <tbody>
                {sortedFilteredTasks?.map((task, i, arr) => {
                    let parent; 
                    let grandParent;
                    if(rowID !== "" && task.pid){
                        parent = arr.find(item => item.id === task.pid);
                        if(parent?.pid){
                        grandParent = sortedFilteredTasks.find(item => item.id === parent.pid);
                        }
                    }

                        return(
                            (task.pid !== rowID && grandParent?.id !== rowID) ?
                            
                                 <TableRow 
                                 task={task}
                                 i={i}
                                 rowID={rowID}
                                 setRowID={setRowID}
                                 key={task.id}
                                 />
                             
                             :
                             <tr key={task.id}></tr>
                        )
                }
                    
              )}
            </tbody>
        )
}

export default TableBody;