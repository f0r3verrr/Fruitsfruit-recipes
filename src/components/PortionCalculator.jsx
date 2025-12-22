import React from 'react';
import './PortionCalculator.css';

const PortionCalculator = ({ servings, onServingsChange, baseServings = 1 }) => {
  const handleDecrease = () => {
    if (servings > 0.5) {
      onServingsChange(servings - 0.5);
    }
  };

  const handleIncrease = () => {
    if (servings < 10) {
      onServingsChange(servings + 0.5);
    }
  };

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0.5 && value <= 10) {
      onServingsChange(value);
    }
  };

  return (
    <div className="portion-calculator">
      <label className="portion-label">Количество порций:</label>
      <div className="portion-controls">
        <button 
          className="portion-btn" 
          onClick={handleDecrease}
          disabled={servings <= 0.5}
          aria-label="Уменьшить порции"
        >
          −
        </button>
        <input
          type="number"
          min="0.5"
          max="10"
          step="0.5"
          value={servings}
          onChange={handleInputChange}
          className="portion-input"
        />
        <button 
          className="portion-btn" 
          onClick={handleIncrease}
          disabled={servings >= 10}
          aria-label="Увеличить порции"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PortionCalculator;

