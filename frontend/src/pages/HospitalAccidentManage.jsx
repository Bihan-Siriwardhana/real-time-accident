import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HospitalAccidentManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accident, setAccident] = useState(null);
  const [patientForm, setPatientForm] = useState({ name: '', age: '', wardNumber: '' });
  const [deathCount, setDeathCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccident();
  }, [id]);

  const fetchAccident = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/accidents/${id}`);
      const data = await response.json();
      if (data.success) {
        setAccident(data.data);
        setDeathCount(data.data.deaths);
      }
    } catch (error) {
      console.error('Error fetching accident:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/accidents/${id}/admit-patient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patientForm)
      });
      
      const data = await response.json();
      if (data.success) {
        setPatientForm({ name: '', age: '', wardNumber: '' });
        fetchAccident();
        alert('Patient admitted successfully');
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const updateDeaths = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/accidents/${id}/update-deaths`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ deathCount })
      });
      
      const data = await response.json();
      if (data.success) {
        fetchAccident();
        alert('Death count updated successfully');
      }
    } catch (error) {
      console.error('Error updating deaths:', error);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!accident) return <div className="p-6">Accident not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/hospital/dashboard')}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold mb-4">Manage Accident</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Location:</h3>
            <p>{accident.location}</p>
          </div>
          <div>
            <h3 className="font-semibold">Date:</h3>
            <p>{new Date(accident.accident_date).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Severity:</h3>
            <p className={`font-medium ${
              accident.severity_level === 'Critical' ? 'text-red-600' :
              accident.severity_level === 'High' ? 'text-orange-600' :
              accident.severity_level === 'Medium' ? 'text-yellow-600' : 'text-green-600'
            }`}>{accident.severity_level}</p>
          </div>
          <div>
            <h3 className="font-semibold">Description:</h3>
            <p>{accident.description}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Patient Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Admit New Patient</h2>
          <form onSubmit={addPatient} className="space-y-4">
            <input
              type="text"
              placeholder="Patient Name"
              value={patientForm.name}
              onChange={(e) => setPatientForm({...patientForm, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={patientForm.age}
              onChange={(e) => setPatientForm({...patientForm, age: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Ward Number"
              value={patientForm.wardNumber}
              onChange={(e) => setPatientForm({...patientForm, wardNumber: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Admit Patient
            </button>
          </form>
        </div>

        {/* Update Death Count */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Update Death Count</h2>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Number of Deaths"
              value={deathCount}
              onChange={(e) => setDeathCount(parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded"
              min="0"
            />
            <button
              onClick={updateDeaths}
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Update Death Count
            </button>
          </div>
        </div>
      </div>

      {/* Current Statistics */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Current Statistics</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded">
            <h3 className="font-semibold text-blue-600">Patients</h3>
            <p className="text-2xl font-bold">{accident.patients_in_hospital}</p>
          </div>
          <div className="p-4 bg-red-50 rounded">
            <h3 className="font-semibold text-red-600">Deaths</h3>
            <p className="text-2xl font-bold">{accident.deaths}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-semibold text-gray-600">Total</h3>
            <p className="text-2xl font-bold">{accident.total_people}</p>
          </div>
        </div>
      </div>

      {/* Patient List */}
      {accident.patients && accident.patients.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">Admitted Patients</h2>
          <div className="space-y-2">
            {accident.patients.map((patient, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded flex justify-between">
                <span>{patient.name}</span>
                <span className="text-gray-600">{patient.hospital}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalAccidentManage;