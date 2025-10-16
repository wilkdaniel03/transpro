from sqlalchemy import Table, MetaData, Column, Integer, ForeignKey, Date, CheckConstraint


def reservation_table_factory(metadata: MetaData) -> Table:
    return Table(
        "reservation",
        metadata,
        Column("id",Integer,primary_key=True,autoincrement=True),
        Column("vehicle_id",Integer,ForeignKey("vehicle.id"),nullable=False),
        Column("employee_id",Integer,ForeignKey("employee.id"),nullable=False),
        Column("reservation_date",Date,nullable=False),
        Column("return_date",Date,nullable=False),
        CheckConstraint("return_date>reservation_date")
    )
