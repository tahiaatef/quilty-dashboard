import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../css/dash.css'; // تأكد من وجود هذا الملف في المسار الصحيح
import logo from '../assets/savolafoods 1.png'; // تأكد من وجود هذا الملف في المسار الصحيح
function DashboardPage() {
  const [shifts, setShifts] = useState([]);
  const [nonConformanceReports, setNonConformanceReports] = useState([]);
  const [regrindData, setRegrindData] = useState([]);
  const [moistureAnalyses, setMoistureAnalyses] = useState([]);
  const [lg4Data, setLg4Data] = useState([]);
  const [lg4_25Data, setLg4_25Data] = useState([]);
  const [sg4Data, setSg4Data] = useState([]);
  const [sg6Data, setSg6Data] = useState([]);
  const today = new Date().toISOString().split('T')[0]; // تنسيق تاريخ اليوم YYYY-MM-DD

  useEffect(() => {
    // دوال لجلب البيانات من كل endpoint وتصفيتها حسب تاريخ اليوم
    const fetchAndFilter = async (url, setData, dateField) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (Array.isArray(data)) {
          const filteredData = data.filter(item => item[dateField]?.startsWith(today));
          setData(filteredData);
        } else if (data?.data && Array.isArray(data.data)) {
          const filteredData = data.data.filter(item => item[dateField]?.startsWith(today));
          setData(filteredData);
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    // استدعاء دوال جلب البيانات
    fetchAndFilter('http://localhost:5000/api/shift/shifts', setShifts, 'createdAt');
    fetchAndFilter('http://localhost:5000/api/non-conformance/reports', setNonConformanceReports, 'timestamp');
    fetchAndFilter('http://localhost:5000/api/Regrind/all', setRegrindData, 'timestamp');
    fetchAndFilter('http://localhost:5000/api/moisture-analyses', setMoistureAnalyses, 'timestamp');
    fetchAndFilter('http://localhost:5000/api/lg4/lg4-data', setLg4Data, 'createdAt');
    fetchAndFilter('http://localhost:5000/api/lg4_25/all', setLg4_25Data, 'createdAt');
    fetchAndFilter('http://localhost:5000/api/sg4/all', setSg4Data, 'createdAt');
    fetchAndFilter('http://localhost:5000/api/sg6/all', setSg6Data, 'createdAt');
  }, [today]);

  return (
    <div className='app-layout'>
    <div className='content-area'>
      <section className='dashboard-header'>
        <div className='logo'>
          <img src={logo} alt="Savola Logo" className='logo-image' />
        </div>
      <h1 className='dashboard-title'>Savola Dashboard</h1>
      <h1 className='today'>TODAY({today})</h1>
      <a href="http://localhost:5000/api/export-excel/save" download="اسم_الملف.xlsx" className="btn-download">
          <button>Download Excel</button>
      </a>
      </section>
      <h3 className='latest-activities-title'> Latest Activities </h3>
      <section className='dashboard-section'>
        <h2 className='dashboard-section-title'>Shift</h2>
        {shifts.length > 0 ? (
          <table>
            <thead>
              <tr>
              <th>Date</th>
              <th>Time</th>
                <th>username</th>
                <th>Email</th>  
                <th>shift</th>
              </tr>
            </thead>
            <tbody>
            {shifts.map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{new Date(item.createdAt).toLocaleTimeString()}</td>
              <td>{item.userId?.username}</td>
              <td>{item.userId?.email}</td>
              <td>{item.shift}</td>
            </tr>
          ))}
            </tbody>
          </table>
        ) : (
          <p>not found shifts for today</p>
        )}
      </section>

      <section className='dashboard-section'>
        <h2 className='dashboard-section-title'>NCR</h2>
        {nonConformanceReports.length > 0 ? (
          <table>
            <thead>
              <tr>
              <th>Date</th>
              <th>Time</th>
                <th>productionLine</th>
                <th>complaintDetails</th>  
                <th>correctiveAction</th>
                <th>createdBy</th>
              </tr>
            </thead>
            <tbody>
              {nonConformanceReports.map(report => (
                <tr key={report._id}>
                  <td>{new Date(report.timestamp).toLocaleDateString()}</td>
                  <td>{new Date(report.timestamp).toLocaleTimeString()}</td>
                  <td>{report.productionLine}</td>
                  <td>{report.complaintDetails}</td>
                  <td>{report.correctiveAction}</td>
                  <td>{report.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>not found NCR for today</p>
        )}
      </section>

      <section className='dashboard-section'>
        <h2  className='dashboard-section-title'>Regrind</h2>
        {regrindData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>lg4</th>
                <th>lg4_25</th>
                <th>sg4</th>
                <th>sg6</th>
              </tr>
            </thead>
            <tbody>
              {regrindData.map(item => (
                <tr key={item._id}>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>{new Date(item.timestamp).toLocaleTimeString()}</td>
                  <td>{item.lg4}</td>
                  <td>{item.lg4_25}</td>
                  <td>{item.sg4}</td>
                  <td>{item.sg6}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>not found regrind for today</p>
        )}
      </section>
{/* 
      <section className='dashboard-section'>
        <h2  className='dashboard-section-title'>Moisture Analyses</h2>
        {moistureAnalyses.length > 0 ? (
          <table>
            <thead>
              <tr>
              <th>Date</th>
              <th>Time</th>
                <th>msa_lg4_values</th>
                <th>msa_lg4_average</th>
                <th>msa_lg4_25_values</th>
                <th>msa_lg4_25_average</th>
                <th>msa_sg4_values</th>
                <th>msa_sg4_average</th>
                <th>msa_sg6_values</th>
                <th>msa_sg6_average</th>
              </tr>
            </thead>
            <tbody>
              {moistureAnalyses.map(analysis => (
                <tr key={analysis._id}>
                  <td>{new Date(analysis.timestamp).toLocaleDateString()}</td>
                  <td>{new Date(analysis.timestamp).toLocaleTimeString()}</td>
                  <td>{analysis.msa_lg4_values.join(', ')}</td>
                  <td>{analysis.msa_lg4_average}</td>
                  <td>{analysis.msa_lg4_25_values.join(', ')}</td>
                  <td>{analysis.msa_lg4_25_average}</td>
                  <td>{analysis.msa_sg4_values.join(', ')}</td>
                  <td>{analysis.msa_sg4_average}</td>
                  <td>{analysis.msa_sg6_values.join(', ')}</td>
                  <td>{analysis.msa_sg6_average}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>not found moisture analyses for today</p>
        )}
      </section> */}
      <section className='dashboard-section moisture-analyses-section'>
    <h2 className='dashboard-section-title'>Moisture Analyses</h2>
    {moistureAnalyses.length > 0 ? (
        <div className='moisture-analyses-container'>
            {moistureAnalyses.map(analysis => (
                <div key={analysis._id} className='moisture-analysis-item'>
                    <h3 className='analysis-date-time'>
                        {new Date(analysis.timestamp).toLocaleDateString()} - {new Date(analysis.timestamp).toLocaleTimeString()}
                    </h3>
                    <div className='analysis-data'>
                        <div className='data-pair'>
                            <span className='data-label'>MSA LG4 Values:</span>
                            <span className='data-value'>{analysis.msa_lg4_values.join(', ')}</span>
                        </div>
                        <div className='data-pair'>
                            <span className='data-label'>MSA LG4 Average:</span>
                            <span className='data-value'>{analysis.msa_lg4_average}</span>
                        </div>
                        <div className='data-pair'>
                            <span className='data-label'>MSA LG4.25 Values:</span>
                            <span className='data-value'>{analysis.msa_lg4_25_values.join(', ')}</span>
                        </div>
                        <div className='data-pair'>
                            <span className='data-label'>MSA LG4.25 Average:</span>
                            <span className='data-value'>{analysis.msa_lg4_25_average}</span>
                        </div>
                        <div className='data-pair'>
                            <span className='data-label'>MSA SG4 Values:</span>
                            <span className='data-value'>{analysis.msa_sg4_values.join(', ')}</span>
                        </div>
                        <div className='data-pair'>
                            <span className='data-label'>MSA SG4 Average:</span>
                            <span className='data-value'>{analysis.msa_sg4_average}</span>
                        </div>
                        <div className='data-pair'>
                            <span className='data-label'>MSA SG6 Values:</span>
                            <span className='data-value'>{analysis.msa_sg6_values.join(', ')}</span>
                        </div>
                        <div className='data-pair'>
                            <span className='data-label'>MSA SG6 Average:</span>
                            <span className='data-value'>{analysis.msa_sg6_average}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <p className='no-data'>No moisture analyses for today</p>
    )}
</section>

      <section className='dashboard-section'>
        <h2 className='dashboard-section-title'>PMVF</h2>
        <section>
          <h3>LG4 Data</h3>
          {lg4Data.length > 0 ? (
            <table>
              <thead>
                <tr>
                <th>Date</th>
                <th>Time</th>
                  <th>M1</th>
                  <th>M2</th>
                  <th>M3</th>
                  <th>M4</th>
                  <th>averageWeights</th>
                  <th>overallAverageWeight</th>
                </tr>
              </thead>
              <tbody>
                {lg4Data.map(item => (
                  <tr key={item._id}>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(item.createdAt).toLocaleTimeString()}</td>
                    <td>{item.weights.M1.join(', ')}</td>
                    <td>{item.weights.M2.join(', ')}</td>
                    <td>{item.weights.M3.join(', ')}</td>  
                    <td>{item.weights.M4.join(', ')}</td>
                    <td>{item.averageWeights.join(', ')}</td>
                    <td>{item.overallAverageWeight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>not found lg4 for today</p>
          )}
        </section>

        <section>
          <h3>LG4.25 Data</h3>
          {lg4_25Data.length > 0 ? (
            <table>
              <thead>
                <tr>
                <th>Date</th>
                <th>Time</th>
                  <th>M5</th>
                  <th>M6</th>
                  <th>M7</th>
                  <th>M8</th>
                  <th>averageWeights</th>
                  <th>overallAverageWeight</th>
                  {/* إضافة أعمدة أخرى حسب هيكل البيانات */}
                </tr>
              </thead>
              <tbody>
                {lg4_25Data.map(item => (
                  <tr key={item._id}>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(item.createdAt).toLocaleTimeString()}</td>
                    <td>{item.weights.M5.join(', ')}</td>
                    <td>{item.weights.M6.join(', ')}</td>
                    <td>{item.weights.M7.join(', ')}</td>  
                    <td>{item.weights.M8.join(', ')}</td>
                    <td>{item.averageWeights.join(', ')}</td>
                    <td>{item.overallAverageWeight}</td>
                    {/* إضافة خلايا أخرى حسب هيكل البيانات */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>not found lg4.25 data for today</p>
          )}
        </section>

        <section>
          <h3>SG4 Data</h3>
          {sg4Data.length > 0 ? (
            <table>
              <thead>
                <tr>
                <th>Date</th>
                <th>Time</th>
                  <th>M1</th>
                  <th>M2</th>
                  <th>M9</th>
                  <th>M10</th>
                  <th>avarageWeights</th>
                  <th>overallAverageWeight</th>
                  {/* إضافة أعمدة أخرى حسب هيكل البيانات */}
                </tr>
              </thead>
              <tbody>
                {sg4Data.map(item => (
                  <tr key={item._id}>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(item.createdAt).toLocaleTimeString()}</td>
                    <td>{item.weights.M1.join(', ')}</td>
                    <td>{item.weights.M2.join(', ')}</td>
                    <td>{item.weights.M9.join(', ')}</td>  
                    <td>{item.weights.M10.join(', ')}</td>
                    <td>{item.averageWeights.join(', ')}</td>
                    <td>{item.overallAverageWeight}</td>
                    {/* إضافة خلايا أخرى حسب هيكل البيانات */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>not found sg4data for today</p>
          )}
        </section>

        <section>
          <h3>SG6 Data</h3>
          {sg6Data.length > 0 ? (
            <table>
              <thead>
                <tr>
                <th>Date</th>
                <th>Time</th>
                  <th>M3</th>
                  <th>M4</th>
                  <th>M5</th>
                  <th>M6</th>
                  <th>M7</th>
                  <th>M8</th>
                  <th>averageWeights</th>
                  <th>overallAverageWeight</th>
                  {/* إضافة أعمدة أخرى حسب هيكل البيانات */}
                </tr>
              </thead>
              <tbody>
                {sg6Data.map(item => (
                  <tr key={item._id}>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(item.createdAt).toLocaleTimeString()}</td>
                    <td>{item.weights.M3.join(', ')}</td>
                    <td>{item.weights.M4.join(', ')}</td>
                    <td>{item.weights.M5.join(', ')}</td>  
                    <td>{item.weights.M6.join(', ')}</td>
                    <td>{item.weights.M7.join(', ')}</td>
                    <td>{item.weights.M8.join(', ')}</td>
                    <td>{item.averageWeights.join(', ')}</td>
                    <td>{item.overallAverageWeight}</td>
                    {/* إضافة خلايا أخرى حسب هيكل البيانات */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>not found sg6Data for today</p>
          )}
        </section>
      </section>
    </div>
    <Sidebar />
    </div>
  );
}

export default DashboardPage;


