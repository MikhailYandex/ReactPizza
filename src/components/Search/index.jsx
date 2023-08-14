import styles from "./Search.module.scss";
import search from "../assets/img/search.svg";
import close from "../assets/img/close.svg";
import { useContext } from "react";
import { SearchContext } from "../../App";

const Search = () => {
  const { searchValue, setSeachValue } = useContext(SearchContext);

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={search} alt="Поиск" />
      <input
        value={searchValue}
        onChange={(e) => setSeachValue(e.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />
      {searchValue && (
        <img
          onClick={() => setSeachValue("")}
          className={styles.close}
          src={close}
          alt="Кнопка очистики инпута"
        />
      )}
    </div>
  );
};

export default Search;
