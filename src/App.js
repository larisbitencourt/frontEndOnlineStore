import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./__components__/Home";
import Carrinho from "./__components__/Carrinho";
import Categorias from "./__components__/Categorias";
import Cards from "./__components__/Cards";
import Detalhes from "./__components__/Detalhes";
import categoriesMock from "./__mocks__/categories";
import * as api from "./services/api";


function App() {
  const [carrinho, setCarrinho] = useState([]);


  const handleAddToCart = (product) => {
    setCarrinho((prevCarrinho) => {
      const produtoExistente = prevCarrinho.find(
        (item) => item.id === product.id
      );

      if (produtoExistente) {
        return prevCarrinho.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity ? item.quantity + 1 : 2 }
            : item
        );
      } else {
        return [...prevCarrinho, { ...product, quantity: 1 }];
      }
    });
  };



  const increaseQuantity = (id) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          {}
          <Switch>
            <Route exact path="/">
              <Home carrinho={carrinho} setCarrinho={setCarrinho} handleAddToCart={handleAddToCart}/>
            </Route>
            <Route exact path="/carrinho">
              <Carrinho
                carrinho={carrinho}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
                handleAddToCart={handleAddToCart}
              />
            </Route>
            <Route exact path="/detalhes/:id">
              <Detalhes 
              carrinho={carrinho} 
              setCarrinho={setCarrinho}
              handleAddToCart={handleAddToCart}
               />
            </Route>
            {}
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
