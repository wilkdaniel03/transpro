from sqlalchemy import MetaData, create_engine
from config import Config
from fastapi import FastAPI
import fastapi.middleware.cors as cors
import model


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
