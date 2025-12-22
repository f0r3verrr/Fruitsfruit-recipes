import React, { useState, useEffect, useRef } from 'react';
import IngredientItem from './IngredientItem';
import PortionCalculator from './PortionCalculator';
import NutritionInfo from './NutritionInfo';
import PrintExport from './PrintExport';
import './RecipeModal.css';

const RecipeModal = ({ recipe, isOpen, onClose }) => {
  const [servings, setServings] = useState(recipe?.servings || 1);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && recipe) {
      setServings(recipe.servings || 1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, recipe]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !recipe) return null;

  const calculateAmount = (ingredient, servings) => {
    if (typeof ingredient === 'string') {
      return ingredient;
    }
    
    const baseAmount = ingredient.baseAmount || 1;
    const multiplier = servings / (recipe.servings || 1);
    const newAmount = baseAmount * multiplier;

    if (ingredient.amount.includes('шт.')) {
      return `${Math.round(newAmount * 10) / 10} шт.`;
    } else if (ingredient.amount.includes('мл')) {
      return `${Math.round(newAmount)} мл`;
    } else if (ingredient.amount.includes('г')) {
      return `${Math.round(newAmount)} г`;
    } else if (ingredient.amount.includes('ч.л.')) {
      return `${Math.round(newAmount * 10) / 10} ч.л.`;
    } else if (ingredient.amount.includes('ст.л.')) {
      return `${Math.round(newAmount * 10) / 10} ст.л.`;
    }
    return ingredient.amount;
  };

  return (
    <div className="modal-overlay">
      <div 
        ref={modalRef}
        className="modal-content" 
        style={{ '--accent-color': recipe.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="modal-header">
          <div className="modal-title-row">
            <h2>{recipe.title}</h2>
            <PrintExport recipe={recipe} servings={servings} baseServings={recipe.servings || 1} />
          </div>
          {recipe.calories && (
            <NutritionInfo 
              calories={recipe.calories * servings} 
              nutrition={recipe.nutrition}
              servings={servings}
            />
          )}
        </div>

        <div className="modal-body">
          <PortionCalculator 
            servings={servings} 
            onServingsChange={setServings}
            baseServings={recipe.servings || 1}
          />
          
          <div className="modal-ingredients">
            <h3>Ингредиенты:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => {
                const ingredientObj = typeof ingredient === 'string' 
                  ? { name: ingredient, amount: ingredient, baseAmount: 1 }
                  : ingredient;
                return (
                  <IngredientItem
                    key={index}
                    ingredient={ingredientObj}
                    amount={calculateAmount(ingredientObj, servings)}
                    servings={servings}
                  />
                );
              })}
            </ul>
          </div>

          <div className="modal-instructions">
            <h3>Способ приготовления:</h3>
            <p>{recipe.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;

