import React, { useState, ChangeEvent } from "react";
import { Mail, Upload, AlertTriangle, Send } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

interface EmailData {
  singleEmail: string;
  emailList: string[];
}

interface ApiResponse {
  message: string;
  results?: {
    success: string[];
    failed: string[];
  };
}

function Phishing() {
  const [emailData, setEmailData] = useState<EmailData>({
    singleEmail: "",
    emailList: [],
  });
  const [loading, setLoading] = useState(false);

  const handleSingleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailData((prev) => ({
      ...prev,
      singleEmail: e.target.value,
    }));
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const emails = text
        .split("\n")
        .map((email) => email.trim())
        .filter((email) => email);

      setEmailData((prev) => ({
        ...prev,
        emailList: emails,
      }));
      toast.success(`Successfully loaded ${emails.length} email(s)`);
    } catch (error) {
      toast.error("Failed to read the file");
      console.error("Error reading file:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const allEmails = [
      ...emailData.emailList,
      ...(emailData.singleEmail ? [emailData.singleEmail] : []),
    ];

    if (allEmails.length === 0) {
      toast.error("Please provide at least one email address");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/send-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'omit', // Don't send cookies
        body: JSON.stringify({ emails: allEmails }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      toast.success(data.message);
      
      // Reset form after successful submission
      setEmailData({ singleEmail: "", emailList: [] });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send emails. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-12 h-12 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Phishing Simulation Tool</h1>
            <p className="text-gray-400">Educational Purpose Only</p>
          </div>

          <div className="bg-yellow-600/20 border border-yellow-500 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
              <p className="text-yellow-500 text-sm">
                This tool is intended for security testing and educational purposes only.
                Unauthorized use for malicious purposes is strictly prohibited.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 shadow-xl">
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Single Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
                value={emailData.singleEmail}
                onChange={handleSingleEmailChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Or Upload Email List (txt file)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-600 transition-colors"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  <span>Choose File</span>
                </label>
              </div>
              {emailData.emailList.length > 0 && (
                <p className="mt-2 text-sm text-gray-400">
                  {emailData.emailList.length} email(s) loaded
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || (!emailData.singleEmail && emailData.emailList.length === 0)}
              className={`w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 font-medium transition-colors ${
                loading || (!emailData.singleEmail && emailData.emailList.length === 0)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <Send className="w-5 h-5 mr-2" />
              {loading ? "Processing..." : "Start Simulation"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>
              Remember to follow ethical guidelines and obtain proper authorization
              before conducting security tests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Phishing;