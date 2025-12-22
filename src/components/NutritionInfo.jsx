import React from 'react';
import './NutritionInfo.css';

const NutritionInfo = ({ calories, nutrition, servings }) => {
  const multiplier = servings;
  
  return (
    <div className="nutrition-info">
      <div className="nutrition-main">
        <div className="nutrition-calories">
          <span className="calories-value">{Math.round(calories)}</span>
          <span className="calories-label">ккал</span>
        </div>
      </div>
      <div className="nutrition-details">
        <div className="nutrition-item">
          <span className="nutrition-label">Белки</span>
          <span className="nutrition-value">{Math.round(nutrition.protein * multiplier * 10) / 10} г</span>
        </div>
        <div className="nutrition-item">
          <span className="nutrition-label">Жиры</span>
          <span className="nutrition-value">{Math.round(nutrition.fat * multiplier * 10) / 10} г</span>
        </div>
        <div className="nutrition-item">
          <span className="nutrition-label">Углеводы</span>
          <span className="nutrition-value">{Math.round(nutrition.carbs * multiplier * 10) / 10} г</span>
        </div>
        <div className="nutrition-item">
          <span className="nutrition-label">Клетчатка</span>
          <span className="nutrition-value">{Math.round(nutrition.fiber * multiplier * 10) / 10} г</span>
        </div>
      </div>
    </div>
  );
};

export default NutritionInfo;

