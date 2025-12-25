import React, { useState, useMemo } from 'react';
import RecipeCard from './components/RecipeCard';
import SearchAndFilter from './components/SearchAndFilter';
import TechnologySection from './components/TechnologySection';
import { recipes } from './data/recipes';
import fundLogo from './data/fund-logo.png';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFruit, setSelectedFruit] = useState('all');

  // Получаем список всех фруктов для фильтра
  const availableFruits = useMemo(() => {
    const fruits = new Set();
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        const ingName = typeof ing === 'string' ? ing : ing.name;
        if (['Банан', 'Питахайа', 'Яблоко', 'Апельсин', 'Грейпфрут'].includes(ingName)) {
          fruits.add(ingName);
        }
      });
    });
    return Array.from(fruits).sort();
  }, []);

  // Фильтрация рецептов
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Поиск по названию и ингредиентам
      const matchesSearch = searchQuery === '' || 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => {
          const ingName = typeof ing === 'string' ? ing : ing.name;
          return ingName.toLowerCase().includes(searchQuery.toLowerCase());
        });

      // Фильтр по фруктам
      const matchesFilter = selectedFruit === 'all' ||
        recipe.ingredients.some(ing => {
          const ingName = typeof ing === 'string' ? ing : ing.name;
          return ingName === selectedFruit;
        });

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFruit]);

  return (
    <div className="app">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">
            Производство свежевыжатых соков
            <span className="highlight"> нового поколения</span>
          </h1>
          <div className="title-divider"></div>
          <p className="subtitle">
            Уникальные рецепты соков-коктейлей в таре из фруктов
          </p>
        </div>
      </header>

      <main className="recipes-section">
        <div className="container">
          <div className="section-header">
            <h2>Наши рецепты</h2>
            <p>Откройте для себя уникальный способ приготовления соков прямо в натуральной таре</p>
          </div>
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            selectedFruit={selectedFruit}
            onFilterChange={setSelectedFruit}
            availableFruits={availableFruits}
          />
          {filteredRecipes.length > 0 ? (
            <div className="recipes-grid">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>Рецепты не найдены. Попробуйте изменить параметры поиска.</p>
            </div>
          )}
        </div>
      </main>

      <TechnologySection />

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-text">
              <p className="footer-company">ООО "ТРИУМФАТОРЫ"</p>
              <p className="footer-address">Юр. адрес: г. Мурманск, ул. Подстаницкого, д. 1, этаж 2 офис 213</p>
              <p className="footer-inn">ИНН: 5190101483</p>
              <p className="footer-email">Email: triumfatory@mail.ru</p>
              <p className="footer-support">
                Проект выполнен при поддержке Фонда содействия инновациям в рамках программы
                «Студенческий стартап» федерального проекта «Платформа университетского
                технологического предпринимательства».
              </p>
            </div>
            <div className="footer-logo">
              <img src={fundLogo} alt="Фонд содействия инновациям" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

