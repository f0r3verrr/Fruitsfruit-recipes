import React, { useState } from 'react';
import { ingredientIcons, ingredientInfo } from '../data/recipes';
import './IngredientItem.css';

const IngredientItem = ({ ingredient, amount, servings = 1 }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const icon = ingredientIcons[ingredient.name] || '🍎';
  const info = ingredientInfo[ingredient.name] || '';

  return (
    <li 
      className="ingredient-item"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="ingredient-icon">{icon}</span>
      <span className="ingredient-name">{ingredient.name}</span>
      <span className="ingredient-amount">{amount}</span>
      {showTooltip && info && (
        <div className="ingredient-tooltip">
          <p>{info}</p>
        </div>
      )}
    </li>
  );
};

export default IngredientItem;

