import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Categorias from "./Categorias";
import Cards from "./Cards";
import categoriesMock from "../__mocks__/categories";
import * as api from "../services/api";
import './Home.css'



function Home({ carrinho, setCarrinho, handleAddToCart }) {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [productsQuery, setProductsQuery] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    api
      .getCategories()
      .then((cats) => setCategories(cats))
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
        setCategories(categoriesMock);
      });
  }, []);

  const searchProduct = async () => {
    const response = await api.getProductsFromCategoryAndQuery(
      selectedCategory,
      query
    );
    setProductsQuery(response.results || response);
    setHasSearched(true);
  };

  return (
    <div className="home-container ">
    <div className="search-container">
      <Categorias
        className="aside-category"
        categories={categories}
        onCategorySelect={(id) => {
          setSelectedCategory(id);
          searchProduct();
        }}
      />
      <input
        type="text"
        className="search-input"
        data-testid="query-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button data-testid="query-button" onClick={searchProduct}>
        Buscar
      </button>

      <div data-testid="products">
        {!hasSearched ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        ) : productsQuery.length === 0 ? (
          <p>Nenhum produto foi encontrado</p>
        ) : (
          <Cards
            products={productsQuery}
            carrinho={carrinho}
            setCarrinho={setCarrinho}
            handleAddToCart={handleAddToCart}
            
          />
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
    </div>
  );
}

export default Home;
