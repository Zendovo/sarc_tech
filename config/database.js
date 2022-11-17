const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

// db.close();

module.exports = db;