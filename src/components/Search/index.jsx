import styles from "./Search.module.scss";
import search from "../assets/img/search.svg";
import close from "../assets/img/close.svg";
import { useCallback, useContext, useRef, useState } from "react";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

const Search = () => {
  const [value, setValue] = useState("");
  const { setSeachValue } = useContext(SearchContext);
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSeachValue(str);
    }, 1000),
    []
  );

	const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClickClear = () => {
    setValue("");
		setSeachValue('')
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={search} alt="Поиск" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.close}
          src={close}
          alt="Кнопка очистики инпута"
        />
      )}
    </div>
  );
};

export default Search;
