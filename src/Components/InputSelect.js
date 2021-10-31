import styles from "../Styles/InputSelect.module.css";
import { useDispatch } from "react-redux";
import InputTitle from "./inputTitle";
import useToggle from "../useToggle";

function InputSelect({
  title,
  labelsList,
  list,
  shortList,
  listIDs,
  actionCreator }) {

  const dispatch = useDispatch();
  const { toggle, toggleMode } = useToggle();

  const handleFilterChange = (e) => {
    let clickItemID = e.target.value;
    if (Number.isInteger(list[0].id)) {
      clickItemID = +clickItemID;
    }

    let filteredList;
    //in case user rechooses an element excluded beforehand
    if (!listIDs.includes(clickItemID)) {
      const reChosenItem = list.find(item => item.id === clickItemID);
      filteredList = [...shortList, reChosenItem];
      //in case user excludes an element
    } else {
      filteredList = shortList.filter(item => item.id !== clickItemID)
    }
    dispatch(actionCreator(filteredList));
  }

  const indicator = shortList.length;

  return (
    <div
      className={styles.selectDiv}
      style={toggle === "closed" ? {} : { backgroundColor: "#F5F7FF" }}
    >
      <InputTitle
        toggle={toggle}
        handleToggle={toggleMode}
        title={title}
        indicator={indicator}
      />

      <div
        className={styles.checkboxDiv}
        style={toggle === "closed" ? { display: "none" } : { backgroundColor: "#F5F7FF" }}
      >
        <div
          className={styles.form}
          onChange={handleFilterChange}
        >
          {list.length && labelsList.map((item, i) =>
          (
            <div
              className={styles.checkboxWrapper}
              key={`${item.substring(0, 8)}${i}`}
            >
              <input
                type="checkbox"
                name={item}
                value={list[i].id}
                defaultChecked
              />
              <label
                className={styles.label}
                htmlFor={item}
              >
                {item}
              </label>
            </div>
          )
          )}
        </div>
      </div>
    </div>
  );
}

export default InputSelect;