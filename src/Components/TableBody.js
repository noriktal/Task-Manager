import { useSelector, useDispatch } from "react-redux";
import {  selectSortedFilteredTasks, selectClickedTask, selectOffsprings } from "../Redux/selectors";
import { useState } from "react";
import TableRow from "./TableRow";


const TableBody = () => {

    const sortedFilteredTasks = useSelector(selectSortedFilteredTasks);
    const clickedTaskID = useSelector(selectClickedTask);
    const offspringsArr = useSelector(selectOffsprings);

    //const [rowID, setRowID] = useState("");


    console.log("offspringsArr",offspringsArr);
    return (
            <tbody>
                {sortedFilteredTasks?.map((task, i, arr) => {


                    // let parent; 
                    // let grandParent;
                    // if(rowID !== "" && task.pid){
                    //     parent = arr.find(item => item.id === task.pid);
                    //     if(parent?.pid){
                    //     grandParent = sortedFilteredTasks.find(item => item.id === parent.pid);
                    //     }
                    // }

                        return(
                            (!offspringsArr.includes(task.id)) ?
                            
                                 <TableRow 
                                 task={task}
                                 i={i}
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