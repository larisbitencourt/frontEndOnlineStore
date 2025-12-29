import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

export default function Checkout({ cartItems, clearCart }) {
  const history = useHistory();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    cpf: "",
    phone: "",
    cep: "",
    address: "",
    payment: "",
  });

  const [errors, setErrors] = useState([]);


  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const validateForm = () => {
    const requiredFields = [
      "fullname",
      "email",
      "cpf",
      "phone",
      "cep",
      "address",
      "payment",
    ];
    const missing = requiredFields.filter(
      (field) => !formData[field]?.trim()
    );
    setErrors(missing);
    return missing.length === 0;
  };


  const handleSubmit = () => {
    if (validateForm()) {
      clearCart();
      history.push("/");
    }
  };


  return (
    <div>
      <h1>Finalizar Compra</h1>

      {}
      <div>
        <h2>Resumo do Pedido</h2>
        <ul data-testid="checkout-products">
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} x {item.quantity} - R$ {item.price * item.quantity}
            </li>
          ))}
        </ul>
        <p>Total: R$ {total.toFixed(2)}</p>
      </div>

      {}
      <form>
        <input
          name="fullname"
          placeholder="Nome completo"
          data-testid="checkout-fullname"
          value={formData.fullname}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          data-testid="checkout-email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="cpf"
          placeholder="CPF"
          data-testid="checkout-cpf"
          value={formData.cpf}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Telefone"
          data-testid="checkout-phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          name="cep"
          placeholder="CEP"
          data-testid="checkout-cep"
          value={formData.cep}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Endereço"
          data-testid="checkout-address"
          value={formData.address}
          onChange={handleChange}
        />

        {}
        <div>
          <h3>Método de pagamento</h3>
          <label>
            <input
              type="radio"
              name="payment"
              value="boleto"
              checked={formData.payment === "boleto"}
              onChange={handleChange}
            />
            Boleto
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="cartao"
              checked={formData.payment === "cartao"}
              onChange={handleChange}
            />
            Cartão de crédito
          </label>
        </div>
      </form>

      <button onClick={handleSubmit}>Comprar</button>
    </div>
  );
}

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  clearCart: PropTypes.func.isRequired,
};
