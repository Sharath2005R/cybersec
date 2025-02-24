import React, { useState } from 'react';
import { ShieldAlert, Globe, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

export function Home() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<null | boolean>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setScanning(true);
    // Simulate scan
    setTimeout(() => {
      setScanning(false);
      setResults(true);
    }, 3000);
  };

  return (
    <>
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Secure Your Website Against Vulnerabilities
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Scan your website for security vulnerabilities, performance issues, and best practices violations.
        </p>

        <form onSubmit={handleScan} className="max-w-2xl mx-auto mb-16">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="url"
                placeholder="Enter your website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-40 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={scanning}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {scanning ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5" />
                  Scan Now
                </>
              )}
            </button>
          </div>
        </form>

        {results !== null && (
          <div className="bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
              <CheckCircle className="text-green-400" />
              Scan Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <Lock className="w-6 h-6 text-green-400 mb-2" />
                <h3 className="font-semibold mb-2">SSL/TLS</h3>
                <p className="text-gray-300">Valid certificate detected</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-400 mb-2" />
                <h3 className="font-semibold mb-2">Headers</h3>
                <p className="text-gray-300">Security headers need review</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <section id="features" className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg">
              <ShieldAlert className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Vulnerability Scanning</h3>
              <p className="text-gray-300">Detect common security vulnerabilities and weaknesses in your web applications.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <Lock className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">SSL Analysis</h3>
              <p className="text-gray-300">Verify SSL/TLS configuration and certificate validity.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <AlertTriangle className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Security Headers</h3>
              <p className="text-gray-300">Check implementation of security headers and best practices.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}