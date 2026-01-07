import React, { useState, useEffect } from "react";
import axios from "axios";

function AttendanceTracker() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/list").then(res => setList(res.data));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:3001/mark", { name, roll }).then(() => {
      setList([...list, { name, roll, timestamp: new Date() }]);
      setName("");
      setRoll("");
    });
  };

  return (
    <div className="box">
      <h2>Attendance Tracker</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="row">
          <label>Roll Number</label>
          <input value={roll} onChange={e => setRoll(e.target.value)} required />
        </div>
        <button className="btn" type="submit">Mark Attendance</button>
      </form>
      <h3>Attendance List</h3>
      <ul>
        {list.map((entry, i) => (
          <li key={i}>
            {entry.name} ({entry.roll}) - {new Date(entry.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttendanceTracker;
