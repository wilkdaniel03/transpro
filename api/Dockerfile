FROM python:3.13-alpine3.21
COPY --from=docker.io/astral/uv:latest /uv /uvx /bin/
WORKDIR /app
ADD . ./
RUN uv sync
ENV LW2_DB_PORT="3306"
ENV LW2_DB_USER="root"
ENV LW2_DB_PASSWORD="toor"
ENV LW2_DB_NAME="lw2"
CMD ["uv","run","main.py"]
