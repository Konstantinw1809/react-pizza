import React from "react";

type CategoriesProps = {
  activeCategory: number;
  onClickCategory: (index: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = ({
  onClickCategory,
  activeCategory,
}) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            className={activeCategory === index ? "active" : ""}
            onClick={() => onClickCategory(index)}
            key={category + index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
