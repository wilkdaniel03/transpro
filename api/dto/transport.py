from dataclasses import dataclass
from datetime import date


@dataclass
class Transport:
    id: int
    name: str
    type: str
    reservation: date
