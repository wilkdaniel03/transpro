from openai import OpenAI
import requests
import os
import sys
import json
from datetime import datetime


TOKEN = os.environ.get("OPENAI_TOKEN_OLD")
PROJECT_ID = os.environ.get("OPENAI_PROJ_ID")
OUT_PATH = os.environ.get("OUT_PATH")

client = OpenAI(api_key=TOKEN)


def main():
    print("Hello from data generator!")


def generate_employees(filename: str):
    with open(filename,"w") as file:
        print("prompting...")
        res = client.responses.create(
            model="gpt-4o",
            input=[
                { "role": "system", "content": "You are returning all data in a json format" },
                { "role": "system", "content": "You are generating random users in format: { name: str, surname: str, pesel: str, date_of_birth: str}" },
                { "role": "user", "content": "generate 100 users in rate: 70% polish and 30% ukrainian" }
            ]
        ).model_dump_json()
        data = json.loads(res)['output'][0]['content'][0]['text']
        data = str.splitlines(data)[1:-1]
        data = ''.join(data)
        data = json.loads(data)
        json.dump(data,file,indent=4)


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
    if PROJECT_ID is None:
        raise ValueError("Failed to load OPENAI_PROJ_ID")
    if OUT_PATH is None:
        raise ValueError("Failed to load OUT_PATH")
    main()
    if len(sys.argv) == 1:
        sys.exit()
    match sys.argv[1]:
        case "models": print(list_models())
        case "limits": print(get_limits())
        case "gen": generate_employees(OUT_PATH)
