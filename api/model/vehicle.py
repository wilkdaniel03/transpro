from sqlalchemy import Table, Column, MetaData, Integer, String


def vehicle_table_factory(metadata: MetaData) -> Table:
    return Table(
        "vehicle",
        metadata,
        Column("id",Integer,primary_key=True,autoincrement=True),
        Column("mark",String(50),nullable=False),
        Column("model",String(50),nullable=False),
        Column("destiny",String(50),nullable=False)
    )
