import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import * as api from "../services/api";
import './Detalhes.css'

function Detalhes({ carrinho, setCarrinho, handleAddToCart }) {
  const { id } = useParams();

  
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [evaluation, setEvaluation] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const allProducts = await api.getProductsFromCategoryAndQuery();
      const productsArray = allProducts.results || allProducts;
      const found = productsArray.find((p) => p.id == id);
      setProduct(found);
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
    setReviews(savedReviews);
  }, [id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = { rating, comment: evaluation };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
    setEvaluation("");
    setRating(0);
  };

  if (!product) return <p>Carregando...</p>;

  return (
    <div>
      <section className="card-product">
        <div
          key={product.id}
          className="card"
          data-testid="product-detail-link"
        >
          <h1 data-testid="product-detail-name">{product.title}</h1>
          <img
            src={product.thumbnail || product.image}
            alt={`Imagem de ${product.title}`}
            width={150}
          />
          <h2>{`R$ ${product.price}`}</h2>
        </div>
      </section>

      {}
      <button
        data-testid="product-detail-add-to-cart"
        onClick={() => handleAddToCart(product)}
      >
        Adicionar ao carrinho
      </button>

      <aside>
        <h1>Especificações Técnicas</h1>
        <ul>
          <li>Id: {product.id}</li>
          <li>Name: {product.title}</li>
          <li>Price: R$ {product.price}</li>
        </ul>
      </aside>

      {}
      <form onSubmit={handleSubmitReview}>
        {}
        <div style={{ display: "flex", gap: "5px", marginBottom: "8px" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={30}
              color={star <= rating ? "#ffc107" : "#e4e5e9"}
              onClick={() => setRating(star)}
              style={{ cursor: "pointer" }}
              data-testid={`star-${star}`} 
            />
          ))}
        </div>

        {}
        <textarea
          data-testid="product-detail-evaluation"
          value={evaluation}
          onChange={(e) => setEvaluation(e.target.value)}
          placeholder="Escreva seu comentário (opcional)"
        />

        <button type="submit">Enviar avaliação</button>
      </form>

      {}
      <div>
        <h3>Avaliações:</h3>
        {reviews.length === 0 ? (
          <p>Nenhuma avaliação ainda.</p>
        ) : (
          reviews.map((r, index) => (
            <div key={index}>
              <p>Nota: {r.rating}</p>
              {r.comment && <p>Comentário: {r.comment}</p>}
            </div>
          ))
        )}
      </div>

      <Link
        to="/carrinho"
        data-testid="shopping-cart-button"
        className="cart-icon"
      >
        🛒
      </Link>
    </div>
  );
}

export default Detalhes;
