from sqlalchemy import Table, MetaData, Column, Integer, String, Date


def transport_table_factory(metadata: MetaData) -> Table:
    return Table(
        "transport",
        metadata,
        Column("id",Integer,autoincrement=True,primary_key=True),
        Column("name",String(50),nullable=False),
        Column("type",String(50),nullable=False),
        Column("reservation",Date,nullable=False)
    )
