import React, { useRef, useState } from 'react';
import NutritionInfo from './NutritionInfo';
import RecipeModal from './RecipeModal';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onCardClick }) => {
  const cardRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleClick = () => {
    setIsModalOpen(true);
    if (onCardClick) onCardClick();
  };

  return (
    <>
      <div 
        ref={cardRef}
        className="recipe-card" 
        style={{ '--accent-color': recipe.color }}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <div className="recipe-card-header">
          <h2>{recipe.title}</h2>
          {recipe.calories && (
            <NutritionInfo 
              calories={recipe.calories} 
              nutrition={recipe.nutrition}
              servings={recipe.servings || 1}
            />
          )}
        </div>
        <div className="recipe-card-preview">
          <p className="recipe-preview-text">Нажмите, чтобы увидеть рецепт</p>
        </div>
      </div>
      <RecipeModal 
        recipe={recipe} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default RecipeCard;

