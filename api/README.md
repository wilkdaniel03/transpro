# API

### Prerequisites
```bash
>=python3.10
uv
```

### Environment variables needed 
* LW2_DB_PORT
* LW2_DB_USER
* LW2_DB_PASSWORD
* LW2_DB_NAME

### Setup
```bash
uv sync
uv run main.py
```

### Docker
```bash
docker build -t transport-api:1.0 .
docker run --name api -d -p 8081:8081 transport-api:1.0
```
