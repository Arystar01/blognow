// app/terms/page.jsx
import React from "react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-purple-50 to-blue-100 flex flex-col md:flex-row items-center justify-center px-6 py-12">
      {/* Left Image */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
        <img
          src="https://illustrations.popsy.co/purple/documents.svg"
          alt="Terms Illustration"
          className="w-80 md:w-96"
        />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Terms of Service</h1>
        <p className="text-gray-700 mb-4">
          These Terms of Service govern your use of our website and services. By accessing or using the site, you agree to be bound by these terms.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-4">
          By using our services, you agree to comply with and be legally bound by the terms and conditions set forth here.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">2. Use of the Service</h2>
        <p className="text-gray-600 mb-4">
          You agree not to misuse the services or help anyone else do so. This includes any illegal or unauthorized use.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">3. Intellectual Property</h2>
        <p className="text-gray-600 mb-4">
          All content, trademarks, and data on this site are the property of the company and protected by copyright laws.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">4. Termination</h2>
        <p className="text-gray-600 mb-4">
          We may suspend or terminate your access to the service at any time for violations of these Terms.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">5. Changes to Terms</h2>
        <p className="text-gray-600 mb-4">
          We reserve the right to modify these terms at any time. Continued use of the site indicates your acceptance of the new terms.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">6. Contact</h2>
        <p className="text-gray-600">
          If you have any questions about these Terms, contact us at <a href="mailto:legal@example.com" className="text-blue-500 underline">legal@example.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
