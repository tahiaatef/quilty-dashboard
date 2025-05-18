import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/NonConformance.css";
import Sidebar from "../components/Sidebar";

function NonConformanceReports() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchAllReports();
  }, []);

  const fetchAllReports = async () => {
    try {
      const res = await axios.get("http://18.197.69.165:5000/api/non-conformance/reports");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  const handleSearch = async () => {
    try {
      if (!date) {
        fetchAllReports(); // لو التاريخ اتشال نعرض الكل تاني
        return;
      }

      const res = await axios.get(
        `http://18.197.69.165:5000/api/non-conformance/reports/search?date=${date}`
      );
      setData(res.data);
    } catch (err) {
      console.error("Error searching reports:", err);
    }
  };

  return (
    < div className="app-layout-ncr">
        <Sidebar/>
    <div className="content-area-ncr">
      <h2>Non-Conformance Reports</h2>

      <div className="search-box-ncr">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {data.length === 0 && <p>No reports found.</p>}

      {data.map((item) => (
        <div key={item._id} className="report-card-ncr">
          <div className="report-ddata-ncr">
          <p><strong>Date:</strong> {new Date(item.timestamp).toLocaleString()}</p>
          <p><strong>Production Line:</strong> {item.productionLine}</p>
          <p><strong>Complaint Details:</strong> {item.complaintDetails}</p>
          <p><strong>Corrective Action:</strong> {item.correctiveAction}</p>
          </div>
          {item.attachments && (
  <div className="image-box-ncr">
    <p><strong>Attachment:</strong></p>
    <img
      src={`http://18.197.69.165:5000/${item.attachments.replace(/\\/g, '/')}`}
      alt="Attachment"
      className="report-img-ncr"
    />
  </div>
)}

        </div>
      ))}
    </div>
  
    </div>
  );
}

export default NonConformanceReports;
