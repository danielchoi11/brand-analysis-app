# BrandInsight - 브랜드 검색 및 분석 웹사이트

BrandInsight는 브랜드 정보를 검색하고 분석할 수 있는 웹 애플리케이션입니다. 사용자는 브랜드를 검색하여 창립자, 설립일, 브랜드 미션, 커뮤니케이션 전략, 진출 국가, 매출액, 상장 여부, 브랜드 무드 등의 정보를 구조화된 형태로 확인할 수 있습니다. 또한 동일 카테고리의 브랜드를 비교 분석할 수 있는 기능을 제공합니다.

## 기술 스택

### 프론트엔드
- React
- React Router
- Axios

### 백엔드
- FastAPI
- Python

## 프로젝트 구조

```
brand-analysis-app/
├── frontend/            # React 프론트엔드
├── backend/             # FastAPI 백엔드
└── README.md
```

## 설치 및 실행 방법

### 백엔드 설정

1. 백엔드 디렉토리로 이동
```bash
cd backend
```

2. 가상 환경 생성 및 활성화 (선택사항)
```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate  # Windows
```

3. 필요한 패키지 설치
```bash
pip install -r requirements.txt
```

4. 서버 실행
```bash
uvicorn main:app --reload
```

서버는 http://localhost:8000 에서 실행됩니다.

### 프론트엔드 설정

1. 새 터미널 창을 열고 프론트엔드 디렉토리로 이동
```bash
cd frontend
```

2. 필요한 패키지 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm start
```

프론트엔드는 http://localhost:3000 에서 실행됩니다.

## 주요 기능

- **브랜드 검색**: 브랜드 이름으로 검색하여 상세 정보 확인
- **카테고리별 브랜드 탐색**: 카테고리별로 브랜드 목록 확인
- **브랜드 상세 정보**: 각 브랜드의 상세 정보 제공 (창립자, 설립일, 미션, 전략 등)
- **브랜드 비교 분석**: 동일 카테고리 내 브랜드 간 비교 분석

## API 엔드포인트

- `GET /brands/`: 모든 브랜드 목록 조회
- `GET /brands/{brand_id}`: 특정 브랜드 상세 정보 조회
- `GET /categories/`: 모든 카테고리 조회
- `GET /categories/{category_name}`: 특정 카테고리의 브랜드 목록 조회
- `GET /search/{query}`: 브랜드 검색

## 향후 개발 계획

- 사용자 계정 및 인증 시스템
- 브랜드 비교 기능 강화
- 브랜드 추가 및 정보 업데이트 기능
- 통계 및 분석 대시보드
- 모바일 앱 개발
>>>>>>> e24ece3 (Initial commit)
