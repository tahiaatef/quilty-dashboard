import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Shifts.css";
import Sidebar from "../components/Sidebar";

function Shifts() {
  const [shifts, setShifts] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    userId: "",
  });

  // Get filtered data
  const fetchShifts = async () => {
    try {
      const params = {};
      if (filters.date) params.date = filters.date;
      if (filters.userId) params.userId = filters.userId;

      const res = await axios.get("http://18.197.69.165:5000/api/shift/shifts/search", { params });
      setShifts(res.data);
    } catch (err) {
      console.error("Error fetching shifts:", err);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchShifts();
  };

  return (
    <div className="app-layout">
    <div className="users-container">
      <h2>Shifts Overview</h2>

      <div className="filters">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Date</th>
            <th>Shift</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((item) => (
            <tr key={item._id}>
              <td>{item.userId?.username}</td>
              <td>{item.userId?.email}</td>
              <td>{item.date}</td>
              <td>{item.shift}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Sidebar/>
    </div>
  );
}

export default Shifts;

