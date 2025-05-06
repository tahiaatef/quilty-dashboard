

import React, { useState, useEffect } from 'react';
import '../css/SG4.css';
import Sidebar from '../components/Sidebar';

function SG4() {
  const [allData, setAllData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  

  const apiUrlAll = 'http://localhost:5000/api/sg4/all';
  const apiUrlSearch = 'http://localhost:5000/api/sg4/search';

  useEffect(() => {
    fetch(apiUrlAll)
      .then((response) => response.json())
      .then((responseData) => {
        const sortedData = responseData.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllData(sortedData);
      })
      .catch((error) => {
        console.error('Error fetching all data:', error);
      });
  }, []);

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchDate.trim()) {
      const searchUrl = `${apiUrlSearch}?date=${searchDate}`; // تغيير 'q' إلى 'date'
      fetch(searchUrl)
        .then((response) => response.json())
        .then((responseData) => {
          setSearchResults(responseData.data);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    } else {
      setSearchResults([]);
    }
  };

  

  const dataToDisplay = searchDate.trim() ? searchResults : allData;

  return (
    <div className="app-layout">
      <div className="content-area">
        <h1 className="page-title">SG4 Weight </h1>

        <div className="search-container-sg4">
        <input
            type="date"
            className="border border-gray-300 p-2 rounded-md  "
            value={searchDate}
            onChange={handleSearchDateChange}
          />
          <button onClick={handleSearchSubmit}  >Search </button>
        </div>
        <br />
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>M5</th>
                <th>M6</th>
                <th>M7</th>
                <th>M8</th>
                <th>Avg (Each)</th>
                <th>Overall Avg</th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((item, index) => {
                const formattedDate = new Date(item.createdAt).toISOString().split('T')[0];
                return (
                  <tr key={index}>
                  <td>{formattedDate}</td>
                  <td>{item.weights?.M1?.join(', ') || '...'}</td> {/* تغيير إلى M1 */}
                  <td>{item.weights?.M2?.join(', ') || '...'}</td> {/* تغيير إلى M2 */}
                  <td>{item.weights?.M9?.join(', ') || '...'}</td> {/* تغيير إلى M9 */}
                  <td>{item.weights?.M10?.join(', ') || '...'}</td> {/* تغيير إلى M10 */}
                  <td>{item.averageWeights?.join(', ') || '...'}</td> {/* الاحتفاظ بهذا إذا كان الترتيب صحيحًا */}
                  <td>
                    { item.overallAverageWeight 
                      ||'...'}
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default SG4;
