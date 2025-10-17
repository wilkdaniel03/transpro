import uvicorn
from fastapi import FastAPI
from fastapi.middleware import cors
import json
from typing import Dict, Any
import model
from sqlalchemy import create_engine, Table, MetaData, Connection, select, insert
from config import Config
from dto import Transport, Employee, Vehicle


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
EmployeeTable = model.employee_table_factory(metadata)
VehicleTable = model.vehicle_table_factory(metadata)
ReservationTable = model.reservation_table_factory(metadata)
engine = create_engine(
    "mysql+pymysql://{}:{}@127.0.0.1:{}/{}".format(cfg.db.user,cfg.db.password,cfg.db.port,cfg.db.name))


@app.get("/")
def main():
    return {"status":"OK"}


@app.get("/employee")
def get_all_employees():
    with engine.connect() as conn:
        query = select(EmployeeTable)
        data_raw = conn.execute(query).fetchall()
        data = [Employee(*el) for el in data_raw]
        return { "data": data }


@app.get("/vehicle")
def get_all_vehicles():
    with engine.connect() as conn:
        query = select(VehicleTable)
        data_raw = conn.execute(query).fetchall()
        data = [Vehicle(*el) for el in data_raw]
        return { "data": data }


@app.get("/transport")
def get_all_transports():
    with engine.connect() as conn:
        query = select(
            ReservationTable.c.id,
            EmployeeTable.c.name,
            EmployeeTable.c.surname,
            VehicleTable.c.destiny,
            ReservationTable.c.reservation_date,
            ReservationTable.c.return_date
        ).select_from(
            ReservationTable
        ).join(
            EmployeeTable,ReservationTable.c.employee_id == EmployeeTable.c.id
        ).join(
            VehicleTable,ReservationTable.c.vehicle_id == VehicleTable.c.id
        ).order_by(ReservationTable.c.id)

        data_raw = conn.execute(query).fetchall()
        data = [Transport(el[0],"{} {}".format(el[1],el[2]),el[3],"{} - {}".format(el[4],el[5])) for el in data_raw]
        return { "data": data }


def load_transport_data() -> Dict[str,Any]:
    data_as_str: str
    with open("./data.json","r") as file:
        lines = []
        for l in file:
            lines.append(l)
        data_as_str = "".join(lines)
    return json.loads(data_as_str)


def init_db() -> None:
    data = load_transport_data()
    metadata.drop_all(engine)
    metadata.create_all(engine)
    conn = engine.connect()
    conn.execute(insert(EmployeeTable),data['employee'])
    conn.execute(insert(VehicleTable),data['vehicle'])
    conn.execute(insert(ReservationTable),data['reservation'])
    conn.commit()
    conn.close()


if __name__ == "__main__":
    should_reload = cfg.mode != "PROD"
    if cfg.mode == "PROD":
        init_db()
    uvicorn.run("main:app",port=8081,reload=should_reload)
