
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import "../css/LG4.css";

function Lg4Page() {
  const [data, setData] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/lg4/lg4-data');
      console.log("Fetch Data Response:", res.data);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const searchData = async () => {
    console.log("Searching for date:", searchDate);
    try {
      const res = await axios.get(`http://localhost:5000/api/lg4/lg4-data/search?date=${searchDate}`);
      console.log("Search Data Response:", res.data); 
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-layout">
    
    <div className="content-area">
      <h2 className="text-xl font-bold mb-4 text-green-700">LG4 Weight </h2>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="date"
          className="border border-gray-300 p-2 rounded-md"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button
          onClick={searchData}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500">No data found.</p>
      ) : (
        <div className="overflow-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">M1</th>
                <th className="px-4 py-2 border">M2</th>
                <th className="px-4 py-2 border">M3</th>
                <th className="px-4 py-2 border">M4</th>
                <th className="px-4 py-2 border">Avg (Each)</th>
                <th className="px-4 py-2 border">Overall Avg</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="border px-2 py-1">{item.createdAt.split('T')[0]}</td>
                  <td className="border px-2 py-1">{item.weights?.M1?.join(', ')}</td>
                  <td className="border px-2 py-1">{item.weights?.M2?.join(', ')}</td>
                  <td className="border px-2 py-1">{item.weights?.M3?.join(', ')}</td>
                  <td className="border px-2 py-1">{item.weights?.M4?.join(', ')}</td>
                  <td className="border px-2 py-1">{item.averageWeights?.join(', ')}</td>
                  <td className="border px-2 py-1">{item.overallAverageWeight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <Sidebar/>
    </div>
  );
}

export default Lg4Page;
