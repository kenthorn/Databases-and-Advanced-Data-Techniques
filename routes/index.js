const express = require('express');
const router = express.Router();
const db = require('../db'); // Import database connection

router.get('/', async (req, res) => {
    // Queries object contains SQL queries for different datasets
    const queries = {
        // query to calculate regional disparities in heart attack likelihood
        regionalDisparities: `
            SELECT 
                Region, 
                COUNT(CASE WHEN Heart_Attack_Likelihood = 'Yes' THEN 1 END) AS RiskCount,
                COUNT(*) AS TotalCount,
                COALESCE((COUNT(CASE WHEN Heart_Attack_Likelihood = 'Yes' THEN 1 END) / COUNT(*)) * 100, 0) AS RiskPercentage
            FROM 
                HeartHealthData
            GROUP BY 
                Region;
        `,
        // query to analyze the impact of physical activity on high BMI risks
        physicalActivityAndBMI: `
            SELECT 
                Physical_Activity_Level, 
                COUNT(CASE WHEN BMI > 25 AND Heart_Attack_Likelihood = 'Yes' THEN 1 END) AS HighRiskCount,
                COUNT(CASE WHEN BMI > 25 THEN 1 END) AS TotalHighBMI,
                COALESCE((COUNT(CASE WHEN BMI > 25 AND Heart_Attack_Likelihood = 'Yes' THEN 1 END) / COUNT(CASE WHEN BMI > 25 THEN 1 END)) * 100, 0) AS RiskPercentage
            FROM 
                HeartHealthData
            GROUP BY 
                Physical_Activity_Level;
        `,
        // query to explore heart attack likelihood by gender and socioeconomic status
        genderAndSES: `
            SELECT 
                Gender, SES, 
                COUNT(CASE WHEN Heart_Attack_Likelihood = 'Yes' THEN 1 END) AS RiskCount,
                COUNT(*) AS TotalCount,
                COALESCE((COUNT(CASE WHEN Heart_Attack_Likelihood = 'Yes' THEN 1 END) / COUNT(*)) * 100, 0) AS RiskPercentage
            FROM 
                HeartHealthData
            GROUP BY 
                Gender, SES;
        `,
        // query to investigate the correlation between smoking, sleep duration, and risks
        smokingAndSleep: `
            SELECT 
                Smoking_Status, Sleep_Duration, 
                COUNT(CASE WHEN Heart_Attack_Likelihood = 'Yes' THEN 1 END) AS RiskCount,
                COUNT(*) AS TotalCount,
                COALESCE((COUNT(CASE WHEN Heart_Attack_Likelihood = 'Yes' THEN 1 END) / COUNT(*)) * 100, 0) AS RiskPercentage
            FROM 
                HeartHealthData
            GROUP BY 
                Smoking_Status, Sleep_Duration;
        `,
        // query to study the relationship between family history and clinical metrics
        familyHistoryClinical: `
            SELECT 
                Family_History_Heart_Disease, 
                AVG(Cholesterol_Levels) AS AvgCholesterol, 
                AVG(Blood_Pressure) AS AvgBloodPressure
            FROM 
                HeartHealthData
            WHERE 
                Heart_Attack_Likelihood = 'Yes'
            GROUP BY 
                Family_History_Heart_Disease;
        `
    };

    try {
        // Execute 
        const [regionalDisparitiesResults] = await db.query(queries.regionalDisparities);
        // Execute 
        const [physicalActivityResults] = await db.query(queries.physicalActivityAndBMI);
        // Execute 
        const [genderAndSESResults] = await db.query(queries.genderAndSES);
        // Execute 
        const [smokingAndSleepResults] = await db.query(queries.smokingAndSleep);
        // Execute 
        const [familyHistoryResults] = await db.query(queries.familyHistoryClinical);

        // Ensure numeric parsing of percentages 
        regionalDisparitiesResults.forEach(row => row.RiskPercentage = parseFloat(row.RiskPercentage) || 0);
        // Ensure numeric parsing of percentages 
        physicalActivityResults.forEach(row => row.RiskPercentage = parseFloat(row.RiskPercentage) || 0);
        // Ensure numeric parsing of percentages 
        genderAndSESResults.forEach(row => row.RiskPercentage = parseFloat(row.RiskPercentage) || 0);
        // Ensure numeric parsing of percentages
        smokingAndSleepResults.forEach(row => row.RiskPercentage = parseFloat(row.RiskPercentage) || 0);

        // Render the EJS template with all fetched data
        res.render('index.ejs', {
            regionalDisparities: regionalDisparitiesResults,
            physicalActivity: physicalActivityResults,
            genderAndSES: genderAndSESResults,
            smokingAndSleep: smokingAndSleepResults,
            familyHistory: familyHistoryResults
        });
    } catch (err) {
        // Log error details to the console
        console.error('Error executing queries:', err.message);
        // Send a JSON response with an error message
        res.status(500).json({ error: 'An error occurred while retrieving data' });
    }
});

// Export the router to be used in the main application
module.exports = router;
