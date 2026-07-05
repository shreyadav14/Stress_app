from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
import schemas
from deps import get_db, get_current_user

router = APIRouter(prefix="/history", tags=["history"])


def _to_prediction_out(record: models.PredictionHistory) -> schemas.PredictionOut:
    return schemas.PredictionOut(
        id=record.id,
        created_at=record.created_at,
        Predicted_Stress_Level=record.predicted_stress_level,
        Raw_Stress_Level=record.raw_stress_level,
        Confidence=record.confidence,
        Sleep_Hours=record.sleep_hours,
        Daily_Phone_Hours=record.daily_phone_hours,
        Social_Media_Hours=record.social_media_hours,
        Work_Productivity_Score=record.work_productivity_score,
        Caffeine_Intake_Cups=record.caffeine_intake_cups,
    )


@router.post("/predictions", response_model=schemas.PredictionOut, status_code=201)
def save_prediction(
    entry: schemas.PredictionCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    record = models.PredictionHistory(
        user_id=current_user.id,
        predicted_stress_level=entry.Predicted_Stress_Level,
        raw_stress_level=entry.Raw_Stress_Level,
        confidence=entry.Confidence,
        sleep_hours=entry.Sleep_Hours,
        daily_phone_hours=entry.Daily_Phone_Hours,
        social_media_hours=entry.Social_Media_Hours,
        work_productivity_score=entry.Work_Productivity_Score,
        caffeine_intake_cups=entry.Caffeine_Intake_Cups,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return _to_prediction_out(record)


@router.get("/predictions", response_model=List[schemas.PredictionOut])
def get_predictions(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    records = (
        db.query(models.PredictionHistory)
        .filter(models.PredictionHistory.user_id == current_user.id)
        .order_by(models.PredictionHistory.created_at.asc())
        .all()
    )
    return [_to_prediction_out(r) for r in records]


@router.put("/mood", response_model=schemas.MoodOut)
def set_mood(
    entry: schemas.MoodSet,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    existing = (
        db.query(models.MoodEntry)
        .filter(
            models.MoodEntry.user_id == current_user.id,
            models.MoodEntry.entry_date == entry.entry_date,
        )
        .first()
    )
    if existing:
        existing.mood = entry.mood
        db.commit()
        db.refresh(existing)
        return existing

    record = models.MoodEntry(
        user_id=current_user.id,
        entry_date=entry.entry_date,
        mood=entry.mood,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/mood", response_model=List[schemas.MoodOut])
def get_moods(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return (
        db.query(models.MoodEntry)
        .filter(models.MoodEntry.user_id == current_user.id)
        .all()
    )