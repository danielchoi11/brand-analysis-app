import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <div className="container">
          <h1>BrandInsight 소개</h1>
          <p>브랜드 정보 검색 및 분석 플랫폼</p>
        </div>
      </div>
      
      <div className="container">
        <div className="about-content">
          <section className="about-section">
            <h2>BrandInsight란?</h2>
            <p>
              BrandInsight는 다양한 브랜드에 대한 포괄적인 정보를 제공하고 분석할 수 있는 플랫폼입니다. 
              브랜드를 만들고 싶거나 브랜드에 관심 있는 사람들에게 유용한 인사이트를 제공하는 것을 목표로 합니다.
            </p>
            <p>
              사용자는 검색을 통해 원하는 브랜드의 정보를 찾을 수 있으며, 
              창립자, 설립일, 브랜드 미션, 최신 커뮤니케이션 전략, 진출 국가, 
              최신 매출액, 상장 여부, 브랜드 무드 등 다양한 정보를 구조화된 형태로 확인할 수 있습니다.
            </p>
          </section>
          
          <section className="about-section">
            <h2>주요 기능</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🔍</div>
                <h3>브랜드 검색</h3>
                <p>원하는 브랜드를 검색하여 상세 정보를 확인할 수 있습니다.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <h3>카테고리별 브랜드 탐색</h3>
                <p>Fashion, Technology, Food & Beverage 등 다양한 카테고리별로 브랜드를 탐색할 수 있습니다.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📈</div>
                <h3>브랜드 비교 분석</h3>
                <p>동일 카테고리의 브랜드들을 비교하여 유사점과 차이점을 분석할 수 있습니다.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💡</div>
                <h3>인사이트 제공</h3>
                <p>브랜드 정보를 바탕으로 인사이트를 얻을 수 있습니다.</p>
              </div>
            </div>
          </section>
          
          <section className="about-section">
            <h2>브랜드 정보</h2>
            <p>BrandInsight는 다음과 같은 브랜드 정보를 제공합니다:</p>
            <ul className="info-list">
              <li>창립자 정보</li>
              <li>설립일</li>
              <li>브랜드 미션</li>
              <li>커뮤니케이션 전략</li>
              <li>진출 국가</li>
              <li>최신 매출액</li>
              <li>상장 여부</li>
              <li>브랜드 무드</li>
              <li>경쟁사 정보</li>
            </ul>
            <p>이러한 정보는 브랜드를 이해하고, 새로운 브랜드를 구축하는 데 중요한 인사이트를 제공합니다.</p>
          </section>
          
          <div className="cta-section">
            <h2>지금 바로 시작하세요</h2>
            <p>브랜드에 대한 깊이 있는 정보를 지금 바로 확인해보세요!</p>
            <div className="cta-buttons">
              <Link to="/search" className="btn btn-primary">브랜드 검색하기</Link>
              <Link to="/categories" className="btn btn-outline">카테고리별 탐색하기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
