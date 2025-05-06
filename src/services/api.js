const API_BASE_URL = 'http://localhost:5000/api';

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getShifts = () => fetchData('/shift/shifts');
export const getMsaData = () => fetchData('/moisture-analyses');
export const getNcrData = () => fetchData('/non-conformance/reports');
export const getLg4Data = () => fetchData('/lg4/lg4-data');
export const getLg425Data = () => fetchData('/lg4_25/all');
export const getSg4Data = () => fetchData('/sg4/all');
export const getSg6Data = () => fetchData('/sg6/all');
export const getRegrindData = () => fetchData('/Regrind/all');
