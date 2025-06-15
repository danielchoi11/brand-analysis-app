import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BrandDetailPage.css';

const BrandDetailPage = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [similarBrands, setSimilarBrands] = useState([]);

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await axios.get(`${apiUrl}/brands/${brandId}`);
        setBrand(response.data.brand);
        
        // Fetch similar brands (same category)
        if (response.data.brand.category) {
          const categoryResponse = await axios.get(`${apiUrl}/categories/${response.data.brand.category}`);
          // Filter out the current brand
          const filteredBrands = categoryResponse.data.brands.filter(
            b => b.id !== brandId
          );
          setSimilarBrands(filteredBrands);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching brand data:', err);
        setError('브랜드 정보를 불러오는 중 오류가 발생했습니다');
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [brandId]);

  // 로딩과 에러 상태는 페이지 내에서 처리하도록 변경

  // Helper to render an array as a comma-separated list or a single item
  const renderList = (items) => {
    if (Array.isArray(items)) {
      return items.join(', ');
    }
    return items;
  };

  return (
    <div className="brand-detail-page">
      <main className="brand-main">
        <div className="brand-main-container">
          {loading ? (
            <div className="loader">
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <div className="alert">{error}</div>
          ) : !brand ? (
            <div className="alert">브랜드 정보를 찾을 수 없습니다</div>
          ) : (
            <>
              <div className="brand-header">
                <h1>{brand.name}</h1>
                <p className="brand-category">{brand.category} | {brand.subcategory}</p>
              </div>
              
              <div className="brand-content">
                <div className="brand-info-section">
                  <h2>기본 정보</h2>
                  <div className="info-grid">
                    <div className="info-item">
                      <h3>창립자</h3>
                      <p>{brand.founders}</p>
                    </div>
                    <div className="info-item">
                      <h3>설립일</h3>
                      <p>{brand.founded_date}</p>
                    </div>
                    <div className="info-item">
                      <h3>상장 여부</h3>
                      <p>{brand.public ? '상장기업' : '비상장기업'}</p>
                    </div>
                    {brand.stock_symbol && (
                      <div className="info-item">
                        <h3>주식 심볼</h3>
                        <p>{brand.stock_symbol}</p>
                      </div>
                    )}
                    <div className="info-item">
                      <h3>최신 매출액</h3>
                      <p>{brand.revenue}</p>
                    </div>
                    <div className="info-item">
                      <h3>웹사이트</h3>
                      <p><a href={`https://${brand.website}`} target="_blank" rel="noopener noreferrer">{brand.website}</a></p>
                    </div>
                  </div>
                </div>

                <div className="brand-mission-section">
                  <h2>브랜드 미션</h2>
                  <blockquote className="mission-quote">
                    {brand.mission}
                  </blockquote>
                </div>

                <div className="brand-strategy-section">
                  <h2>커뮤니케이션 전략</h2>
                  <p>{brand.communication_strategy}</p>
                </div>

                <div className="brand-presence-section">
                  <h2>진출 국가</h2>
                  <p>{renderList(brand.countries)}</p>
                </div>

                <div className="brand-mood-section">
                  <h2>브랜드 무드</h2>
                  <div className="mood-tags">
                    {brand.brand_mood.split(', ').map((mood, index) => (
                      <span key={index} className="mood-tag">{mood}</span>
                    ))}
                  </div>
                </div>

                {brand.competitors && brand.competitors.length > 0 && (
                  <div className="brand-competitors-section">
                    <h2>경쟁사</h2>
                    <ul className="competitors-list">
                      {brand.competitors.map((competitor, index) => (
                        <li key={index}>{competitor}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {similarBrands.length > 0 && (
                  <div className="similar-brands-section">
                    <h2>동일 카테고리 브랜드</h2>
                    <div className="similar-brands-grid">
                      {similarBrands.map(similarBrand => (
                        <div 
                          key={similarBrand.id} 
                          className="similar-brand-card"
                          onClick={() => navigate(`/brands/${similarBrand.id}`)}
                        >
                          <h3>{similarBrand.name}</h3>
                          <div className="view-details">자세히 보기 →</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default BrandDetailPage;
