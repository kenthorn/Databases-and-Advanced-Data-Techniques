To run the application:

1. Simply type node index.js in terminal
2. Type localhost:3000 in web browser to run the web application




ONLY IF any errors when running if not above workflow would suffice:

If you experience any issues when executing the SQL scripts, especially when trying to use the LOAD DATA LOCAL INFILE command to load data:

By executing the following command in your MySQL session, you can enable the local_infile option and fix this problem:

'SET GLOBAL local_infile = 1;'