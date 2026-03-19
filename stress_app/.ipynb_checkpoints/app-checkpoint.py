from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from enum import Enum
import joblib
import pandas as pd
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load trained model
model = joblib.load("final_model.pkl")


# Enum for strict validation
class GenderEnum(str, Enum):
    Male = "Male"
    Female = "Female"
    Other = "Other"


# Input Schema
class StressInput(BaseModel):
    Age: int = Field(ge=10, le=100)
    Gender: GenderEnum
    Occupation: str
    Device_Type: str
    Daily_Phone_Hours: float
    Social_Media_Hours: float
    Work_Productivity_Score: float
    Sleep_Hours: float = Field(ge=0, le=24)
    App_Usage_Count: int
    Caffeine_Intake_Cups: int
    Weekend_Screen_Time_Hours: float


# Output Schema
class StressOutput(BaseModel):
    Predicted_Stress_Level: str
    Confidence: float
    Advice: list[str]


@app.get("/")
def home():
    return {"message": "Smart Stress Prediction API Running 🚀"}


@app.post("/predict", response_model=StressOutput)
def predict_stress(data: StressInput):

    try:
        # Convert input to DataFrame
        input_df = pd.DataFrame([data.dict()])

        # Prediction
        prediction = model.predict(input_df)[0]

        # Probability
        probabilities = model.predict_proba(input_df)[0]
        confidence = max(probabilities)

        logging.info(f"Prediction made: {prediction}")

        # Smart advice logic
        advice_list = []

        if data.Sleep_Hours < 6:
            advice_list.append("Increase sleep duration.")

        if data.Daily_Phone_Hours > 8:
            advice_list.append("Reduce daily phone usage.")

        if data.Caffeine_Intake_Cups > 4:
            advice_list.append("Reduce caffeine intake.")

        if not advice_list:
            advice_list.append("Maintain your current healthy lifestyle.")

        return {
            "Predicted_Stress_Level": prediction,
            "Confidence": round(float(confidence), 3),
            "Advice": advice_list
        }

except Exception as e:
    logging.error(str(e))
    return {
        "Predicted_Stress_Level": "Error",
        "Confidence": 0.0,
        "Advice": ["Prediction failed. Please check input."]
    }