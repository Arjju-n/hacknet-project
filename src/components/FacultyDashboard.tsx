import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Plus, Search, Filter, CheckCircle, XCircle, AlertCircle, Upload, Star, Zap } from 'lucide-react';

interface FacultyDashboardProps {
  onBack: () => void;
}

interface Booking {
  id: string;
  venue: string;
  date: string;
  time: string;
  duration: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: boolean;
}

const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'book' | 'priority' | 'history'>('dashboard');

  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      venue: 'Main Auditorium',
      date: '2025-01-18',
      time: '10:00',
      duration: '3 hours',
      purpose: 'Research Conference on AI',
      status: 'approved',
      priority: true
    },
    {
      id: '2',
      venue: 'Seminar Hall A',
      date: '2025-01-25',
      time: '14:00',
      duration: '2 hours',
      purpose: 'Department Meeting',
      status: 'pending',
      priority: false
    },
    {
      id: '3',
      venue: 'Conference Room 2',
      date: '2025-01-20',
      time: '16:00',
      duration: '1 hour',
      purpose: 'Student Thesis Defense',
      status: 'approved',
      priority: true
    }
  ]);

  const venues = [
    'Main Auditorium',
    'Seminar Hall A',
    'Seminar Hall B',
    'Conference Room 1',
    'Conference Room 2',
    'Faculty Lounge',
    'Lab 1',
    'Lab 2',
    'Library Hall'
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
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
                <h1 className="text-xl font-bold text-gray-900">Faculty Portal</h1>
                <p className="text-sm text-gray-600">Enhanced booking privileges</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-teal-50 px-3 py-1 rounded-lg">
                <Star className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-700">Priority Access</span>
              </div>
              <button className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Priority Booking</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'book', label: 'Book Venue' },
            { id: 'priority', label: 'Priority Bookings' },
            { id: 'history', label: 'Booking History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-teal-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back, Dr. Professor!</h2>
                  <p className="text-teal-100 mb-4">You have enhanced booking privileges with priority access to all venues.</p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>Instant Approval</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span>Priority Scheduling</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Extended Booking Window</span>
                    </div>
                  </div>
                </div>
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <Star className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {bookings.filter(b => b.status === 'approved').length}
                    </h3>
                    <p className="text-gray-600 font-medium">Approved Bookings</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {bookings.filter(b => b.priority).length}
                    </h3>
                    <p className="text-gray-600 font-medium">Priority Bookings</p>
                  </div>
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-teal-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {bookings.filter(b => b.status === 'pending').length}
                    </h3>
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
                    <h3 className="text-2xl font-bold text-gray-900">{bookings.length}</h3>
                    <p className="text-gray-600 font-medium">Total Bookings</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Bookings</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(booking.status)}
                        {booking.priority && (
                          <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-teal-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.venue}</h3>
                          <p className="text-sm text-gray-600">{booking.purpose}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{booking.date}</p>
                        <p className="text-sm text-gray-600">{booking.time} - {booking.duration}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Book Venue Tab */}
        {activeTab === 'book' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book a Venue</h2>
            
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-teal-600" />
                <p className="text-teal-800 font-medium">Faculty Priority Access Active</p>
              </div>
              <p className="text-sm text-teal-700 mt-1">
                Your bookings receive priority approval and can override student bookings when necessary.
              </p>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="">Select a venue</option>
                    {venues.map((venue) => (
                      <option key={venue} value={venue}>{venue}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input 
                    type="time" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input 
                    type="time" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Attendees</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Number of people"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option value="">Select event type</option>
                  <option value="lecture">Lecture</option>
                  <option value="seminar">Seminar</option>
                  <option value="conference">Conference</option>
                  <option value="meeting">Meeting</option>
                  <option value="workshop">Workshop</option>
                  <option value="thesis-defense">Thesis Defense</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purpose/Event Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Describe the purpose of booking"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent h-32 resize-none"
                  placeholder="Provide detailed information about your event"
                ></textarea>
              </div>

              <div className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  id="priority" 
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="priority" className="text-sm font-medium text-gray-700">
                  Request Priority Booking (Override conflicts if necessary)
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Supporting Documents (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-400 transition-colors duration-200">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, DOC, or DOCX files only</p>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200"
                >
                  Submit Priority Request
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Priority Bookings Tab */}
        {activeTab === 'priority' && (
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Priority Bookings</h2>
              <p className="text-sm text-gray-600 mt-1">Bookings with enhanced privileges and instant approval</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {bookings.filter(b => b.priority).map((booking) => (
                  <div key={booking.id} className="border border-teal-200 bg-teal-50 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                          <Star className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{booking.venue}</h3>
                          <p className="text-gray-600">{booking.purpose}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{booking.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="w-4 h-4 text-teal-600" />
                          <span className="text-sm font-medium text-teal-700">Priority Booking</span>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Booking History</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search bookings..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                {bookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(booking.status)}
                        {booking.priority && (
                          <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-teal-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{booking.venue}</h3>
                          <p className="text-gray-600">{booking.purpose}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{booking.duration}</span>
                            </div>
                            {booking.priority && (
                              <div className="flex items-center space-x-1 text-teal-600">
                                <Star className="w-4 h-4" />
                                <span className="font-medium">Priority</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;