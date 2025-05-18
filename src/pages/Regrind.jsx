

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Regrind.css";
import Sidebar from "../components/Sidebar";

const RegrindPage = () => {
  const [regrinds, setRegrinds] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    fetchAllRegrinds();
  }, []);

  const fetchAllRegrinds = async () => {
    try {
      const res = await axios.get("http://18.197.69.165:5000/api/Regrind/all");
      setRegrinds(res.data.data);
    } catch (err) {
      console.error("Error fetching regrinds:", err);
    }
  };

  const handleSearch = async () => {
    if (!searchDate) return fetchAllRegrinds();

    try {
      const res = await axios.get(
        `http://18.197.69.165:5000/api/Regrind/search?searchTerm=${searchDate}`
      );
      setRegrinds(res.data.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="app-layout-regind">
      <div className="content-area-regind px-6 py-4">
        <h2 className="text-4xl font-extrabold text-green-700 mb-10 border-b-4 border-green-300 pb-3 shadow-sm text-center">
            Regrind 
        </h2>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="w-full sm:w-[250px] border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-xl shadow transition duration-300"
          >
            Search
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regrinds.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 italic">
              😕 No data available
            </div>
          ) : (
            regrinds.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:scale-[1.02] transition duration-300"
              >
                <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                  📅 {new Date(item.timestamp).toLocaleDateString()}
                  <span className="text-gray-600 font-normal">{new Date(item.timestamp).toLocaleTimeString()}</span>
                </h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>
                    <span className="font-medium text-green-800">LG4:</span>{" "}
                    <span className="font-medium text-green-700">{item.lg4}</span>
                  </li>
                  <li>
                    <span className="font-medium text-green-800">
                      LG4 25:
                    </span>{" "}
                    <span className="font-medium text-green-700">{item.lg4_25}</span>
                  </li>
                  <li>
                    <span className="font-medium text-green-800">SG4:</span>{" "}
                    <span className="font-medium text-green-700">{item.sg4}</span>
                  </li>
                  <li>
                    <span className="font-medium text-green-800">SG6:</span>{" "}
                    <span className="font-medium text-green-700">{item.sg6}</span>
                  </li>
                  <li>
                    <span className="font-medium text-green-800">
                      Lasagna:
                    </span>{" "}
                    <span className="font-medium text-green-700">{item.lasagna}</span>
                  </li>
                  <li>
                    <span className="font-medium text-green-800">
                    Total Regrind:
                    </span>{" "}
                    <span className="font-medium text-green-700">{item.totalRegrind}</span>
                  </li>
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default RegrindPage;

