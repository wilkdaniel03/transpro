from openai import OpenAI
import requests
import os
import sys
import json
from datetime import datetime
from collections import ChainMap
from typing import Dict
import requests


TOKEN = os.environ.get("OPENAI_TOKEN")
OUT_PATH = os.environ.get("OUT_PATH")

API_URL = "http://localhost:8081"

client = OpenAI(api_key=TOKEN)


def main():
    print("Hello from data generator!")


def generate_employees():
    res = client.responses.create(
        model="gpt-4o",
        input=[
            { "role": "system", "content": "You are returning all data in a json format" },
            { "role": "system", "content": "You are generating random users in format: { name: str, surname: str, nationality: str, pesel: str, date_of_birth: str}" },
            { "role": "user", "content": "generate about a 100 users in rate: 50% polish and 10% ukrainian, 10% hungarian, 10% czech, 5% spanish, 5% italian" }
        ]
    ).model_dump_json()
    data = json.loads(res)['output'][0]['content'][0]['text']
    data = str.splitlines(data)[1:-1]
    data = ''.join(data)
    data = json.loads(data)
    return data


def generate_lots_employees(filename: str, n: int):
    print("prompting...")
    total = []
    for _ in range(n):
        generated: list[Dict] = []
        try:
            generated = generate_employees()
        except:
            pass
        finally:
            total.extend(generated)
    file = open(filename,"w")
    print("generated {} employees".format(len(total)))
    json.dump(total,file)


def generate_vehicles():
    res = client.responses.create(
        model="gpt-4o",
        input=[
            { "role": "system", "content": "You are returning all data in a json format" },
            { "role": "system", "content": "You are generating random vehicles in format: { mark: str, model: str, destiny: str}. Destiny can be one of: car,van,truck,bus" },
            { "role": "system", "content": "Mark can be any existent vehicles mark in the world and model can be any model of its mark"},
            { "role": "user", "content": "generate about a 100 vehicles" }
        ]
    ).model_dump_json()
    data = json.loads(res)['output'][0]['content'][0]['text']
    data = str.splitlines(data)[1:-1]
    data = ''.join(data)
    data = json.loads(data)
    return data


def generate_reservations():
    employees_count = requests.get("{}/employee/count".format(API_URL)).json()['data']
    vehicle_count = requests.get("{}/employee/count".format(API_URL)).json()['data']
    res = client.responses.create(
        model="gpt-4o",
        input=[
            { "role": "system", "content": "You are returning all data in a json format" },
            { "role": "system", "content": "You are generating random vehicles in format: { vehicle_id: int, employee_id: int, reservation_date: str, return_date: str}" },
            { "role": "system", "content": "vehicle_id is ranging from 1 to {}, employee_id is ranging from 1 to {}, reservation_date must be before return_date"},
            { "role": "user", "content": "generate about a 100 reservations" }
        ]
    ).model_dump_json()
    data = json.loads(res)['output'][0]['content'][0]['text']
    data = str.splitlines(data)[1:-1]
    data = ''.join(data)
    data = json.loads(data)
    return data


def generate_lots_vehicles(filename: str, n: int):
    print("prompting...")
    total = []
    for _ in range(n):
        generated: list[Dict] = []
        try:
            generated = generate_vehicles()
        except:
            pass
        finally:
            total.extend(generated)
    file = open(filename,"w")
    print("generated {} vehicles".format(len(total)))
    json.dump(total,file)


def generate_lots_reservations(filename: str, n: int):
    print("prompting...")
    total = []
    print("[",end="")
    sys.stdout.flush()
    for _ in range(n):
        generated: list[Dict] = []
        try:
            generated = generate_reservations()
        except:
            pass
        finally:
            total.extend(generated)
        print("*",end="")
        sys.stdout.flush()
    print("]",end="")
    sys.stdout.flush()
    file = open(filename,"w")
    print("generated {} reservations".format(len(total)))
    json.dump(total,file)


def list_models():
    headers = { "Authorization": "Bearer {}".format(TOKEN), "Content-Type": "application/json" }
    res = requests.get("https://api.openai.com/v1/models",headers=headers)
    return res.json()


def get_limits():
    headers = { "Authorization": "Bearer {}".format(TOKEN), "Content-Type": "application/json" }
    res = requests.get("https://api.openai.com/v1/organization/costs?start_time={}".format(int(datetime.now().timestamp())),headers=headers)
    return json.loads(res.json()['content'][0]['text'])


if __name__ == "__main__":
    if TOKEN is None:
        raise ValueError("Failed to load OPENAI_TOKEN")
    if OUT_PATH is None:
        raise ValueError("Failed to load OUT_PATH")
    main()
    if len(sys.argv) == 1:
        sys.exit()
    match sys.argv[1]:
        case "models": print(list_models())
        case "limits": print(get_limits())
        case "genemp": generate_lots_employees(OUT_PATH,100)
        case "genveh": generate_lots_vehicles(OUT_PATH,10)
        case "genres": generate_lots_reservations(OUT_PATH,10)
