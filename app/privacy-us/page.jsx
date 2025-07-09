// app/privacy/page.jsx
import React from "react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-blue-50 to-purple-100 flex flex-col md:flex-row items-center justify-center px-6 py-12">
      {/* Left Image Section */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
        <img
          src="https://illustrations.popsy.co/purple/padlock.svg"
          alt="Privacy Illustration"
          className="w-80 md:w-96"
        />
      </div>

      {/* Right Content Section */}
      <div className="w-full md:w-1/2 max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information.
        </p>
        
        <h2 className="text-2xl font-semibold text-purple-600 mt-6 mb-2">1. Information We Collect</h2>
        <p className="text-gray-600 mb-4">
          We may collect personal details such as name, email, usage data, and cookies when you interact with our services.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">
          Your information is used to improve our service, personalize your experience, and send necessary updates.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6 mb-2">3. Data Security</h2>
        <p className="text-gray-600 mb-4">
          We implement strong technical and organizational measures to ensure the security of your data.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6 mb-2">4. Your Rights</h2>
        <p className="text-gray-600 mb-4">
          You have the right to access, correct, or delete your personal information at any time.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6 mb-2">5. Contact Us</h2>
        <p className="text-gray-600">
          For any questions about this policy, email us at <a href="mailto:support@example.com" className="text-purple-500 underline">support@example.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
