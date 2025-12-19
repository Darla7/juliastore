// 'use client';

// import Image from 'next/image';

// export default function AboutSection() {
//   return (
//     <section id="about" className="py-16 px-6 md:px-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
//         {/* Image 1 */}
//         <div className="w-full md:w-1/2">
//           <Image
//             src="/hero-caroussel/handmade-oil.jpg" // replace with your first image
//             alt="Our Store"
//             width={600}
//             height={400}
//             className="rounded-lg shadow-lg object-cover"
//           />
//         </div>

//         {/* Text Content */}
//         <div className="w-full md:w-1/2 flex flex-col gap-6">
//           <h2 className="text-4xl font-bold text-gray-800">
//             About Our Store
//           </h2>
//           <p className="text-gray-600 text-lg">
//             Welcome to MyDigitalStore! We offer a wide range of unique products, from handmade oils to digital items, designed to make your life special. Our mission is to bring creativity and quality together for every customer.
//           </p>
//           <p className="text-gray-600 text-lg">
//             Each product is carefully curated with love and attention to detail. Whether you&apos;re shopping for yourself or looking for the perfect gift, we ensure an enjoyable and seamless experience.
//           </p>
//         </div>

//       </div>

//       {/* Image 2 */}
//       <div className="mt-12 w-full flex justify-center">
//         <Image
//           src="/pod-img/coconut-oil.jpg" // replace with your second image
//           alt="Our Products"
//           width={1000}
//           height={500}
//           className="rounded-lg shadow-lg object-cover"
//         />
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Image */}
        <motion.div
          className="w-full md:w-1/2 relative"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/hero-caroussel/handmade-oil.jpg"
            alt="Handmade Oils"
            width={600}
            height={400}
            className="rounded-xl shadow-xl object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col gap-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800">Discover JuliaStore</h2>
          <p className="text-gray-600 text-lg">
            At JuliaStore, we bring creativity and quality together. From handmade oils to digital products, every item is crafted with care to make your life special.
          </p>
          <p className="text-gray-600 text-lg">
            Whether shopping for yourself or looking for the perfect gift, we ensure a seamless and delightful experience.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-gray-800">Quality Products</h3>
              <p className="text-gray-500 text-sm">Handpicked and carefully curated items for you.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-gray-800">Fast Delivery</h3>
              <p className="text-gray-500 text-sm">Prompt shipping to get your items on time.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-gray-800">Unique Gifts</h3>
              <p className="text-gray-500 text-sm">Special products for every occasion.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-gray-800">Customer Love</h3>
              <p className="text-gray-500 text-sm">We care about your happiness and satisfaction.</p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="mt-6 inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition duration-300">
            <ShoppingCart className="w-5 h-5" /> Shop Now
          </button>
        </motion.div>
      </div>

      {/* Bottom Image */}
      <motion.div
        className="mt-16 w-full flex justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/pod-img/coconut-oil.jpg"
          alt="Coconut Oil"
          width={1000}
          height={500}
          className="rounded-xl shadow-xl object-cover hover:scale-105 transition-transform duration-500"
        />
      </motion.div>
    </section>
  );
}
