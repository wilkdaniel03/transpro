from sqlalchemy import select, func
from connection import app, engine, EmployeeTable, VehicleTable, ReservationTable
from dto import Transport


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
