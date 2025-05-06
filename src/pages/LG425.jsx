


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; 
import '../css/lg4-25.css';

function Lg4_25Page() {
  const [data, setData] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  // const [currentDateData, setCurrentDateData] = useState([]);

  const fetchData = async (date) => {
    let apiUrl = 'http://localhost:5000/api/lg4_25/all';
    if (date) {
      apiUrl = `http://localhost:5000/api/lg4_25/search?date=${date}`;
    }

    try {
      const res = await axios.get(apiUrl);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleSearch = () => {
    if (searchDate) {
      fetchData(searchDate);
    } else {
      fetchData();
    }
  };

  return (
    <div  className="app-layout">
      
      <div className="content-lg425">
        <h2 className="text-xl font-bold mb-4 text-green-700">LG4_25 Weight </h2>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="date"
            className="border border-gray-300 p-2 rounded-md"
            value={searchDate}
            onChange={handleSearchDateChange}
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Search 
          </button>
        </div>

        {data.length === 0 ? (
          <p className="text-gray-500">No data found for the selected date.</p>
        ) : (
          <div className="overflow-auto">
            <table className="table-auto w-full border border-gray-300">
              {/* نفس هيكل الجدول اللي كنت عامله لعرض البيانات */}
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">M5</th>
                  <th className="px-4 py-2 border">M6</th>
                  <th className="px-4 py-2 border">M7</th>
                  <th className="px-4 py-2 border">M8</th>
                  <th className="px-4 py-2 border">Avg (Each)</th>
                  <th className="px-4 py-2 border">Overall Avg</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="text-center">
                    <td className="border px-2 py-1">{item.createdAt.split('T')[0]}</td>
                    <td className="border px-2 py-1">{item.weights?.M5?.join(', ')}</td>
                    <td className="border px-2 py-1">{item.weights?.M6?.join(', ')}</td>
                    <td className="border px-2 py-1">{item.weights?.M7?.join(', ')}</td>
                    <td className="border px-2 py-1">{item.weights?.M8?.join(', ')}</td>
                    <td className="border px-2 py-1">{item.averageWeights?.join(', ')}</td>
                    <td className="border px-2 py-1">{item.overallAverageWeight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Sidebar />
    </div>
  );
}

export default Lg4_25Page;