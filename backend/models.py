from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Float,
    Date,
    ForeignKey,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    predictions = relationship(
        "PredictionHistory", back_populates="user", cascade="all, delete-orphan"
    )
    moods = relationship(
        "MoodEntry", back_populates="user", cascade="all, delete-orphan"
    )


class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    predicted_stress_level = Column(String, nullable=False)  # derived 4-tier label
    raw_stress_level = Column(String, nullable=True)  # raw model output (High/Normal)
    confidence = Column(Float, nullable=False)

    sleep_hours = Column(Float, nullable=True)
    daily_phone_hours = Column(Float, nullable=True)
    social_media_hours = Column(Float, nullable=True)
    work_productivity_score = Column(Float, nullable=True)
    caffeine_intake_cups = Column(Float, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="predictions")


class MoodEntry(Base):
    __tablename__ = "mood_entries"
    __table_args__ = (
        UniqueConstraint("user_id", "entry_date", name="uq_user_mood_date"),
    )

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    entry_date = Column(Date, nullable=False)
    mood = Column(String, nullable=False)

    user = relationship("User", back_populates="moods")