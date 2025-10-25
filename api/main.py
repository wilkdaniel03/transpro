from sqlalchemy import select, insert
import uvicorn
from random import randint
from typing import Dict, Any
import time
import json
from connection import app, engine, cfg, metadata, EmployeeTable, VehicleTable, ReservationTable
from routes import employee, vehicle, reservation


@app.get("/")
def main():
    return {"status":"OK"}


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

    uvicorn.run("main:app",port=8081,reload=should_reload,host="0.0.0.0")
