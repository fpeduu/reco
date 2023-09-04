FROM python:3.10

WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt

EXPOSE $PORT

CMD uvicorn main:app --host=0.0.0.0 --port=${PORT}
