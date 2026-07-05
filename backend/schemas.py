from datetime import date, datetime
from typing import Optional, List

from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    name: str = Field(min_length=1)
    email: EmailStr
    password: str = Field(min_length=6)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ---------- Prediction history ----------


class PredictionCreate(BaseModel):
    Predicted_Stress_Level: str
    Raw_Stress_Level: Optional[str] = None
    Confidence: float
    Sleep_Hours: Optional[float] = None
    Daily_Phone_Hours: Optional[float] = None
    Social_Media_Hours: Optional[float] = None
    Work_Productivity_Score: Optional[float] = None
    Caffeine_Intake_Cups: Optional[float] = None


class PredictionOut(PredictionCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ---------- Mood ----------


class MoodSet(BaseModel):
    entry_date: date
    mood: str


class MoodOut(BaseModel):
    entry_date: date
    mood: str

    class Config:
        from_attributes = True