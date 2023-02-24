import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSort, setSortType } from "../../redux/slices/filterSlice";

type SortItem = { name: string; sortProperty: string };

type PopupClick = MouseEvent & { path: Node[] };

export const list: SortItem[] = [
  { name: "популярности (desc)", sortProperty: "rating" },
  { name: "популярности (asc)", sortProperty: "-rating" },
  { name: "цене (desc)", sortProperty: "price" },
  { name: "цене (asc)", sortProperty: "-price" },
  { name: "алфавиту (desc)", sortProperty: "title" },
  { name: "алфавиту (asc)", sortProperty: "-title" },
];

const Sort = () => {
  const [sortOpen, setSortOpen] = React.useState(false);
  const dispatch = useDispatch();
  const sortType = useSelector(selectSort);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickSortType = (obj: SortItem) => {
    dispatch(setSortType(obj));
    setSortOpen(!sortOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      // @ts-ignore
      if (sortRef.current && !event.includes(sortRef.current)) {
        setSortOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setSortOpen(!sortOpen)}>{sortType.name}</span>
      </div>
      {sortOpen && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => (
              <li
                className={
                  sortType.sortProperty === obj.sortProperty ? "active" : ""
                }
                onClick={() => onClickSortType(obj)}
                key={obj.name + index}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
