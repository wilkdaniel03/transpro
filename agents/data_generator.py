import openai
import os


TOKEN = os.environ.get("OPENAI_TOKEN")


def main():
    print("Hello from data generator!")


if __name__ == "__main__":
    if TOKEN is None:
        raise ValueError("Failed to load OPENAI_TOKEN")
    main()
