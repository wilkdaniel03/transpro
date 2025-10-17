from dataclasses import dataclass


@dataclass
class Transport:
    id: int
    name: str
    type: str
    reservation: str
