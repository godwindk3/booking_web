from dotenv import load_dotenv
import os
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine

load_dotenv()

DB_URL=os.getenv("SQL_DB_URL")
engine = create_engine(DB_URL, echo=True)

Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)

print(DB_URL)

