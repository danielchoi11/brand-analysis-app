import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [aboutUsModalOpen, setAboutUsModalOpen] = useState(false);
  
  const openAboutUsModal = () => setAboutUsModalOpen(true);
  const closeAboutUsModal = () => setAboutUsModalOpen(false);

  return (
    <>
      <header className='page-header'>
        <Link to="/">
          <div className="logo">CULTURA CLUB</div>
        </Link>
        <nav>
          <Link to="/search">Search</Link>
          <Link to="/categories">Categories</Link>
          <a href="#" onClick={(e) => { e.preventDefault(); openAboutUsModal(); }}>ABOUT US</a>
        </nav>
      </header>



      {/* About Us Modal */}
      {aboutUsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeAboutUsModal}>&times;</span>
            <h2>About Us</h2>
            <p>CULTURA CLUB is a brand analysis platform that helps you understand and discover global brands.</p>
            <p>Our mission is to spread innovative ideas through detailed analysis of brand elements, strategies, and cultural impact.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
