import styles from "../Styles/InputRadio.module.css";
import StatusButtonSkin from "./StatusButtonSkin";
import { useDispatch } from "react-redux";
import { changeTaskStatus } from "../Redux/actionCreators";


const statuses = ["To Do", "WIP", "Done"];

function InputRadio({ taskID, toggleMode }) {

  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    const newStatus = parseInt(e.target.value);
    console.log("newStatus", newStatus);
    dispatch(changeTaskStatus({ status: newStatus, taskID: taskID }));
    toggleMode();
  }

  return (
    <div
      className={styles.container}
      onChange={handleStatusChange}
    >
      {statuses.map((item, i) => (
        <div
          className={styles.radioDiv}
          key={item}
        >
          <input className={styles.input}
            type="radio"
            name="status"
            value={i + 1}
            id={i + 1}
          />
          <StatusButtonSkin
            status={i + 1}
            role="inactive"
          />
        </div>
      ))}

    </div>
  );
}

export default InputRadio;