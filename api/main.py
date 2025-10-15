import uvicorn
from fastapi import FastAPI
import os
from model.transport import transport_table_factory
from sqlalchemy import create_engine, Table, MetaData, Connection


DB_PORT = os.environ.get("LW2_DB_PORT")
DB_USER = os.environ.get("LW2_DB_USER")
DB_PASSWORD = os.environ.get("LW2_DB_PASSWORD")
DB_NAME = os.environ.get("LW2_DB_NAME")

app = FastAPI()

TransportTable: Table

@app.get("/")
def main():
    return {"status":"OK"}


if __name__ == "__main__":
    if any([DB_PORT == None,DB_USER == None,DB_PASSWORD == None,DB_NAME == None]):
        raise ValueError("Failed to load env variables necessary for database connection")
    metadata = MetaData()
    TransportTable = transport_table_factory(metadata)
    engine = create_engine("mysql+pymysql://{}:{}@127.0.0.1:{}/{}".format(DB_USER,DB_PASSWORD,DB_PORT,DB_NAME))
    conn = engine.connect()
    metadata.drop_all(engine)
    metadata.create_all(engine)
    #uvicorn.run("main:app",port=8080,reload=True)
