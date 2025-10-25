from sqlalchemy import select, func
from connection import app, engine, VehicleTable
from dto import Vehicle, VehicleCounted


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
