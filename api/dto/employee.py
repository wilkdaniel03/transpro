from dataclasses import dataclass
from datetime import date
from typing import Self


@dataclass
class Employee:
    id: int
    name: str
    surname: str
    pesel: str
    date_of_birth: str


@dataclass
class EmployeeCreateInfo:
    name: str
    surname: str
    pesel: str
    date_of_birth: str

    @classmethod
    def from_employee(cls,employee: Employee) -> Self:
        return cls(employee.name,employee.surname,employee.pesel,employee.date_of_birth)
