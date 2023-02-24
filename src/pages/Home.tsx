import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectFilter,
  setActiveCategory,
  setCurrentPage,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

import Sort from "../components/Sort/Sort";
import Categories from "../components/Categories/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(selectPizzaData);
  const { activeCategory, sortType, currentPage, searchValue } =
    useSelector(selectFilter);

  const onClickCategory = (category: number) => {
    dispatch(setActiveCategory(category));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  React.useEffect(() => {
    (async () => {
      const category = activeCategory > 0 ? `category=${activeCategory}` : "";
      const order = sortType.sortProperty.includes("-") ? `asc` : `desc`;
      const sortBy = sortType.sortProperty.replace("-", "");
      const search = searchValue ? `search=${searchValue}` : "";

      dispatch(
        //@ts-ignore
        fetchPizzas({ sortBy, category, order, search, currentPage })
      );
      // window.scrollTo(0, 0);
    })();
  }, [activeCategory, sortType.sortProperty, searchValue, currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickCategory={onClickCategory}
          activeCategory={activeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? skeleton
            : items.map((pizza: any, index: number) => {
                if (
                  pizza.title.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return <PizzaBlock {...pizza} key={pizza.title + index} />;
                }
              })}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
