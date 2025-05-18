// import React, { useState, useEffect } from 'react';
// import '../css/VisualCheck.css'; // تأكد إن عندك ملف الـ CSS ده في نفس المجلد أو بتعدل مساره
// import Sidebar from '../components/Sidebar';

// function VisualCheck() {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const apiUrl = 'http://18.197.69.165:5000/api/visual-check/visual-checks';

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch(apiUrl);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const jsonData = await response.json();
//             setData(jsonData.data);
//         } catch (e) {
//             console.error('Error fetching data:', e);
//             setError('Failed to load data.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // دالة لجلب تاريخ آخر فحص (بما إن كل record فيه كل الأنواع)
//     // const getLastCheckDate = () => {
//     //     if (data.length > 0) {
//     //         // فرز حسب التاريخ واختيار الأخير
//     //         const sorted = [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
//     //         return new Date(sorted[0].timestamp).toLocaleDateString();
//     //     }
//     //     return 'N/A'; // لو مفيش فحوصات
//     // };

//     const types = ['lg4', 'lg4_25', 'sg4', 'sg6', 'lasghna'];
//     const checkListItems = [
//         'apparentContamination',
//         'cracksAndCracks',
//         'whiteSpots',
//         'homogeneity',
//         'sectionAndShape',
//         'visualColor'
//     ];

//     if (loading) {
//         return <div>Loading data...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//       // <div className='app-layout '>
//       //   <div className="visual-check-container">
//       //       <h1>visual check</h1>
//       //       <div className="checklist-grid">
//       //           <div className="checklist-header">Checklist</div>
//       //           {types.map(type => (
//       //               <div key={type} className="type-header">{type.toUpperCase().replace('_25', '.25')}</div>
//       //           ))}
//       //           {checkListItems.map(item => (
//       //               <React.Fragment key={item}>
//       //                   <div className="checklist-item">{item}</div>
//       //                   {types.map(type => (
//       //                       <div key={`${item}-${type}`} className="data-cell">
//       //                           {/* {getLastCheckDate()} */}
//       //                           {getLatestCheckValue(item, type)}
//       //                       </div>
//       //                   ))}
//       //               </React.Fragment>
//       //           ))}
//       //       </div>
//       //   </div>
//       //   <Sidebar/>
//       //   </div>
//       <div className='app-layout'>
//   <div className="visual-check-container">
//     <h1>Visual Check</h1>
//     {data.map((record, index) => (
//       <div key={index} className="checklist-grid">
//         <div className="checklist-header">Checklist - {new Date(record.timestamp).toLocaleString()}</div>
//         {types.map(type => (
//           <div key={type} className="type-header">{type.toUpperCase().replace('_25', '.25')}</div>
//         ))}
//         {checkListItems.map(item => (
//           <React.Fragment key={item}>
//             <div className="checklist-item">{item}</div>
//             {types.map(type => (
//               <div key={`${index}-${item}-${type}`} className="data-cell">
//                 {record[`${item}_${type}`] || 'N/A'}
//               </div>
//             ))}
//           </React.Fragment>
//         ))}
//       </div>
//     ))}
//   </div>
//   <Sidebar />
// </div>

//     );
// }

// export default VisualCheck;



import React, { useState, useEffect } from 'react';
import '../css/VisualCheck.css';
import Sidebar from '../components/Sidebar';

function VisualCheck() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const apiUrl = 'http://18.197.69.165:5000/api/visual-check/visual-checks';

  const types = ['lg4', 'lg4_25', 'sg4', 'sg6', 'lasghna'];
  const checkListItems = [
    'apparentContamination',
    'cracksAndCracks',
    'whiteSpots',
    'homogeneity',
    'sectionAndShape',
    'visualColor'
  ];

  useEffect(() => {
    fetchData(); // Load all data initially
  }, []);

  const fetchData = async (date = '') => {
    setLoading(true);
    setError(null);
    try {
      let url = apiUrl;
      if (date) {
        url = `http://18.197.69.165:5000/api/visual-check/visual-checks/search?date=${date}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (e) {
      console.error('Error fetching data:', e);
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchDate.trim() === '') return;
    fetchData(searchDate);
  };

  return (
    <div className='app-layout'>
      <div className="content-area">
        <h2>Visual Check</h2>

        {/* 🔍 Search by Date */}
        <div className="search-bar">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>

        {loading ? (
          <div>Loading data...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : data.length === 0 ? (
          <div>No records found for this date.</div>
        ) : (
          data.map((record, index) => (
            <div key={index} className="checklist-grid">
              <div className="checklist-header">
                Checklist - {new Date(record.timestamp).toLocaleString()}
              </div>
              {types.map(type => (
                <div key={type} className="type-header">
                  {type.toUpperCase().replace('_25', '.25')}
                </div>
              ))}
              {checkListItems.map(item => (
                <React.Fragment key={item}>
                  <div className="checklist-item">{item}</div>
                  {types.map(type => (
                    <div key={`${index}-${item}-${type}`} className="data-cell">
                      {record[`${item}_${type}`] || 'N/A'}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          ))
        )}
      </div>
      <Sidebar />
    </div>
  );
}

export default VisualCheck;
