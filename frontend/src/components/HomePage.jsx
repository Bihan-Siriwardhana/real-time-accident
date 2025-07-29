import React, { useState } from 'react';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Live Alerts');
  
  const categories = [
    'Live Alerts', 'High Severity', 'Recent', 'Vehicle Collisions', 
    'Motorcycle', 'Pedestrian', 'Cleared', 'All Accidents'
  ];

  const accidents = [
    {
      id: 1,
      type: 'Multi-Vehicle',
      location: 'Galle Road, Colombo',
      time: '15 min ago',
      severity: 'High',
      status: 'Ongoing',
      vehicles: 3,
      image: 'https://images.unsplash.com/photo-1589983846997-e28d3fdcc312'
    },
    {
      id: 2,
      type: 'Single Vehicle',
      location: 'Kandy Road',
      time: '1 hour ago',
      severity: 'Medium',
      status: 'Cleared',
      vehicles: 1,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be'
    },
    {
      id: 3,
      type: 'Motorcycle',
      location: 'Kurunegala Junction',
      time: '2 hours ago',
      severity: 'Low',
      status: 'Ongoing',
      vehicles: 1,
      image: 'https://images.unsplash.com/photo-1622122098744-e9dc8b10159b'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <span className="mr-2">🚨</span> Accident Alert System
          </h1>
          <button className="bg-white text-red-600 px-4 py-2 rounded-md font-medium">
            Report Accident
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Category Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-1 bg-white rounded-lg shadow-sm p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  activeTab === category 
                    ? 'bg-red-100 text-red-600 font-medium' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
            <h3 className="text-gray-500">Total Today</h3>
            <p className="text-2xl font-bold">18</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <h3 className="text-gray-500">Ongoing</h3>
            <p className="text-2xl font-bold">7</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <h3 className="text-gray-500">Cleared</h3>
            <p className="text-2xl font-bold">11</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="text-gray-500">High Severity</h3>
            <p className="text-2xl font-bold">4</p>
          </div>
        </div>

        {/* Accident List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-100 p-3 font-medium text-gray-700">
            <div className="col-span-2">Type</div>
            <div className="col-span-3">Location</div>
            <div className="col-span-2">Time</div>
            <div className="col-span-1">Severity</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Vehicles</div>
            <div className="col-span-1">Details</div>
          </div>
          
          {accidents.map((accident) => (
            <div key={accident.id} className="grid grid-cols-12 p-3 border-b items-center hover:bg-gray-50">
              <div className="col-span-2 font-medium">{accident.type}</div>
              <div className="col-span-3 flex items-center">
                <img 
                  src={`${accident.image}?w=100&h=60&fit=crop`} 
                  alt="Accident scene" 
                  className="w-10 h-10 rounded-md object-cover mr-2"
                />
                {accident.location}
              </div>
              <div className="col-span-2 text-gray-600">{accident.time}</div>
              <div className="col-span-1">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  accident.severity === 'High' ? 'bg-red-100 text-red-800' :
                  accident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {accident.severity}
                </span>
              </div>
              <div className="col-span-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  accident.status === 'Ongoing' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {accident.status}
                </span>
              </div>
              <div className="col-span-1">{accident.vehicles}</div>
              <div className="col-span-1">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-semibold mb-3">Live Accident Map</h2>
          <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Map visualization would appear here</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2023 Accident Alert System | Emergency: 119</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;