import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  // 스크롤 애니메이션 효과
  useEffect(() => {
    const scrollSections = document.querySelectorAll('.scroll-section');

    const checkScroll = () => {
      scrollSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
          section.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 초기 로드시 확인

    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <div className="home-page">
      <main className='home-main'>
        <div className="content">
          <div className="logo-container">
            <div className="logo-text">
              <span>C</span><span>U</span><span>L</span><span>T</span><span>U</span><span>R</span><span>A</span>
            </div>
          </div>
          <h1 className="quote">"WE ANALYZE BRAND STRATEGIES<br/>TO UNVEIL THEIR SUCCESS"</h1>
          
          <div className="button-container">
            <Link to="/search">
              <button id="searchButton">Search Brand</button>
            </Link>
            <Link to="/categories">
              <button id="surfingButton">Surfing Brand</button>
            </Link>
          </div>
        </div>
      </main>

      {/* Brand Analysis Section */}
      <section className="scroll-section" id="brandVisuals">
        <div className="container">
          <h2>Our Analysis Methodology</h2>
          <p>Discover how CULTURA CLUB breaks down brand strategies to reveal the keys to market success and customer loyalty.</p>
          <div className="image-gallery">
            {/* 이미지를 추가할 수 있습니다 */}
          </div>
        </div>
      </section>

      {/* Data-Driven Insights Section */}
      <section className="scroll-section" id="popArtInfluence">
        <div className="container">
          <h2>Data-Driven Insights</h2>
          <p>Our comprehensive analysis combines market data, consumer psychology, and competitive intelligence to provide actionable insights about your favorite brands.</p>
          <div className="image-gallery">
            {/* 이미지를 추가할 수 있습니다 */}
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 CULTURA CLUB</p>
      </footer>
    </div>
  );
};

export default HomePage;
