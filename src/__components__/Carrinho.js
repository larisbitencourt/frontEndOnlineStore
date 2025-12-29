import React, { useState } from "react";
import Checkout from "./Checkout";
import "./Carrinho.css";

function Carrinho({
  carrinho,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const [finalizando, setFinalizando] = useState(false);

  if (carrinho.length === 0)
    return (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );

  const produtosCarrinho = carrinho;

  const total = produtosCarrinho.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const clearCart = () => {
    carrinho.forEach((item) => removeFromCart(item.id));
  };

  if (finalizando) {
    return (
      <Checkout
        cartItems={produtosCarrinho}
        clearCart={() => {
          clearCart();
          setFinalizando(false);
        }}
      />
    );
  }

  return (
    <div>
      <ul>
        {produtosCarrinho.map((item) => (
          <li key={item.id}>
            <div>
              <span data-testid="shopping-cart-product-name">{item.title}</span>
            </div>
            <div className="item-price">
              <span>R$ {item.price} </span>
            </div>
            <div className="item-quantity">
              <span data-testid="shopping-cart-product-quantity">
                {item.quantity}
              </span>
            </div>
            <div>
              <button
                data-testid="product-increase-quantity"
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>
              <button
                data-testid="product-decrease-quantity"
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <button
                data-testid="product-remove"
                onClick={() => removeFromCart(item.id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button
        data-testid="checkout-products"
        onClick={() => setFinalizando(true)}
        className="button-final"
      >
        Finalizar Compra
      </button>
    </div>
  );
}

export default Carrinho;
