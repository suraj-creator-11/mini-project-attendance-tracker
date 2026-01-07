const express = require('express');
const cors = require('cors');
const Datastore = require('nedb');

const app = express();
app.use(cors());
app.use(express.json());

const db = new Datastore({ filename: 'attendance.db', autoload: true });

app.post('/mark', (req, res) => {
  const { name, roll } = req.body;
  db.insert({ name, roll, timestamp: new Date() }, () => {
    res.send({ message: "Attendance marked" });
  });
});

app.get('/list', (req, res) => {
  db.find({}, (err, docs) => {
    res.send(docs);
  });
});


app.listen(3001, () => console.log('Backend running on port 3001'));
