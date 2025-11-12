const mysql2 = require('mysql2'); // Import mysql2 library

// Create a connection pool
const mysql = mysql2.createPool({
  host: 'localhost',        // Database host
  user: 'root',             // Database username
  password: '',             // Database password
  database: 'HeartHealthDB' // Database name
});

// Export the connection with promise support
module.exports = mysql.promise();
