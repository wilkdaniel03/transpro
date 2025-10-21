from dataclasses import dataclass


@dataclass
class Vehicle:
    id: int
    mark: str
    model: str
    destiny: str


@dataclass
class VehicleCounted:
    mark: str
    model: str
    destiny: str
    count: int
