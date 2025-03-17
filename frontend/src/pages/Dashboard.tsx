import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, AlertTriangle, Search, FileCheck, Users, AlertCircle } from 'lucide-react';
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Get auth status
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  const handleNavigation = () => {
    if (isAuthenticated) {
      navigate('/vulnerability');
    } else {
      setAuthMessage("You must be logged in to access this feature.");
      setTimeout(() => setAuthMessage(null), 3000); // Auto-hide message after 3 seconds
      navigate('/login'); // Redirect to login if not authenticated
    }
  };

  return (
    <div className="bg-dark-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Display Auth Message */}
        {authMessage && (
          <div className="mb-6 bg-red-700 text-white p-4 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{authMessage}</span>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Shield className="h-20 w-20 text-accent-500" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Secure Your Digital Infrastructure
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            SecureScanner provides enterprise-grade vulnerability assessment and security monitoring
            to protect your systems from emerging cyber threats. Our advanced scanning tools
            help identify, analyze, and remediate security vulnerabilities effectively.
          </p>
          <button
  onClick={handleNavigation}
  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-blue-700 active:scale-95"
>
  Start Security Assessment
</button>

        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-dark-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-dark-600">
            <Shield className="h-12 w-12 text-accent-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-white">Comprehensive Scanning</h3>
            <p className="text-gray-300">
              Advanced vulnerability scanning across your entire infrastructure using industry-leading
              tools and methodologies. Detect vulnerabilities before they can be exploited.
            </p>
          </div>
          <div className="bg-dark-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-dark-600">
            <Lock className="h-12 w-12 text-accent-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-white">Real-time Protection</h3>
            <p className="text-gray-300">
              Continuous monitoring and instant alerts about new vulnerabilities. Stay protected
              with automated security assessments and immediate threat notifications.
            </p>
          </div>
          <div className="bg-dark-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-dark-600">
            <AlertTriangle className="h-12 w-12 text-accent-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-white">Risk Assessment</h3>
            <p className="text-gray-300">
              Detailed risk analysis and prioritization of security vulnerabilities. Make informed
              decisions about your security posture with comprehensive reports.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-dark-800 rounded-xl shadow-lg p-8 mb-16 border border-dark-600">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Search className="h-16 w-16 text-accent-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">1. Scan</h3>
              <p className="text-gray-300">
                Select from our comprehensive catalog of vulnerability assessments
              </p>
            </div>
            <div className="text-center">
              <FileCheck className="h-16 w-16 text-accent-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">2. Analyze</h3>
              <p className="text-gray-300">
                Receive detailed analysis and actionable security insights
              </p>
            </div>
            <div className="text-center">
              <Users className="h-16 w-16 text-accent-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">3. Remediate</h3>
              <p className="text-gray-300">
                Get expert guidance on fixing vulnerabilities and improving security
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-dark-800 rounded-xl p-12 border border-dark-600">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Secure Your Systems?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your security assessment today and protect your infrastructure from cyber threats.
          </p>
            <button
      onClick={handleNavigation}
      className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-blue-700 active:scale-95"
    >
      Start Security Assessment
    </button>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
