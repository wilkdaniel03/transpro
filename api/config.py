import os
from dataclasses import dataclass


@dataclass
class DatabaseConfig:
    port: str
    user: str
    password: str
    name: str

    def __getitem__(self,idx:int) -> str:
        match idx:
            case 0: return self.port
            case 1: return self.user
            case 2: return self.password
            case 3: return self.name
            case _: raise ValueError("Failed to find index {} in DatabaseConfig".format(idx))

    def __setitem__(self,idx:int,val:str) -> None:
        match idx:
            case 0: self.port = val
            case 1: self.user = val
            case 2: self.password = val
            case 3: self.name = val
            case _: raise ValueError("Failed to find index {} in DatabaseConfig".format(idx))


class Config:
    db: DatabaseConfig
    mode: str

    def __init__(self):
        self.db = DatabaseConfig("","","","")
        self.mode = ""
        self.load_env()

    def load_env(self):
        db_keys = ["LW2_DB_PORT","LW2_DB_USER","LW2_DB_PASSWORD","LW2_DB_NAME"]
        mode_key = "LW2_API_MODE"
        for i,k in enumerate(db_keys):
            found = os.environ.get(k)
            if found is None:
                raise ValueError("Failed to find env variable {}".format(k))
            else:
                self.db[i] = found
        mode_found = os.environ.get(mode_key)
        if mode_found is None:
            self.mode = "PROD"
        else:
            self.mode = mode_found
