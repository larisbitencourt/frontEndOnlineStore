import React, { useState } from 'react';
import './Categorias.css'

function Categorias({ categories, onCategorySelect }) {
  const [selected, setSelected] = useState(null); 

  const handleChange = (id) => {
    setSelected(id);
    if (onCategorySelect) {
      onCategorySelect(id);
    }
  };

  return (
    <div className="categories-container">
        <p>Categorias:</p>

        {}
      {categories.map((category) => (
        <label key={category.id} className="category-label">
          <input
            type="radio"
            name="category"
            value={category.id}
            checked={selected === category.id}
            onChange={() => handleChange(category.id)}
            className="category-radio"
            data-testid="category"
          />
          <span className="custom-radio" />   
          {category.name}
        </label>
      ))}
    </div>
  );
}

export default Categorias;
