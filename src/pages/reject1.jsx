// src/reject1.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import '../css/rejection1.css';
const BASE_URL = "http://18.197.69.165:5000/api/rejection-weights1";

const Reject1 = () => {
  const [data, setData] = useState([]);
  const [filteredType, setFilteredType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = async () => {
    if (!date) return;
    try {
      const res = await fetch(`${BASE_URL}/search?date=${date}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      setData(result.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };
  

  const groupedData = data.reduce((acc, item) => {
    if (!filteredType || item.type === filteredType) {
      acc[item.type] = acc[item.type] || [];
      acc[item.type].push(item);
    }
    return acc;
  }, {});

  return (
    <div className="app-layout">
      
    <div className="content-area">
      <h2 >Machine Rejection Weights</h2>

      {/* Search & Filter */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <select
          onChange={(e) => setFilteredType(e.target.value || null)}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="LG4">LG4</option>
          <option value="LG4.25">LG4.25</option>
        </select>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        Object.entries(groupedData).map(([type, machines]) => (
          <div key={type} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{type}</h2>
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Machine No</th>
                  <th className="border p-2">Proper</th>
                  <th className="border p-2">Over</th>
                  <th className="border p-2">Under</th>
                  <th className="border p-2">Percentage</th>
                  <th className="border p-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {machines.map((m, i) => (
                  <tr key={i}>
                    <td className="border p-2">{m.machineNo}</td>
                    <td className="border p-2">{m.proper}</td>
                    <td className="border p-2">{m.over}</td>
                    <td className="border p-2">{m.under}</td>
                    <td className="border p-2">{m.percentage}</td>
                    <td className="border p-2">
                      {new Date(m.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
    <Sidebar/>
    </div>
  );
};

export default Reject1;
