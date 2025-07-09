import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a18cd1] via-[#fbc2eb] to-[#fcd5ce] py-12 px-6">
      <div className="max-w-4xl mx-auto shadow-xl bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#6b73ff] text-white rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-4">
          Contact Us
        </h1>
        <p className="text-center text-gray-200 mb-10">
          Have questions, feedback, or just want to say hello? Fill out the form below or reach us directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="space-y-4">
            <div className=' flex flex-col gap-2'>
              <label className="block text-lg font-medium">Name</label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div className=' flex flex-col gap-2'>
              <label className="block text-lg font-medium">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div className=' flex flex-col gap-2'>
              <label className="block text-lg font-medium">Message</label>
              <textarea
                required
                rows="4"
                placeholder="Your message"
                className="w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-indigo-700 font-semibold hover:bg-gray-100 py-2 px-4 rounded-md transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Details */}
          <div className="space-y-6 text-lg">
            <div>
              <h2 className="text-lgg font-semibold">Our Office</h2>
              <p className="text-gray-200">Aerocity Financial Office, Delhi</p>
            </div>
            <div>
              <h2 className="text-lgg font-semibold">Email</h2>
              <p className="text-gray-200">aryanrastogi@google.com</p>
            </div>
            <div>
              <h2 className="text-lgg font-semibold">Phone</h2>
              <p className="text-gray-200">+91 98278 26282</p>
            </div>
            <div>
              <h2 className="text-lgg font-semibold">Working Hours</h2>
              <p className="text-gray-200">Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
