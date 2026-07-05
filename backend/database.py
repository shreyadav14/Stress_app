import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Local dev: no DATABASE_URL set, falls back to SQLite (a file on disk).
# Production: set DATABASE_URL to a real Postgres connection string
# (e.g. from Supabase or Render's managed Postgres) as an environment
# variable — never commit a real connection string to source control.
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./somnia.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()