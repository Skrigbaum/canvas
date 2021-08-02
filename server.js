const express = require('express');
const app = express();

var db = require("./database.js")
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/api/note/:id", (req, res, next) => {
    var sql = "select * from note where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.post("/api/note", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("No name specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        note: req.body.note,
        email: req.body.email,
        phoneNumber: req.body.phone,
        userID: req.body.userId,
    }
    var sql ='INSERT INTO note (name, note, email, phoneNumber, userID) VALUES (?, ?, ?, ?, ?)'
    var params = [req.params.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});

app.post('/api/user', (req, res, next) => {
    var data = {
        name: req.body.name,
    }
    var sql ='INSERT INTO user (name) VALUES (?)'
    var params =[data.name]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})


app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

