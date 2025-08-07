import React from 'react';
import { Users, Shield, GraduationCap, ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: 'student' | 'admin' | 'faculty') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CampusBook</h1>
                <p className="text-sm text-gray-600">Smart Campus Utility</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>College Campus</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>24/7 Available</span>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Smart Campus
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Booking</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Streamline your venue reservations with our intelligent booking system. 
              Say goodbye to scheduling conflicts and approval delays.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Student Card */}
            <div 
              onClick={() => onRoleSelect('student')}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Student</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Book venues for club activities, events, and study sessions. Track your requests and manage bookings effortlessly.
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                  <span>Access Student Portal</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Admin Card */}
            <div 
              onClick={() => onRoleSelect('admin')}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Administrator</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Manage venues, approve requests, resolve conflicts, and oversee the entire booking system with advanced controls.
                </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors duration-300">
                  <span>Access Admin Panel</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Faculty Card */}
            <div 
              onClick={() => onRoleSelect('faculty')}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faculty</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Priority booking for academic activities, conferences, and departmental events with enhanced privileges.
                </p>
                <div className="flex items-center text-teal-600 font-semibold group-hover:text-teal-700 transition-colors duration-300">
                  <span>Access Faculty Portal</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-20 grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Availability</h4>
              <p className="text-sm text-gray-600">Check venue availability instantly</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Approvals</h4>
              <p className="text-sm text-gray-600">Automated approval workflows</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Venue Management</h4>
              <p className="text-sm text-gray-600">Comprehensive facility tracking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Conflict Resolution</h4>
              <p className="text-sm text-gray-600">Automatic scheduling optimization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;