import StatusButtonSkin from "./StatusButtonSkin";
import styles from "../Styles/StatusButton.module.css";
import useToggle from "../useToggle";
import InputRadio from "./InputRadio";

const StatusButton = ({ status, taskID }) => {
    const { toggle, toggleMode } = useToggle();

    return (
        <div
            className={styles.statusDiv}
            title="Change Me!"
        >
            <StatusButtonSkin
                status={status}
                toggleMode={toggleMode}
                role="active"
            />
            {
                toggle === "open" &&
                <InputRadio
                    taskID={taskID}
                    toggleMode={toggleMode}
                />
            }
        </div>
    )

}

export default StatusButton;