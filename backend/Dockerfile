# Use an official Python runtime as the parent image
FROM python:3.11

# Set the working directory in the container to /app
WORKDIR /usr/src/app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./app ./app

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable for FastAPI to run in production
ENV UVICORN_HOST=0.0.0.0
ENV UVICORN_PORT=8000
ENV UVICORN_WORKERS=1

# Command to run the application using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
