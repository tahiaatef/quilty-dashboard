import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/MoistureAnalyses.css";
import Sidebar from "../components/Sidebar";

function MoistureAnalyses() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");

  // Fetch all data on initial load
  useEffect(() => {
    fetchAllAnalyses();
  }, []);

  const fetchAllAnalyses = async () => {
    try {
      const res = await axios.get("http://18.197.69.165:5000/api/moisture-analyses");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching all analyses:", err);
    }
  };

  const handleSearch = async () => {
    try {
      if (!date) {
        fetchAllAnalyses(); // لو التاريخ اتشال نعرض كل البيانات تاني
        return;
      }

      const res = await axios.get(`http://18.197.69.165:5000/api/moisture-analyses/search?date=${date}`);
      setData(res.data);
    } catch (err) {
      console.error("Error searching moisture analyses:", err);
    }
  };

  return (
    <div className="app-layout-msa">
      
    <div className="content-area-msa">
      <h2>Moisture Analyses</h2>

      <div className="search-box">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {data.length === 0 && <p>No data found.</p>}

      {data.map((item) => (
        <div key={item._id} className="moisture-card">
          <p><strong>Timestamp:</strong> {new Date(item.timestamp).toLocaleString()}</p>

          <div className="section">
            <h4>LG4</h4>
            <h2>Product Name : {item.productNames.lg4}</h2>
            <p>Values: {item.msa_lg4_values.join(", ")}</p>
            <p>Average: {item.msa_lg4_average}</p>
          </div>

          <div className="section">
            <h4>LG4-25</h4>
            <h2>Product Name : {item.productNames.lg4_25}</h2>
            <p>Values: {item.msa_lg4_25_values.join(", ")}</p>
            <p>Average: {item.msa_lg4_25_average}</p>
          </div>

          <div className="section">
            <h4>SG4</h4>
            <h2>Product Name : {item.productNames.sg4}</h2>
            <p>Values: {item.msa_sg4_values.join(", ")}</p>
            <p>Average: {item.msa_sg4_average}</p>
          </div>

          <div className="section">
            <h4>SG6</h4>
            <h2>Product Name : {item.productNames.sg6}</h2>
            <p>Values: {item.msa_sg6_values.join(", ")}</p>
            <p>Average: {item.msa_sg6_average}</p>
          </div>

          <div className="section">
          <h2>Product Name : {item.productNames.lasagn}</h2>
            <h4>Lasagn</h4>
            <p>Values: {item.msa_lasagn_values.join(", ")}</p>
            <p>Average: {item.msa_lasagn_average}</p>
          </div>

          <div className="section">
            <h4>Pre-MSA</h4>
            <p>Values: {item.pre_msa_values.join(", ")}</p>
          </div>
        </div>
      ))}
    </div>
    <Sidebar/>
    </div>
  );
}

export default MoistureAnalyses;
