FROM python:3.11

WORKDIR /usr/src/app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./app .

EXPOSE 8000

ENV UVICORN_HOST=0.0.0.0
ENV UVICORN_PORT=8000
ENV UVICORN_WORKERS=1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
