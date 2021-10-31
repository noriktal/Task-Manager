import styles from "../Styles/StatusButtonSkin.module.css";


const statusDictionary = {
    //[status string, light color, dark color]
    1 : ["To Do", "#EBF1FD", "#5061F2"],
    2 : ["WIP", "#FEF8E8", "#e9c047"],
    3: ["Done","#EBF9EB","#50b350"]
}


//Role can be either "acvite" for active behavior or "inactive" for presentation only (unclickable)

const StatusButtonSkin = ({status, toggleMode,role}) => {


    return (
        <button 
            className={styles.button}
            style={{backgroundColor:statusDictionary[status][1],
                    borderColor: statusDictionary[status][2],
                    color: statusDictionary[status][2]}}
                    onClick={role === "active" ? toggleMode : ()=>{}}
        >
            {statusDictionary[status][0].toUpperCase()}
        </button>
    )

}

export default StatusButtonSkin;
