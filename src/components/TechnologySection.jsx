import React from 'react';
import './TechnologySection.css';

const TechnologySection = () => {
  return (
    <section className="technology-section">
      <div className="container">
        <div className="technology-content">
          <div className="technology-text">
            <h2 className="technology-title">О технологии</h2>
            <div className="title-divider-small"></div>
            <div className="technology-description">
              <p>
                Наша инновационная технология позволяет создавать свежевыжатые соки и смузи 
                прямо в натуральной таре из фруктов. Это революционный подход к приготовлению 
                напитков, который сохраняет максимум полезных веществ и создает уникальный 
                визуальный эффект.
              </p>
              <h3>Преимущества технологии:</h3>
              <ul className="technology-benefits">
                <li>
                  <strong>Максимальное сохранение пищевых волокон</strong> — соковыжималка 
                  позволяет делать сок прямо во фрукте, не удаляя мякоть
                </li>
                <li>
                  <strong>Натуральная тара</strong> — фрукт сам становится контейнером для напитка, 
                  что экологично и эстетично
                </li>
                <li>
                  <strong>Уникальная подача</strong> — каждый напиток выглядит как произведение искусства
                </li>
                <li>
                  <strong>Свежесть и качество</strong> — напиток готовится непосредственно перед употреблением
                </li>
                <li>
                  <strong>Высокое содержание витаминов</strong> — технология сохраняет все полезные 
                  вещества фруктов
                </li>
              </ul>
              <h3>Процесс приготовления:</h3>
              <ol className="technology-process">
                <li>Специальным прибором проделывается аккуратное отверстие в фрукте</li>
                <li>С помощью инновационной соковыжималки сок готовится прямо внутри фрукта</li>
                <li>Дополнительные ингредиенты смешиваются в блендере</li>
                <li>Готовая смесь заливается обратно в фрукт-тару</li>
                <li>Напиток готов к употреблению в уникальной натуральной упаковке</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;

