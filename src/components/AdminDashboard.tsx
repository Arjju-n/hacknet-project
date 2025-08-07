import React, { useState } from 'react';
import { ArrowLeft, Users, Calendar, MapPin, Settings, CheckCircle, XCircle, AlertCircle, Eye, Filter, Search, Plus } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

interface PendingRequest {
  id: string;
  user: string;
  role: 'student' | 'faculty';
  venue: string;
  date: string;
  time: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
}

interface Venue {
  id: string;
  name: string;
  capacity: number;
  type: string;
  available: boolean;
  equipment: string[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'venues' | 'analytics'>('overview');

  const [pendingRequests] = useState<PendingRequest[]>([
    {
      id: '1',
      user: 'John Doe (Student)',
      role: 'student',
      venue: 'Main Auditorium',
      date: '2025-01-20',
      time: '14:00 - 16:00',
      purpose: 'Tech Club Annual Event',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '2',
      user: 'Dr. Smith (Faculty)',
      role: 'faculty',
      venue: 'Seminar Hall A',
      date: '2025-01-18',
      time: '10:00 - 12:00',
      purpose: 'Research Conference',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '3',
      user: 'Alice Johnson (Student)',
      role: 'student',
      venue: 'Conference Room 1',
      date: '2025-01-22',
      time: '15:00 - 17:00',
      purpose: 'Study Group Session',
      status: 'pending',
      priority: 'medium'
    }
  ]);

  const [venues] = useState<Venue[]>([
    {
      id: '1',
      name: 'Main Auditorium',
      capacity: 500,
      type: 'Auditorium',
      available: true,
      equipment: ['Projector', 'Sound System', 'Stage Lighting', 'Microphones']
    },
    {
      id: '2',
      name: 'Seminar Hall A',
      capacity: 100,
      type: 'Seminar Hall',
      available: false,
      equipment: ['Projector', 'Whiteboard', 'AC']
    },
    {
      id: '3',
      name: 'Conference Room 1',
      capacity: 25,
      type: 'Conference Room',
      available: true,
      equipment: ['TV Display', 'Video Conferencing', 'Whiteboard']
    },
    {
      id: '4',
      name: 'Lab 1',
      capacity: 50,
      type: 'Laboratory',
      available: true,
      equipment: ['Computers', 'Projector', 'Network Access']
    }
  ]);

  const handleRequestAction = (requestId: string, action: 'approve' | 'reject') => {
    console.log(`${action} request ${requestId}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">Manage venues and bookings</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Venue</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'requests', label: 'Pending Requests' },
            { id: 'venues', label: 'Venue Management' },
            { id: 'analytics', label: 'Analytics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-purple-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{pendingRequests.length}</h3>
                    <p className="text-gray-600 font-medium">Pending Requests</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{venues.length}</h3>
                    <p className="text-gray-600 font-medium">Total Venues</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {venues.filter(v => v.available).length}
                    </h3>
                    <p className="text-gray-600 font-medium">Available Venues</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">127</h3>
                    <p className="text-gray-600 font-medium">Total Users</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Booking approved for Main Auditorium</p>
                      <p className="text-sm text-gray-600">Tech Club Meeting - Jan 15, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">New booking request received</p>
                      <p className="text-sm text-gray-600">Conference Room 1 - Jan 22, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                    <Settings className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Venue capacity updated</p>
                      <p className="text-sm text-gray-600">Seminar Hall A - Updated to 100 capacity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Pending Requests</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search requests..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Filter className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          request.role === 'faculty' ? 'bg-teal-500' : 'bg-blue-500'
                        }`}></div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{request.user}</h3>
                          <p className="text-gray-600">{request.purpose}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <MapPin className="w-4 h-4" />
                              <span>{request.venue}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{request.date}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <span>{request.time}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                              {request.priority} priority
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleRequestAction(request.id, 'approve')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRequestAction(request.id, 'reject')}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Venues Tab */}
        {activeTab === 'venues' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Venue Management</h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {venues.map((venue) => (
                    <div key={venue.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">{venue.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          venue.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {venue.available ? 'Available' : 'Occupied'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">{venue.type}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">{venue.capacity} people</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Equipment:</p>
                        <div className="flex flex-wrap gap-1">
                          {venue.equipment.map((item, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          View Schedule
                        </button>
                        <button className="px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Trends</h3>
                <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">Chart would be displayed here</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Venues</h3>
                <div className="space-y-4">
                  {venues.slice(0, 4).map((venue, index) => (
                    <div key={venue.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{venue.name}</p>
                        <p className="text-sm text-gray-600">{venue.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{Math.floor(Math.random() * 50) + 10}</p>
                        <p className="text-sm text-gray-600">bookings</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">System Performance</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-green-600">98.5%</h4>
                  <p className="text-sm text-gray-600">System Uptime</p>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-blue-600">1.2s</h4>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-purple-600">95%</h4>
                  <p className="text-sm text-gray-600">User Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;