from dataclasses import asdict
from sqlalchemy import select, func, insert
from fastapi import HTTPException
from connection import app, engine, EmployeeTable
from dto import Employee, EmployeeCreateInfo


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
