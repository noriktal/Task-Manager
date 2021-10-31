import styles from "../Styles/InputText.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeSearchTerm } from "../Redux/actionCreators";


function InputText() {

  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    setTerm(searchTerm);
    dispatch(changeSearchTerm(searchTerm));
  }

  return (
    <div className={styles.searchDiv}>

      <button
        className={styles.searchBtn}
      ><ion-icon name="search-outline"></ion-icon></button>
      <input
        className={styles.search}
        type="text"
        name="searchbox"
        value={term}
        placeholder="Search a task..."
        onChange={handleSearch}
      />

    </div>
  );
}

export default InputText;