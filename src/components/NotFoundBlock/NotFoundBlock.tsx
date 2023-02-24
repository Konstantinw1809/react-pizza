import React from "react";
import "./NotFoundBlock.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className="notFoundBlock-block">
      <span>😕</span>
      <h1>Ничего не найдено</h1>
      <p className="notFoundBlock-block__description">
        Такой страницы не существует
      </p>
    </div>
  );
};

export default NotFoundBlock;
