import InputText from "./InputText";
import InputSelect from "./InputSelect";
import styles from "../Styles/HeaderComp.module.css"
import { useSelector } from "react-redux";
import { changeChosenAssignees, changeChosenStatuses } from "../Redux/actionCreators";
import {
  selectAssignees,
  selectStatuses,
  selectChosenAssignees,
  selectChosenAssigneesIDs,
  selectChosenStatuses,
  selectAssigneesLabels
} from "../Redux/selectors";

function HeaderComp() {

  const assignees = useSelector(selectAssignees);
  const chosenAssignees = useSelector(selectChosenAssignees);
  const chosenAssigneesIDs = useSelector(selectChosenAssigneesIDs)

  const statuses = useSelector(selectStatuses);
  const chosenStatuses = useSelector(selectChosenStatuses);
  const chosenStatusesIDs = chosenStatuses?.map(status => status.id);
  const assigneesLabelList = useSelector(selectAssigneesLabels);


  return (
    <header className={styles.header}>
      <h1 className={styles.h1}> Task Manager</h1>
      <InputText />
      {assignees.length && <InputSelect
        title="Assignee"
        labelsList={assigneesLabelList}
        list={assignees}
        shortList={chosenAssignees}
        listIDs={chosenAssigneesIDs}
        actionCreator={changeChosenAssignees}
      />}
      {statuses.length && <InputSelect
        title="Status"
        labelsList={["To Do", "WIP", "Done"]}
        list={statuses}
        shortList={chosenStatuses}
        listIDs={chosenStatusesIDs}
        actionCreator={changeChosenStatuses}
      />}
    </header>
  )
}

export default HeaderComp;