import { useEffect } from "react";
import {  useDispatch } from "react-redux";
import { loadTasks, loadAssignees, loadStatuses } from "./Redux/actionCreators";

import dataTasks from "./Data/tasks.json";
import dataAssignees from "./Data/assignees.json";
import dataStatuses from "./Data/states.json";

import HeaderComp from "./Components/HeaderComp";
import MainComp from "./Components/MainComp";



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks(dataTasks.tasks));
    dispatch(loadAssignees(dataAssignees.assignees));
    dispatch(loadStatuses(dataStatuses.statuses));
  }, [])
  
  return (
    <div className="App">
      <HeaderComp />
      <MainComp />
    </div>
  );
}

export default App;
