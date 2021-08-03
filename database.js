var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text 
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name) VALUES (?)'
                db.run(insert, ["admin"])
                db.run(insert, ["user"])
            }
        });
        db.run(`CREATE TABLE note (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            note text,
            email text,
            phoneNumber text,
            userID INTEGER,
            FOREIGN KEY (userID) 
            REFERENCES user (id)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO note (note, name, email, phoneNumber, userID) VALUES (?, ?, ?, ?, ?)'
                db.run(insert, ["TEST NOTE", "Test Name", "FakeEmail@fake.com", "555-555-5555",  1])
            }
        });    
    }
});


module.exports = db