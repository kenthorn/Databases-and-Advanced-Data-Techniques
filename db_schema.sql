-- Step 1: Create and Use the Database
CREATE DATABASE IF NOT EXISTS HeartHealthDB;
USE HeartHealthDB;

-- Step 2: Create the Temporary Table
CREATE TEMPORARY TABLE TempHeartHealthData (
    Age INT,
    Gender VARCHAR(10),
    Region VARCHAR(50),
    Urban_Rural VARCHAR(10),
    SES VARCHAR(20),
    Smoking_Status VARCHAR(20),
    Alcohol_Consumption VARCHAR(20),
    Diet_Type VARCHAR(20),
    Physical_Activity_Level VARCHAR(50),
    Screen_Time FLOAT,
    Sleep_Duration FLOAT,
    Family_History_Heart_Disease VARCHAR(3),
    Diabetes VARCHAR(3),
    Hypertension VARCHAR(3),
    Cholesterol_Levels FLOAT,
    BMI FLOAT,
    Stress_Level VARCHAR(10),
    Blood_Pressure VARCHAR(20),
    Resting_Heart_Rate INT,
    ECG_Results VARCHAR(20),
    Chest_Pain_Type VARCHAR(50),
    Max_Heart_Rate_Achieved INT,
    Exercise_Induced_Angina VARCHAR(3),
    Blood_Oxygen_Levels FLOAT,
    Triglyceride_Levels FLOAT,
    Heart_Attack_Likelihood VARCHAR(3)
);

-- Step 3: Load Data into the Temporary Table
LOAD DATA INFILE '/home/coder/project/heart_attack_youngsters_india.csv'
INTO TABLE TempHeartHealthData
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- Step 4: Create the Main Table
CREATE TABLE HeartHealthData (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Age INT,
    Gender VARCHAR(10),
    Region VARCHAR(50),
    Urban_Rural VARCHAR(10),
    SES VARCHAR(20),
    Smoking_Status VARCHAR(20),
    Alcohol_Consumption VARCHAR(20),
    Diet_Type VARCHAR(20),
    Physical_Activity_Level VARCHAR(50),
    Screen_Time FLOAT,
    Sleep_Duration FLOAT,
    Family_History_Heart_Disease VARCHAR(3),
    Diabetes VARCHAR(3),
    Hypertension VARCHAR(3),
    Cholesterol_Levels FLOAT,
    BMI FLOAT,
    Stress_Level VARCHAR(10),
    Blood_Pressure VARCHAR(20),
    Resting_Heart_Rate INT,
    ECG_Results VARCHAR(20),
    Chest_Pain_Type VARCHAR(50),
    Max_Heart_Rate_Achieved INT,
    Exercise_Induced_Angina VARCHAR(3),
    Blood_Oxygen_Levels FLOAT,
    Triglyceride_Levels FLOAT,
    Heart_Attack_Likelihood VARCHAR(3)
);

-- Step 5: Transfer Data from Temporary Table to Main Table
INSERT INTO HeartHealthData (
    Age, Gender, Region, Urban_Rural, SES, Smoking_Status, Alcohol_Consumption, Diet_Type,
    Physical_Activity_Level, Screen_Time, Sleep_Duration, Family_History_Heart_Disease,
    Diabetes, Hypertension, Cholesterol_Levels, BMI, Stress_Level, Blood_Pressure,
    Resting_Heart_Rate, ECG_Results, Chest_Pain_Type, Max_Heart_Rate_Achieved,
    Exercise_Induced_Angina, Blood_Oxygen_Levels, Triglyceride_Levels, Heart_Attack_Likelihood
)
SELECT 
    Age, Gender, Region, Urban_Rural, SES, Smoking_Status, Alcohol_Consumption, Diet_Type,
    Physical_Activity_Level, Screen_Time, Sleep_Duration, Family_History_Heart_Disease,
    Diabetes, Hypertension, Cholesterol_Levels, BMI, Stress_Level, Blood_Pressure,
    Resting_Heart_Rate, ECG_Results, Chest_Pain_Type, Max_Heart_Rate_Achieved,
    Exercise_Induced_Angina, Blood_Oxygen_Levels, Triglyceride_Levels, Heart_Attack_Likelihood
FROM TempHeartHealthData;

-- Step 6: Verify Data
SELECT * FROM HeartHealthData;
