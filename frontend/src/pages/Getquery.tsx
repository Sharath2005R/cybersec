import React, { useState } from 'react';
import { ShieldAlert, Globe, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Terminal, Database, Server, Wifi, UserCheck, FileText, ShieldCheck, ShieldX } from 'lucide-react';
import axios from 'axios';

export function Geturl() {
  const { id } = useParams();
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);

  const [results, setResults] = useState<null | {
    error?: string;
    domain?: string;
    valid_from?: string;
    valid_to?: string;
    issuer?: string;
    subject?: string;
    serial_number?: string;
    secure?: boolean;
    headers?: string[];
    sqli_vulnerable_urls?: string[];
    sqli_vulnerabilities?: {
      type: string;
      location: string;
      payload: string;
      vulnerable: boolean;
    }[];
    xss_vulnerabilities?: {
      type: string;
      location: string;
      payload: string;
      vulnerable: boolean;
    }[];
    cors_vulnerabilities?: {
      allowed_origins?: string[];
      exposed_headers?: string[];
      credentials_allowed?: boolean;
      vulnerable?: boolean;
    };
  }>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setScanning(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/scan", { url: url, id: Number(id) });

      console.log("API Response:", response.data); // Log the response
      setResults(response.data); // Store API response
    } catch (error) {
      console.error("Error scanning:", error);
      setResults({ error: "Failed to scan. Please try again." });
    } finally {
      setScanning(false);
    }
  };

  const vulnerabilities = [
    {
      id: 1,
      title: 'SQL Injection',
      icon: Database,
      description: 'Database vulnerability allowing malicious SQL code execution',
      severity: 'High',
    },
    {
      id: 2,
      title: 'Cross-Site Scripting (XSS)',
      icon: Terminal,
      description: 'Client-side code injection vulnerability',
      severity: 'High',
    },
    {
      id: 3,
      title: 'SSL Certification',
      icon: Server,
      description: 'Allows attackers to run arbitrary commands on the server',
      severity: 'Critical',
    },
    {
      id: 4,
      title: 'Header Scanner',
      icon: Wifi,
      description: 'Network traffic interception vulnerability',
      severity: 'Medium',
    },
    {
      id: 5,
      title: 'CORS Attack',
      icon: Globe,
      description: 'It prevents unauthorized access to sensitive data by restricting cross-origin requests unless explicitly allowed by the server.',
      severity: 'Medium',
    },
    {
      id: 6,
      title: 'Buffer Overflow',
      icon: ShieldAlert,
      description: 'Memory corruption vulnerability',
      severity: 'Critical',
    },
  ];

  const vuln = vulnerabilities.find((v) => v.id === Number(id));

  return (
    <>
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Secure Your Website Against Vulnerabilities
        </h1>
        <h1 className="text-5xl font-bold mb-6">{vuln?.title}</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">{vuln?.description}</p>

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

            {results.error ? (
              <div className="bg-red-500 text-white p-4 rounded-lg">
                <p className="font-semibold">Error: {results.error}</p>
              </div>
            ) : (
              <>
                {id === "1" ? (
                  // ✅ SQL Injection Results
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">SQL Injection Vulnerabilities</h3>
                    {results.sqli_vulnerabilities && results.sqli_vulnerabilities.length > 0 ? (
                      results.sqli_vulnerabilities.map((vuln, index) => (
                        <div key={index} className="mb-4">
                          <p className="text-gray-300">
                            <strong>Type:</strong> {vuln.type}
                          </p>
                          <p className="text-gray-300">
                            <strong>Location:</strong> {vuln.location}
                          </p>
                          <p className="text-gray-300">
                            <strong>Payload:</strong> {vuln.payload}
                          </p>
                          <p className="text-gray-300">
                            <strong>Status:</strong>{" "}
                            <span className={`font-bold ${vuln.vulnerable ? "text-red-400" : "text-green-400"}`}>
                              {vuln.vulnerable ? "Vulnerable" : "Not Vulnerable"}
                            </span>
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-300">No SQL Injection vulnerabilities found.</p>
                    )}
                  </div>
                ) : id === "2" ? (
                  // ✅ XSS Results
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">XSS Vulnerabilities</h3>
                    {results.xss_vulnerabilities && results.xss_vulnerabilities.length > 0 ? (
                      results.xss_vulnerabilities.map((vuln, index) => (
                        <div key={index} className="mb-4">
                          <p className="text-gray-300">
                            <strong>Type:</strong> {vuln.type}
                          </p>
                          <p className="text-gray-300">
                            <strong>Location:</strong> {vuln.location}
                          </p>
                          <p className="text-gray-300">
                            <strong>Payload:</strong> {vuln.payload}
                          </p>
                          <p className="text-gray-300">
                            <strong>Status:</strong>{" "}
                            <span className={`font-bold ${vuln.vulnerable ? "text-red-400" : "text-green-400"}`}>
                              {vuln.vulnerable ? "Vulnerable" : "Not Vulnerable"}
                            </span>
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-300">No XSS vulnerabilities found.</p>
                    )}
                  </div>
                ) : id === "3" ? (
                  // ✅ SSL Certificate Details
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <Lock className="w-6 h-6 text-green-400 mb-2" />
                      <h3 className="font-semibold mb-2">Domain</h3>
                      <p className="text-gray-300">{results.domain || "N/A"}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-yellow-400 mb-2" />
                      <h3 className="font-semibold mb-2">Valid From</h3>
                      <p className="text-gray-300">{results.valid_from || "N/A"}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-yellow-400 mb-2" />
                      <h3 className="font-semibold mb-2">Valid Until</h3>
                      <p className="text-gray-300">{results.valid_to || "N/A"}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <Server className="w-6 h-6 text-blue-400 mb-2" />
                      <h3 className="font-semibold mb-2">Issuer</h3>
                      <p className="text-gray-300">{results.issuer || "N/A"}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <UserCheck className="w-6 h-6 text-blue-400 mb-2" />
                      <h3 className="font-semibold mb-2">Subject</h3>
                      <p className="text-gray-300">{results.subject || "N/A"}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-400 mb-2" />
                      <h3 className="font-semibold mb-2">Serial Number</h3>
                      <p className="text-gray-300">{results.serial_number || "N/A"}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      {results.secure ? (
                        <ShieldCheck className="w-6 h-6 text-green-400 mb-2" />
                      ) : (
                        <ShieldX className="w-6 h-6 text-red-400 mb-2" />
                      )}
                      <h3 className="font-semibold mb-2">SSL Status</h3>
                      <p className={`text-lg font-bold ${results.secure ? "text-green-400" : "text-red-400"}`}>
                        {results.secure ? "Secure" : "Not Secure"}
                      </p>
                    </div>
                  </div>

                ) : id === "4" ? (
                  // ✅ Security Headers Details
                  results?.headers && typeof results.headers === "object" ? (
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Security Headers</h3>
                      <ul className="list-disc list-inside text-gray-300">
                        {Object.entries(results.headers).map(([header, value]) => (
                          <li key={header}>
                            <strong>{header}:</strong> {String(value)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-red-400 font-semibold">No security headers found.</p>
                  )
                ) : null}

                {id === "5" ? (
                  // ✅ CORS Attack Results
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">CORS Configuration</h3>
                    {results.cors_vulnerabilities ? (
                      <>
                        <p className="text-gray-300">
                          <strong>Allowed Origins:</strong> {results.cors_vulnerabilities.allowed_origins?.join(", ") || "N/A"}
                        </p>
                        <p className="text-gray-300">
                          <strong>Exposed Headers:</strong> {results.cors_vulnerabilities.exposed_headers?.join(", ") || "N/A"}
                        </p>
                        <p className="text-gray-300">
                          <strong>Credentials Allowed:</strong> {results.cors_vulnerabilities.credentials_allowed ? "Yes" : "No"}
                        </p>
                        <p className="text-gray-300">
                          <strong>Status:</strong>{" "}
                          <span className={`font-bold ${results.cors_vulnerabilities.vulnerable ? "text-red-400" : "text-green-400"}`}>
                            {results.cors_vulnerabilities.vulnerable ? "Vulnerable" : "Not Vulnerable"}
                          </span>
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-300">No CORS vulnerabilities found.</p>
                    )}
                  </div>
                ) : null}





              </>


            )}
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