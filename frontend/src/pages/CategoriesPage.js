import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await axios.get(`${apiUrl}/categories/`);
        setCategories(response.data.categories);
        
        // Set the first category as active by default
        if (Object.keys(response.data.categories).length > 0) {
          setActiveCategory(Object.keys(response.data.categories)[0]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('카테고리 정보를 불러오는 중 오류가 발생했습니다');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // 로딩과 에러 상태는 페이지 내에서 처리하도록 변경

  return (
    <div className="categories-page">
      <main className="categories-main">
        <div className="categories-main-container">
          <div className="categories-header">
            <h1>Brand Categories</h1>
          </div>
          
          {error && <div className="alert">{error}</div>}
          
          {loading ? (
            <div className="loader">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="categories-content">
              <div className="category-sidebar">
                <h3>카테고리</h3>
                <ul className="category-list">
                  {Object.keys(categories).map((category) => (
                    <li 
                      key={category}
                      className={`category-item ${activeCategory === category ? 'active' : ''}`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                      <span className="brand-count">{categories[category].length}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="category-content">
                {activeCategory && (
                  <div className="active-category-container">
                    <h2>{activeCategory} 브랜드</h2>
                    {categories[activeCategory].length === 0 ? (
                      <div className="no-brands">이 카테고리에 브랜드가 없습니다</div>
                    ) : (
                      <div className="brands-grid">
                        {categories[activeCategory].map((brand) => (
                          <div 
                            key={brand.id}
                            className="brand-card"
                            onClick={() => navigate(`/brands/${brand.id}`)}
                          >
                            <div className="brand-card-inner">
                              <h3>{brand.name}</h3>
                              <div className="view-details">자세히 보기 →</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer>
        <p>© 2025 CULTURA CLUB</p>
      </footer>
    </div>
  );
};

export default CategoriesPage;
