from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 设置OpenAI API密钥
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源，生产环境中应该设置具体的域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

@app.post("/chat")
async def chat(message: Message):
    try:
        # 调用OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "你是一个AI助手，负责回答用户关于AI工具的问题。请保持回答简洁明了。"},
                {"role": "user", "content": message.message}
            ]
        )
        
        # 提取AI的回复
        reply = response.choices[0].message.content
        
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
