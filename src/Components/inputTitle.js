import styles from "../Styles/InputTitle.module.css";

function InputTitle({ toggle, handleToggle, title, indicator }) {

    return (
        <div
            className={styles.titleBlock}
            style={toggle === "closed" ? {} : { backgroundColor: "#F5F7FF", border: "1px solid #F5F7FF", borderRadius: 5 }}
        >
            <h3 className={styles.title}>{title}</h3>
            <svg className={styles.svg}>
                <circle className={styles.circle}
                    r="10"
                    cx="10"
                    cy="10"
                />
                <text className={styles.text}
                    x="10"
                    y="14"
                >
                    {indicator}
                </text>
            </svg>
            <span className={styles.arrow}
                onClick={handleToggle}
                style={toggle === "closed" ? {} : { transform: "rotate(90deg)" }}
            >
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </span>
        </div>
    );
}

export default InputTitle;

