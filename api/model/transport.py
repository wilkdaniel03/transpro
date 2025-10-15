from sqlmodel import Field, SQLModel
from datetime import datetime


class Transport(SQLModel,table=True):
    id: int = Field(primary_key=True)
    name: str
    type: str
    reservation: datetime
