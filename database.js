var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite" 


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text,
            salt text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,(err) => {
        if (err) {
            // Table already created
        }else{
            
        }
        db.run(`CREATE TABLE "schedule" (
            "name"	TEXT NOT NULL,
            "description"	TEXT,
            "id"	INTEGER NOT NULL UNIQUE,
            "user_id"	INTEGER NOT NULL,
            "start_time"	INTEGER NOT NULL,
            "end_time"	INTEGER NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT)
        )`,(err) => {
        if (err) {
            // Table already created
        }else{
            
        }
        db.run(`CREATE TABLE "expired_tokens" (
            "token"	TEXT NOT NULL UNIQUE
        )`,(err) => {
        if (err) {
            // Table already created
        }else{
            
        }
    })  
    })  
})
    }
})


module.exports = db