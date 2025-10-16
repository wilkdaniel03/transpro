from sqlalchemy import Table, MetaData, Column, Integer, String, Date


def employee_table_factory(metadata: MetaData) -> Table:
    return Table(
        "employee",
        metadata,
        Column("id",Integer,primary_key=True,autoincrement=True),
        Column("name",String(50),nullable=False),
        Column("surname",String(50),nullable=False),
        Column("pesel",String(11),nullable=False),
        Column("date_of_birth",Date,nullable=False)
    )
