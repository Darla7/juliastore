'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const BLOGS = [
  {
    id: 1,
    title: '5 Tips to Choose the Perfect Handmade Oils',
    excerpt: 'Discover how to select oils that suit your lifestyle and skin type...',
    story: `At JuliaStore, we know that choosing the right handmade oils can feel overwhelming. From soothing lavender blends to nourishing coconut oils, each product has its own personality and purpose. This guide walks you through five essential tips to select oils that complement your lifestyle and skin type. Learn how to enhance relaxation, boost wellness, and enjoy the true benefits of natural ingredients.`,
    image: '/blog-img/essential-oil.jpg',
  },
  {
    id: 2,
    title: 'Top Digital Items to Boost Productivity',
    excerpt: 'Check out the most useful digital items for your work and creativity...',
    story: `In today’s fast-paced digital world, the right tools can make a huge difference. From planners and templates to creative assets, our handpicked digital items are designed to help you stay organized, inspired, and productive. Whether you’re a freelancer, student, or entrepreneur, these items will streamline your workflow and add a touch of creativity to your daily routine.`,
    image: '/blog-img/digital-stuffs.jpg',
  },
  {
    id: 3,
    title: 'Gift Ideas for Your Loved Ones',
    excerpt: 'Unique and thoughtful gift ideas to make your loved ones smile...',
    story: `Finding the perfect gift isn’t always easy, but we’re here to help. JuliaStore offers unique and thoughtful ideas that are sure to bring a smile to anyone’s face. From personalized items to curated gift sets, our guide will inspire you to find something meaningful for birthdays, anniversaries, or just because. Make every occasion unforgettable with gifts that show you care.`,
    image: '/blog-img/gift-mug.jpg',
  },
];

export default function BlogSection() {
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);

  return (
    <section id="blog" className="py-20 px-6 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Our Blog</h2>
        <p className="mt-4 text-gray-600 text-lg">
          Stay updated with our latest articles, tips, and guides about products, gifts, and lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOGS.map((blog) => (
          <motion.div
            key={blog.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedBlog(blog.id)}
          >
            <div className="relative h-48 w-full">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
              <p className="text-gray-600 text-sm">{blog.excerpt}</p>
              <span className="mt-auto text-emerald-600 font-semibold hover:underline">
                Read More →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for full story */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              onClick={() => setSelectedBlog(null)}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {BLOGS.find((b) => b.id === selectedBlog)?.title}
            </h3>
            <p className="text-gray-600 text-lg whitespace-pre-line">
              {BLOGS.find((b) => b.id === selectedBlog)?.story}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

