import React from "react";
import loupe from "../../assets/img/loupe.svg";
import close from "../../assets/img/close.svg";
import "./Search.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="app__search">
      <img src={loupe} className="app__search-loupe" alt="loupe" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className="app__search-input"
        placeholder="Поиск пиццы..."
      />
      {value && (
        <img
          onClick={onClickClear}
          src={close}
          className="app__search-close"
          alt="close"
        />
      )}
    </div>
  );
};

export default Search;
