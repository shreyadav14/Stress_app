import React, { useState } from "react";

const UserInput = ({ setResult, setInputSnapshot, onAnalyzeSuccess }) => {
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const [formData, setFormData] = useState({
Age: "",
Gender: "Male",
Occupation: "Student",
Device_Type: "Android",
Daily_Phone_Hours: "",
Social_Media_Hours: "",
Work_Productivity_Score: "",
Sleep_Hours: "",
App_Usage_Count: "",
Caffeine_Intake_Cups: "",
Weekend_Screen_Time_Hours: ""
});
const [error, setError] = useState("");

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};
const handleSubmit = async (e) => {
e.preventDefault();
setError("");

console.log("Analyze button clicked");

try {
const payload = {
...formData,
Age: Number(formData.Age),
Daily_Phone_Hours: Number(formData.Daily_Phone_Hours),
Social_Media_Hours: Number(formData.Social_Media_Hours),
Work_Productivity_Score: Number(formData.Work_Productivity_Score),
Sleep_Hours: Number(formData.Sleep_Hours),
App_Usage_Count: Number(formData.App_Usage_Count),
Caffeine_Intake_Cups: Number(formData.Caffeine_Intake_Cups),
Weekend_Screen_Time_Hours: Number(formData.Weekend_Screen_Time_Hours)
};
setInputSnapshot(payload);

const response = await fetch(`${API_BASE_URL}/predict`, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(payload)
});

console.log("Response status:", response.status);

if (!response.ok) {
throw new Error(`API returned ${response.status}`);
}

const data = await response.json();

console.log("API response:", data);

setResult(data);
if (onAnalyzeSuccess) {
onAnalyzeSuccess();
}

} catch (error) {
console.error("Fetch error:", error);
setResult(null);
setError(
"Cannot reach prediction API. Start backend on http://127.0.0.1:8000 and retry."
);
}

};

return (

<div className="card">

<h2>Enter Sleep Data</h2>

<form onSubmit={handleSubmit}>

<input name="Age" placeholder="Age" onChange={handleChange}/>

<select name="Gender" onChange={handleChange}>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>

<select name="Occupation" onChange={handleChange}>
<option>Student</option>
<option>Professional</option>
<option>Freelancer</option>
<option>Business Owner</option>
</select>

<select name="Device_Type" onChange={handleChange}>
<option>Android</option>
<option>iOS</option>
</select>

<input name="Sleep_Hours" placeholder="Sleep Hours" onChange={handleChange}/>
<input name="Daily_Phone_Hours" placeholder="Phone Hours" onChange={handleChange}/>
<input name="Social_Media_Hours" placeholder="Social Media Hours" onChange={handleChange}/>
<input name="Work_Productivity_Score" placeholder="Productivity Score" onChange={handleChange}/>
<input name="App_Usage_Count" placeholder="App Usage Count" onChange={handleChange}/>
<input name="Caffeine_Intake_Cups" placeholder="Caffeine Cups" onChange={handleChange}/>
<input name="Weekend_Screen_Time_Hours" placeholder="Weekend Screen Time" onChange={handleChange}/>

<button type="submit">Analyze Sleep</button>
{error && <p style={{ color: "crimson", marginTop: "10px" }}>{error}</p>}

</form>

</div>

);
};

export default UserInput;
