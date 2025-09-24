import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalDashboard = () => {
  const [accidents, setAccidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccidents();
  }, []);

  const fetchAccidents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/accidents/hospital/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setAccidents(data.data);
      }
    } catch (error) {
      console.error('Error fetching accidents:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Hospital Dashboard</h1>
      
      <div className="grid gap-4">
        {accidents.map((accident) => (
          <div key={accident._id} className="bg-white p-4 rounded-lg shadow border">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{accident.location}</h3>
                <p className="text-gray-600">{new Date(accident.accident_date).toLocaleDateString()}</p>
                <p className="text-sm">Severity: <span className={`font-medium ${
                  accident.severity_level === 'Critical' ? 'text-red-600' :
                  accident.severity_level === 'High' ? 'text-orange-600' :
                  accident.severity_level === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>{accident.severity_level}</span></p>
              </div>
              
              <div className="text-right">
                <p className="text-sm">Patients: {accident.patients_in_hospital}</p>
                <p className="text-sm">Deaths: {accident.deaths}</p>
                <p className="text-sm">Total: {accident.total_people}</p>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => navigate(`/hospital/accident/${accident._id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalDashboard;