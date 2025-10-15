import uvicorn
from fastapi import FastAPI
from sqlmodel import create_engine
import os


DB_PORT = os.environ.get("LW2_DB_PORT")
DB_PASSWORD = os.environ.get("LW2_DB_ROOT_PASSWORD")

app = FastAPI()


@app.get("/")
def main():
    return {"status":"OK"}


if __name__ == "__main__":
    if any([DB_PORT == None,DB_PASSWORD == None]):
        raise ValueError("Failed to load env variables necessary for database connection")
    uvicorn.run("main:app",port=8080,reload=True)
