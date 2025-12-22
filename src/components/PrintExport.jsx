import React from 'react';
import './PrintExport.css';

const PrintExport = ({ recipe, servings, baseServings = 1 }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContent = generatePrintContent(recipe, servings, baseServings);
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleCopy = async () => {
    const text = generateRecipeText(recipe, servings, baseServings);
    try {
      await navigator.clipboard.writeText(text);
      alert('Рецепт скопирован в буфер обмена!');
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  };

  const generatePrintContent = (recipe, servings, baseServings) => {
    const multiplier = servings / baseServings;
    const ingredientsList = recipe.ingredients.map(ing => {
      const ingObj = typeof ing === 'string' ? { name: ing, amount: ing } : ing;
      const amount = calculateAmount(ingObj, servings, baseServings);
      return `<li>${ingObj.name} - ${amount}</li>`;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${recipe.title}</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              color: #333;
            }
            h1 { color: #2c3e50; border-bottom: 2px solid #d4af37; padding-bottom: 10px; }
            .info { margin: 20px 0; padding: 15px; background: #f5f5f5; }
            ul { line-height: 1.8; }
            .instructions { margin-top: 20px; line-height: 1.8; }
            @media print {
              body { margin: 0; padding: 20px; }
            }
          </style>
        </head>
        <body>
          <h1>${recipe.title}</h1>
          ${recipe.calories ? `
            <div class="info">
              <strong>Калорийность:</strong> ${Math.round(recipe.calories * multiplier)} ккал<br>
              <strong>Белки:</strong> ${Math.round(recipe.nutrition.protein * multiplier * 10) / 10} г | 
              <strong>Жиры:</strong> ${Math.round(recipe.nutrition.fat * multiplier * 10) / 10} г | 
              <strong>Углеводы:</strong> ${Math.round(recipe.nutrition.carbs * multiplier * 10) / 10} г
            </div>
          ` : ''}
          <h2>Ингредиенты (${servings} ${servings === 1 ? 'порция' : servings < 5 ? 'порции' : 'порций'}):</h2>
          <ul>${ingredientsList}</ul>
          <div class="instructions">
            <h2>Способ приготовления:</h2>
            <p>${recipe.instructions}</p>
          </div>
        </body>
      </html>
    `;
  };

  const generateRecipeText = (recipe, servings, baseServings) => {
    const multiplier = servings / baseServings;
    const ingredientsList = recipe.ingredients.map(ing => {
      const ingObj = typeof ing === 'string' ? { name: ing, amount: ing } : ing;
      const amount = calculateAmount(ingObj, servings, baseServings);
      return `- ${ingObj.name}: ${amount}`;
    }).join('\n');

    return `${recipe.title}\n\n` +
      (recipe.calories ? `Калорийность: ${Math.round(recipe.calories * multiplier)} ккал\n\n` : '') +
      `Ингредиенты (${servings} ${servings === 1 ? 'порция' : servings < 5 ? 'порции' : 'порций'}):\n${ingredientsList}\n\n` +
      `Способ приготовления:\n${recipe.instructions}`;
  };

  const calculateAmount = (ingredient, servings, baseServings) => {
    const baseAmount = ingredient.baseAmount || 1;
    const multiplier = servings / baseServings;
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
    <div className="print-export">
      <button 
        className="print-export-btn" 
        onClick={handlePrint}
        title="Печать рецепта"
        aria-label="Печать рецепта"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4.5 6V1.5H13.5V6M4.5 6H3C2.17157 6 1.5 6.67157 1.5 7.5V13.5C1.5 14.3284 2.17157 15 3 15H4.5V12H13.5V15H15C15.8284 15 16.5 14.3284 16.5 13.5V7.5C16.5 6.67157 15.8284 6 15 6H13.5M4.5 6V12M13.5 6V12M12 9H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button 
        className="print-export-btn" 
        onClick={handleCopy}
        title="Копировать рецепт"
        aria-label="Копировать рецепт"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M12 6.75V3.75C12 2.92157 11.3284 2.25 10.5 2.25H3.75C2.92157 2.25 2.25 2.92157 2.25 3.75V10.5C2.25 11.3284 2.92157 12 3.75 12H6.75M12 6.75H14.25C15.0784 6.75 15.75 7.42157 15.75 8.25V14.25C15.75 15.0784 15.0784 15.75 14.25 15.75H8.25C7.42157 15.75 6.75 15.0784 6.75 14.25V12M12 6.75H8.25C7.42157 6.75 6.75 7.42157 6.75 8.25V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default PrintExport;

