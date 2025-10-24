import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware import cors
import json
from typing import Dict, Any
import model
from sqlalchemy import create_engine, Table, MetaData, Connection, select, insert, func
from config import Config
from dto import Transport, Employee, EmployeeCreateInfo, Vehicle, VehicleCounted
from dataclasses import asdict
from random import randint
import time


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


@app.get("/employee/count")
def get_employees_count():
    with engine.connect() as conn:
        query = select(func.count(EmployeeTable.c.id))
        count = conn.execute(query).fetchall()[0][0]
        return { "data": count }


@app.get("/employee/range/{lower}-{upper}")
def get_employees_in_range(lower: int, upper: int):
    with engine.connect() as conn:
        q1 = select(EmployeeTable).limit(upper).alias("A")
        q2 = select(q1).order_by(q1.c.id.desc()).limit(upper-lower + 1).alias("B")
        q3 = select(q2).order_by(q2.c.id)
        data_raw = conn.execute(q3).fetchall()
        data = [Employee(*el) for el in data_raw]
        return { "data": data }


@app.get("/employee/{id}")
def get_one_employee(id: int):
    with engine.connect() as conn:
        query = select(EmployeeTable).where(EmployeeTable.c.id == id);
        data_raw = conn.execute(query).fetchone()
        if data_raw is None:
            raise HTTPException(404,"Failed to find employee with id {}".format(id))
        data = Employee(*data_raw)
        return { "data": data }


@app.post("/employee")
def create_employee(data: EmployeeCreateInfo):
    if not len(data.pesel) == 11 and all([(c >= '0' and c <= '9') for c in data.pesel]):
        raise HTTPException(400,"pesel have to be 11 digits length")
    with engine.connect() as conn:
        query = insert(EmployeeTable)
        try:
            conn.execute(query,asdict(data))
        except:
            conn.rollback()
        finally:
            conn.commit()
        return { "status": "success" }


@app.get("/vehicle")
def get_all_vehicles():
    with engine.connect() as conn:
        query = select(VehicleTable)
        data_raw = conn.execute(query).fetchall()
        data = [Vehicle(*el) for el in data_raw]
        return { "data": data }


@app.get("/v2/vehicle")
def get_all_vehicles_with_count():
    with engine.connect() as conn:
        query = select(
            VehicleTable.c.mark,
            VehicleTable.c.model,
            VehicleTable.c.destiny,
            func.count(VehicleTable.c.id)
        ).group_by(
            VehicleTable.c.mark,
            VehicleTable.c.model,
            VehicleTable.c.destiny
        )
        data_raw = conn.execute(query).fetchall()
        data = [VehicleCounted(*el) for el in data_raw]
        return { "data": data }


@app.get("/vehicle/count")
def get_vehicles_count():
    with engine.connect() as conn:
        query = select(func.count(VehicleTable.c.id))
        count = conn.execute(query).fetchall()[0][0]
        return { "data": count }


@app.get("/vehicle/range/{lower}-{upper}")
def get_vehicles_in_range(lower: int, upper: int):
    with engine.connect() as conn:
        q1 = select(VehicleTable).limit(upper).alias("A")
        q2 = select(q1).order_by(q1.c.id.desc()).limit(upper-lower + 1).alias("B")
        q3 = select(q2).order_by(q2.c.id)
        data_raw = conn.execute(q3).fetchall()
        data = [Vehicle(*el) for el in data_raw]
        return { "data": data }
    

@app.get("/v2/vehicle/range/{lower}-{upper}")
def get_vehicles_with_count_in_range(lower: int, upper: int):
    with engine.connect() as conn:
        q1 = select(
            VehicleTable.c.mark,
            VehicleTable.c.model,
            VehicleTable.c.destiny,
            func.count(VehicleTable.c.id)
        ).group_by(
            VehicleTable.c.mark,
            VehicleTable.c.model,
            VehicleTable.c.destiny,
        ).alias("A")
        q2 = select(q1).order_by(q1.c.count.desc()).alias("B")
        q3 = select(q2).limit(upper).alias("C")
        q4 = select(q3).limit(upper-lower + 1)
        data_raw = conn.execute(q4).fetchall()
        data = [VehicleCounted(*el) for el in data_raw]
        return { "data": data }


@app.get("/reservation")
def get_all_reservations():
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


@app.get("/reservation/count")
def get_reservations_count():
    with engine.connect() as conn:
        query = select(func.count(ReservationTable.c.id))
        count = conn.execute(query).fetchall()[0][0]
        return { "data": count }


@app.get("/reservation/range/{lower}-{upper}")
def get_reservations_in_range(lower: int, upper: int):
    with engine.connect() as conn:
        q1 = select(
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
        ).order_by(ReservationTable.c.id).limit(upper).alias("A")
        q2 = select(q1).order_by(q1.c.id.desc()).limit(upper-lower + 1).alias("B")
        q3 = select(q2).order_by(q2.c.id)
        data_raw = conn.execute(q3).fetchall()
        data = [Transport(el[0],"{} {}".format(el[1],el[2]),el[3],"{} - {}".format(el[4],el[5])) for el in data_raw]
        return { "data": data }


def load_transport_data() -> Dict[str,Any]:
    file = open("./data.json","r")
    return json.load(file)


def load_employees() -> list[Dict[str,Any]]:
    file = open("./employees.json","r")
    data = json.load(file)
    file.close()
    return data


def load_vehicles() -> list[Dict[str,Any]]:
    file = open("./vehicles.json","r")
    data = json.load(file)
    file.close()
    return data


def load_reservations() -> list[Dict[str,Any]]:
    file = open("./reservations.json","r")
    data = json.load(file)
    file.close()
    return data


def init_db() -> None:
    data = load_transport_data()
    employees = load_employees()
    vehicles = load_vehicles()
    reservations = load_reservations()
    metadata.drop_all(engine)
    metadata.create_all(engine)
    conn = engine.connect()
    #conn.execute(insert(EmployeeTable),data['employee'])
    #conn.execute(insert(VehicleTable),data['vehicle'])
    conn.commit()

    print("Loading employee table...")

    for emp in employees:
        try:
            conn.execute(insert(EmployeeTable),emp)
        except:
            conn.rollback()
        finally:
            conn.commit()

    print("Loading vehicle table...")

    for veh in vehicles:
        try:
            veh_list = [veh for _ in range(randint(5,17))]
            conn.execute(insert(VehicleTable),veh_list)
        except:
            conn.rollback()
        finally:
            conn.commit()

    print("Loading reservation table...")

    for res in reservations:
        try:
            conn.execute(insert(ReservationTable),res)
        except:
            conn.rollback()
        finally:
            conn.commit()

    #conn.execute(insert(ReservationTable),data['reservation'])
    #conn.commit()

    conn.close()


if __name__ == "__main__":
    should_reload = cfg.mode != "PROD"
    while True:
        try:
            init_db()
        except:
            print("failed")
            time.sleep(1)
        else:
            break

    uvicorn.run("main:app",port=8081,reload=should_reload)
