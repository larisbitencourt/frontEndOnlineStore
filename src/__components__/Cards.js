import React from 'react';
import { useHistory } from "react-router-dom";
import "./Cards.css";


function Cards({ products, carrinho, setCarrinho, handleAddToCart }) {
  const history = useHistory();

  if (!products || products.length === 0) {
    return <p>Nenhum produto foi encontrado</p>;
  }

  return (
    <section className="card-body cards-container">
      {products.map((product) => (
        <div
          key={product.id}
          className="card card-item"
          data-testid="product"
          onClick={() => history.push(`/detalhes/${product.id}`)}
        >
          <h1 className="card-title">{product.title}</h1>
          <img
            data-testid="product-detail-link"
            className="card-img"
            src={product.thumbnail || product.image}
            alt={`Imagem de ${product.title}`}
            width={150}
          />
          <h2 className="card-price">{`R$ ${product.price}`}</h2>

          <button
            data-testid="product-add-to-cart"
            className="card-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
          >
            Adicionar ao carrinho
          </button>
        </div>
      ))}
    </section>
  );
}


export default Cards;
