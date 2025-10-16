import uvicorn
from fastapi import FastAPI
from fastapi.middleware import cors
import json
from datetime import date
from typing import Dict, Any
from model.transport import transport_table_factory
from sqlalchemy import create_engine, Table, MetaData, Connection, select, insert
from dataclasses import dataclass
from config import Config


cfg = Config()

app = FastAPI()

app.add_middleware(
    cors.CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

metadata = MetaData()
TransportTable = transport_table_factory(metadata)
engine = create_engine(
    "mysql+pymysql://{}:{}@127.0.0.1:{}/{}".format(cfg.db.user,cfg.db.password,cfg.db.port,cfg.db.name))
conn = engine.connect()


@dataclass
class Transport:
    id: int
    name: str
    type: str
    reservation: date


@app.get("/")
def main():
    return {"status":"OK"}


@app.get("/transport")
def get_all_transports():
    data_raw = conn.execute(select(TransportTable)).fetchall()
    data = [Transport(*el) for el in data_raw]
    return {"data":data}


def load_transport_data() -> Dict[str,Any]:
    data_as_str: str
    with open("./data.json","r") as file:
        lines = []
        for l in file:
            lines.append(l)
        data_as_str = "".join(lines)
    return json.loads(data_as_str)['transport']


if __name__ == "__main__":
    should_reload = cfg.mode != "PROD"
    transport_data = load_transport_data()
    if cfg.mode == "PROD":
        metadata.drop_all(engine)
        metadata.create_all(engine)
        conn.execute(insert(TransportTable),transport_data)
        conn.commit()
    uvicorn.run("main:app",port=8081,reload=should_reload)
