function startProcess() {
    const inputs = [
      { id: "name", type: "text" },
      { id: "age", type: "number" },
      { id: "gender", type: "text" },
      { id: "idType", type: "text" },
      { id: "idNumber", type: "text" },
      { id: "height", type: "number" },
      { id: "weight", type: "number" },
      { id: "bloodGroup", type: "text" },
      { id: "HeartRate", type: "number" },
      { id: "temperature", type: "number" },
      { id: "HbloodPressure", type: "number" },
      { id: "LbloodPressure", type: "number" },
      { id: "bloodSugar", type: "number" },
      { id: "logistics", type: "text" }
    ];

    const values = inputs.map(input => {
      const value = document.getElementById(input.id).value;
      return { ...input, value: input.type === "number" ? parseFloat(value) : value };
    });

    const emptyFields = values.filter(input => !input.value || (input.type === "number" && isNaN(input.value)));

    if (emptyFields.length > 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const data = values.reduce((acc, input) => {
      acc[input.id] = input.value;
      return acc;
    }, {});

    const bmi = (data.weight / ((data.height / 100) ** 2)).toFixed(2);

    const conditions = [
      { condition: bmi >= 30, result: 'Obese' },
      { condition: bmi >= 25 && bmi < 30, result: 'Overweight' },
      { condition: bmi >= 18.5 && bmi < 25, result: 'Normal weight' },
      { condition: bmi > 0 && bmi < 18.5, result: 'Underweight' },
      { condition: true, result: 'Invalid' }
    ];

    const BmiRange = conditions.find(cond => cond.condition).result;

    const heartRateConditions = [
      { condition: data.HeartRate < 60, result: 'Low Heart Rate' },
      { condition: data.HeartRate >= 60 && data.HeartRate <= 100, result: 'Normal Heart Rate' },
      { condition: data.HeartRate > 100 && data.HeartRate <= 120, result: 'High Heart Rate (Tachycardia)' },
      { condition: data.HeartRate > 120, result: 'Very High Heart Rate' },
      { condition: true, result: 'Invalid' }
    ];

    const HeartRateRange = heartRateConditions.find(cond => cond.condition).result;

    const temperatureConditions = [
      { condition: data.temperature >= 100.4, result: 'High Fever' },
      { condition: data.temperature >= 99 && data.temperature < 100.4, result: 'Mild Fever' },
      { condition: data.temperature >= 97 && data.temperature < 99, result: 'Normal' },
      { condition: data.temperature < 97, result: 'Hypothermia' },
      { condition: true, result: 'Invalid' }
    ];

    const temperatureRange = temperatureConditions.find(cond => cond.condition).result;

    const bpConditions = [
      { condition: data.HbloodPressure >= 140 || data.LbloodPressure >= 90, result: 'High Blood Pressure' },
      { condition: (data.HbloodPressure >= 130 && data.HbloodPressure < 140) || (data.LbloodPressure >= 80 && data.LbloodPressure < 90), result: 'Elevated Blood Pressure' },
      { condition: data.HbloodPressure >= 120 && data.HbloodPressure < 130 && data.LbloodPressure < 80, result: 'Normal Blood Pressure' },
      { condition: data.HbloodPressure < 120 && data.LbloodPressure < 80, result: 'Optimal Blood Pressure' },
      { condition: data.HbloodPressure < 90 || data.LbloodPressure < 60, result: 'Hypotension (Low Blood Pressure)' },
      { condition: true, result: 'Invalid Blood Pressure' }
    ];

    const BPRange = bpConditions.find(cond => cond.condition).result;

    const bsConditions = [
      { condition: data.bloodSugar >= 126, result: 'Hyperglycemia' },
      { condition: data.bloodSugar >= 100 && data.bloodSugar < 126, result: 'Prediabetes' },
      { condition: data.bloodSugar >= 70 && data.bloodSugar < 100, result: 'Normal Blood Sugar' },
      { condition: data.bloodSugar < 70, result: 'Hypoglycemia' },
      { condition: true, result: 'Invalid Blood Sugar' }
    ];

    const BSRange = bsConditions.find(cond => cond.condition).result;

    const userResults = document.getElementById("userResults");
    userResults.innerHTML = `<h2>Health Summary</h2>`;
    userResults.innerHTML += `<p>Name: ${data.name}</p>`;
    userResults.innerHTML += `<p>Age: ${data.age}</p>`;
    userResults.innerHTML += `<p>Gender: ${data.gender}</p>`;
    userResults.innerHTML += `<p>ID Type: ${data.idType}</p>`;
    userResults.innerHTML += `<p>ID Number: ${data.idNumber}</p>`;
    userResults.innerHTML += `<p>Height: ${data.height} cm</p>`;
    userResults.innerHTML += `<p>Weight: ${data.weight} kg</p>`;
    userResults.innerHTML += `<p>Blood Group: ${data.bloodGroup}</p>`;
    userResults.innerHTML += `<p>BMI: ${bmi}</p>`;
    userResults.innerHTML += `<p>Service Chosen: ${data.logistics}</p>`;
    userResults.innerHTML += `<p>(BMI) Predicted Condition: ${BmiRange}</p>`;
    userResults.innerHTML += `<p>Heart Rate: ${data.HeartRate} bpm</p>`;
    userResults.innerHTML += `<p>(Heart Rate) Predicted Condition: ${HeartRateRange}</p>`;
    userResults.innerHTML += `<p>Temperature: ${data.temperature} °F</p>`;
    userResults.innerHTML += `<p>(Temperature) Predicted Condition: ${temperatureRange}</p>`;
    userResults.innerHTML += `<p>Higher Blood Pressure: ${data.HbloodPressure} mmHg</p>`;
    userResults.innerHTML += `<p>Lower Blood Pressure: ${data.LbloodPressure} mmHg</p>`;
    userResults.innerHTML += `<p>(Blood Pressure) Predicted Condition: ${BPRange}</p>`;
    userResults.innerHTML += `<p>Blood Sugar: ${data.bloodSugar} mg/dL</p>`;
    userResults.innerHTML += `<p>(Blood Sugar) Predicted Condition: ${BSRange}</p>`;

    const resultsDiv = document.getElementById("results");
    resultsDiv.style.display = "block";

    // Save CSV file
    const csvContent = `"Name","Age","Gender","ID Type","ID Number","Height (cm)","Weight (kg)","Blood Group","BMI","Service Chosen","BMI Prediction","Heart rate(bpm)","Heart Rate Prediction","Temperature (F)","Temperature Prediction","Higher Blood Pressure (mmHg)","Lower Blood Pressure (mmHg)","Blood Pressure Prediction","Blood Sugar (mg/dL)","Blood Sugar Prediction"\n`;
    const rowData = `"${data.name}","${data.age}","${data.gender}","${data.idType}","${data.idNumber}","${data.height}","${data.weight}","${data.bloodGroup}","${bmi}","${data.logistics}","${BmiRange}","${data.HeartRate}","${HeartRateRange}","${data.temperature}","${temperatureRange}","${data.HbloodPressure}","${data.LbloodPressure}","${BPRange}","${data.bloodSugar}","${BSRange}"\n`;
    const csvData = csvContent + rowData;
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "health_summary.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Your browser does not support automatic download. Right-click the link and select 'Save link as...' to download.");
    }
  }