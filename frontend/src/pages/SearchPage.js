import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './SearchPage.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [brandAnalysis, setBrandAnalysis] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingDone, setStreamingDone] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError('검색어를 입력해주세요');
      return;
    }

    // 이전 스트림이 있으면 중단
    if (streamRef.current) {
      streamRef.current.close();
    }
    
    // 상태 초기화
    setIsLoading(true);
    setError('');
    setBrandAnalysis('');
    setStreamingDone(false);
    setCurrentBrand(searchTerm);
    setIsStreaming(true);
    
    try {
      // EventSource를 사용하여 서버 보낸 이벤트 스트림 설정
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const eventSource = new EventSource(`${apiUrl}/stream-search/${searchTerm}`);
      streamRef.current = eventSource;
      setIsLoading(false); // 스트림 연결이 성공하면 로딩 상태 해제
      
      // 메시지 이벤트 핸들러 - SSE 이벤트를 처리
      eventSource.onmessage = (event) => {
        try {
          // 이벤트 데이터가 있는지 확인
          if (!event.data) {
            console.warn('빈 이벤트 데이터 수신');
            return;
          }
          
          console.log('SSE 데이터 수신:', event.data);
          const data = JSON.parse(event.data);
          
          // 메시지 타입에 따른 처리
          switch(data.type) {
            case 'brand_found':
              // 기존 브랜드 정보 처리
              console.log('브랜드 정보:', data.data);
              break;
              
            case 'analysis_chunk':
              // 분석 청크 추가
              setBrandAnalysis(prev => prev + data.data);
              break;
              
            case 'analysis_complete':
              // 스트리밍 완료
              console.log('분석 완료');
              setIsStreaming(false);
              setStreamingDone(true);
              eventSource.close();
              streamRef.current = null;
              break;
              
            case 'error':
              // 오류 처리
              console.error('분석 오류:', data.message);
              setError(`분석 중 오류 발생: ${data.message}`);
              setIsStreaming(false);
              eventSource.close();
              streamRef.current = null;
              break;
              
            default:
              console.log('알 수 없는 이벤트 타입:', data.type);
          }
        } catch (err) {
          console.error('스트리밍 데이터 처리 오류:', err);
        }
      };
      
      // 에러 핸들러
      eventSource.onerror = (err) => {
        console.error('스트리밍 연결 오류:', err);
        setError('브랜드 분석 스트리밍 중 오류가 발생했습니다');
        setIsStreaming(false);
        eventSource.close();
        streamRef.current = null;
      };
      
    } catch (err) {
      console.error('스트리밍 설정 오류:', err);
      setError('브랜드 분석 스트리밍을 설정하는 중 오류가 발생했습니다');
      setIsStreaming(false);
      setIsLoading(false);
    }
  };
  
  // 컴포넌트 언마운트 시 스트림 정리
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.close();
      }
    };
  }, []);

  const categories = [
    { id: 'technology', name: 'Technology' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'food_beverage', name: 'Food & Beverage' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'luxury', name: 'Luxury' }
  ];

  const handleCategoryClick = (category) => {
    setSearchTerm(category);
    // You could directly search using the category here as well
  };

  return (
    <div className="search-page">

      <main className="search-main">
        <div className="search-main-container">
          <div className="search-container">
            <h1>Find Your Brand</h1>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="브랜드 이름을 입력하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">검색</button>
            </form>
            
            {error && <div className="alert">{error}</div>}
          </div>
          
          {isLoading ? (
            <div className="loader">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="search-results">
              {/* 브랜드 분석 결과 표시 */}
              {currentBrand && (
                <div className="brand-analysis-container">
                  <h2>{currentBrand} 브랜드 분석</h2>
                  {isStreaming && <div className="streaming-indicator">분석 중...</div>}
                  <div className="analysis-content">
                    {brandAnalysis ? (
                      <div className="analysis-text markdown-content">
                        <ReactMarkdown>{brandAnalysis}</ReactMarkdown>
                      </div>
                    ) : isStreaming ? (
                      <div className="loader"></div>
                    ) : null}
                  </div>
                  {streamingDone && (
                    <div className="streaming-complete">분석이 완료되었습니다.</div>
                  )}
                </div>
              )}
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

export default SearchPage;
