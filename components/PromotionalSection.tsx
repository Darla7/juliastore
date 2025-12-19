'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Promo data can later come from DB / CMS
const PROMOS = [
  {
    id: 1,
    title: 'Handmade Organic Soap',
    description:
      'Crafted in small batches using natural oils and botanical extracts. Our organic soap gently cleanses your skin while keeping it soft, hydrated, and healthy.',
    image: '/pod-img/organic-soap.jpg',
    href: '/shop/organic-soap',
  },
  {
    id: 2,
    title: 'Cold-Pressed Coconut Oil',
    description:
      'Extracted without heat to preserve nutrients. Perfect for cooking, skincare, and hair care — pure, nourishing, and chemical-free.',
    image: '/pod-img/coconut-oil.jpg',
    href: '/shop/coconut-oil',
  },
  {
    id: 3,
    title: 'Herbal Face Mask',
    description:
      'A calming blend of clay and herbs that detoxifies pores, reduces oil, and leaves your skin refreshed and glowing.',
    image: '/pod-img/face-mask.jpg',
    href: '/shop/face-mask',
  },
  {
    id: 4,
    title: 'Natural Body Scrub',
    description:
      'Made with sugar crystals and essential oils to gently exfoliate dead skin and restore natural radiance.',
    image: '/pod-img/body-scrub.jpg',
    href: '/shop/body-scrub',
  },
  {
    id: 5,
    title: 'Shea Butter Balm',
    description:
      'Deeply moisturizing shea butter balm for dry skin, lips, and cuticles — simple, effective, and pure.',
    image: '/pod-img/shea-butter.jpg',
    href: '/shop/shea-butter',
  },
];

const AUTO_SLIDE_MS = 5000;

const PromotionalSection = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef<number | null>(null);

  const current = PROMOS[index];

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => next(), AUTO_SLIDE_MS);
  };

  const prev = () => {
    setIndex((i) => (i === 0 ? PROMOS.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === PROMOS.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  // Swipe handlers (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    startX.current = null;
  };

  return (
    <section className="w-full bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Image */}
          <div className="relative h-80 md:h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {current.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {current.description}
                </p>

                <a
                  href={current.href}
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Shop this product
                </a>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={prev}
                className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={next}
                className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {PROMOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index ? 'bg-green-600 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalSection;
