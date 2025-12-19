'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just log, you can connect to backend later
    console.log(formData);
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Left Text */}
        <div className="md:w-1/2 flex flex-col justify-center gap-6">
          <h2 className="text-4xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600 text-lg">
            We’d love to hear from you! Whether you have questions, feedback, or want to collaborate, our team is ready to help.
          </p>
          <p className="text-gray-600 text-lg">
            Fill out the form and we’ll get back to you as soon as possible. Your message matters to us!
          </p>
        </div>

        {/* Contact Form */}
        <div className="md:w-1/2">
          <form
            className="bg-gray-50 p-8 rounded-xl shadow-md flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col text-gray-700">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </label>

            <label className="flex flex-col text-gray-700">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </label>

            <label className="flex flex-col text-gray-700">
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={5}
                className="mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </label>

            <button
              type="submit"
              className="mt-4 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
