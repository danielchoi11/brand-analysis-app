from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Dict, Optional, Any, AsyncIterator
import asyncio
import json
import os
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path

# .env 파일 로드
load_dotenv()

app = FastAPI(title="Brand Analysis API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load brand data from JSON file
def load_brands():
    try:
        # Get the path to brands.json file
        current_dir = Path(__file__).parent
        brands_file = current_dir / "brands.json"
        
        # Open and load the JSON file
        with open(brands_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading brands.json: {e}")
        return {}  # Return empty dict in case of error

# Load brand data
brands = load_brands()

# Get categories from brands
def generate_categories():
    categories = {}
    for brand_id, brand_data in brands.items():
        category = brand_data.get("category")
        if category not in categories:
            categories[category] = []
        categories[category].append({
            "id": brand_id,
            "name": brand_data["name"]
        })
    return categories

# Generate categories from brands
categories = generate_categories()


@app.get("/")
def read_root():
    return {"message": "Welcome to Brand Analysis API"}


@app.get("/brands/")
def get_all_brands():
    return {"brands": list(brands.keys())}


@app.get("/brands/{brand_id}")
def get_brand(brand_id: str):
    brand_id = brand_id.lower()
    if brand_id not in brands:
        raise HTTPException(status_code=404, detail="Brand not found")
    return {"brand": brands[brand_id]}


@app.get("/categories/")
def get_categories():
    return {"categories": categories}


@app.get("/categories/{category_name}")
def get_brands_by_category(category_name: str):
    category_name = category_name.title()  # Capitalize first letter
    if category_name not in categories:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"brands": categories[category_name]}


# OpenAI 클라이언트 초기화
openai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


async def generate_brand_analysis(query: str) -> AsyncIterator[str]:
    """OpenAI API를 사용하여 브랜드 분석 정보를 스트리밍합니다."""
    
    # 브랜드 분석 프롬프트 준비
    prompt = f"""
    다음 브랜드에 대한 분석 정보를 제공해주세요: {query}
    
    <template>
    ## 브랜드 역사
    ### 브랜드 창립 국가 및 창립일
    ### 브랜드 창립자  
    ## 브랜드 아이덴티티 
    ### 브랜드 미션 
    ### 브랜드 비전
    ### 브랜드 가치
    ## 사업 분야
    ### 주요 사업
    ### 비즈니스 모델
    ## 브랜드 커뮤니케이션 전략 및 마케팅 방식
    ### 최신의 마케팅 전략
    ### 최근 고객 반응
    ## 경쟁사 대비 차별화 요소
    ### 경쟁사 목록
    ### 차별화 요소
    ## 최근 브랜드 상황
    ### 최근 이슈
    ### 미래 전략
    </template>

    위 템플릿을 바탕으로 웹 검색 결과만을 이용하여 정보를 자세하고 구체적으로 제공해주세요.
    대답하지말고 템플릿에 대한 응답만 작성해주세요.
    """
    
    try:
        # OpenAI 스트리밍 응답 생성
        stream = openai_client.chat.completions.create(
            model="gpt-4.1",
            messages=[{"role": "user", "content": prompt}],
            stream=True
        )
        
        for chunk in stream:
            if chunk.choices and chunk.choices[0].delta.content:
                content = chunk.choices[0].delta.content
                # SSE 형식에 맞게 data: 접두사 추가
                yield f"data: {json.dumps({'type': 'analysis_chunk', 'data': content})}\n\n"
                await asyncio.sleep(0.01)  # 스트리밍 속도 조절
        
        # 응답 완료 신호 (SSE 형식)
        yield f"data: {json.dumps({'type': 'analysis_complete'})}\n\n"
        
    except Exception as e:
        # 오류 신호 (SSE 형식)
        print(f"분석 중 오류 발생: {e}")
        yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"


@app.get("/stream-search/{query}")
async def stream_brand_search(query: str):
    """브랜드 검색 결과를 스트리밍하는 엔드포인트"""
    return StreamingResponse(
        generate_brand_analysis(query),
        media_type="text/event-stream"
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
