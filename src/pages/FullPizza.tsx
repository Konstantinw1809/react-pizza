import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://63d17474120b32bbe8f8e2bd.mockapi.io/items/${id}`
        );
        setPizza(response.data);
      } catch (error) {
        alert("Ошибка");
        navigate("/");
      }
    })();
  }, []);

  if (!pizza) {
    return <>"Загрузка..."</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}$</h4>
    </div>
  );
};

export default FullPizza;
