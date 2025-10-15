import uvicorn
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def main():
    return {"status":"OK"}

if __name__ == "__main__":
    uvicorn.run("main:app",port=8080,reload=True)
