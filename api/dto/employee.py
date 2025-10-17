from dataclasses import dataclass
from datetime import date


@dataclass
class Employee:
    id: int
    name: str
    surname: str
    pesel: str
    date_of_birth: str
