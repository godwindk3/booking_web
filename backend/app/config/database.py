import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER_NAME")
DB_NAME = os.getenv("DB_NAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT")


connect = psycopg2.connect(
    database=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    port=DB_PORT,
    host=DB_HOST
)


def main():
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM users")
    print(cursor.fetchall())


if __name__ == "__main__":
    main()
