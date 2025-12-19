// const Hero = () => {
//   return (
//     <section className="relative h-150 w-full overflow-hidden">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: "url('/print-on-demand.jpg')",
//         }}
//       />

//       {/* Dark / Red Overlay */}
//       <div className="absolute inset-0 bg-red-900/80" />

//       {/* Content */}
//       <div className="relative z-10 h-full flex items-center justify-center">
//         <div className="max-w-4xl text-center text-white px-4">
//           {/* Small decorative text */}
//           <p className="uppercase tracking-widest text-sm mb-4 text-red-200">
//             Custom Print on Demand & Organic Products
//           </p>

//           {/* Main Heading */}
//           <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
//             DESIGN IT.
//             <br />
//             WE PRINT IT.
//             <br />
//             YOU WEAR IT.
//           </h1>

//           {/* Description */}
//           <p className="text-base md:text-lg text-gray-100 mb-8 leading-relaxed">
//             Create your own custom t-shirts, hoodies, mugs and more — or shop our
//             premium organic products made with care. High quality prints, fast
//             turnaround, and designs made just for you.
//           </p>

//           {/* CTA */}
//           <a
//             href="#print-on-demand"
//             className="inline-block bg-red-600 hover:bg-red-700 transition text-white px-10 py-4 font-semibold tracking-wide"
//           >
//             SHOP NOW
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import type { Variants } from 'framer-motion';


type TextAnimationKey = 'fadeUp' | 'slideLeft' | 'slideRight' | 'zoomIn';


/* ----------------------------------------
   1️⃣ SLIDES CONFIG (TOP LEVEL)
---------------------------------------- */
const slides: {
  type: 'image' | 'video';
  src: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  animation: TextAnimationKey;
}[] = [
  {
    type: 'image',
    src: '/hero-caroussel/buy-gift.jpg',
    title: 'Give Something Special',
    subtitle: 'Thoughtful gifts made to impress',
    cta: 'Shop Gifts',
    link: '#gifts',
    animation: 'fadeUp',
  },
  {
    type: 'image',
    src: '/hero-caroussel/get-digital-items.jpg',
    title: 'Instant Digital Items',
    subtitle: 'Download. Use. Enjoy.',
    cta: 'Browse Digital',
    link: '#digital',
    animation: 'slideLeft',
  },
  {
    type: 'video',
    src: '/hero-caroussel/holiday-sale.mp4',
    title: 'Holiday Sale',
    subtitle: 'Limited-time festive discounts',
    cta: 'Shop Sale',
    link: '#sale',
    animation: 'zoomIn',
  },
  {
    type: 'image',
    src: '/hero-caroussel/handmade-oil.jpg',
    title: 'Organic & Handmade',
    subtitle: 'Crafted with care and nature',
    cta: 'Explore Organic',
    link: '#organic',
    animation: 'fadeUp',
  },
  {
    type: 'video',
    src: '/hero-caroussel/african-exclusive-soap.mp4',
    title: 'African Exclusive Soap',
    subtitle: 'Authentic. Natural. Powerful.',
    cta: 'Discover More',
    link: '#african',
    animation: 'slideRight',
  },
];

/* ----------------------------------------
   2️⃣ TEXT ANIMATION PRESETS
---------------------------------------- */
const textAnimations: Record<TextAnimationKey, Variants> = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
};


const AUTO_TIME = 6000; // 6 seconds

/* ----------------------------------------
   3️⃣ HERO COMPONENT
---------------------------------------- */
const Hero = () => {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const slide = slides[index];
   const paginate = (dir: number) => {
    setIndex([(index + dir + slides.length) % slides.length, dir]);
    resetProgress();
  };

  // Progress bar
  const resetProgress = () => {
    if (!progressRef.current) return;
    progressRef.current.style.width = '0%';
    requestAnimationFrame(() => {
      if (progressRef.current)
        progressRef.current.style.width = '100%';
    });
  };

  useEffect(() => {
    if (paused) return;
    resetProgress();
    const timer = setTimeout(() => paginate(1), AUTO_TIME);
    return () => clearTimeout(timer);
  }, [index, paused]);

  return (
    <section className="relative h-[700px] overflow-hidden">
      {/* Slide */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {slide.type === 'video' ? (
            <video
              src={slide.src}
              autoPlay={!paused}
              loop
              muted={muted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <motion.div
          key={slide.title}
          {...textAnimations[slide.animation]}
          transition={{ duration: 0.9 }}
          className="max-w-4xl text-white"
        >
          <p className="uppercase tracking-widest text-sm text-red-200 mb-4">
            Custom Print on Demand & Organic Products
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            {slide.title}
          </h1>

          <p className="text-lg md:text-xl mb-8">
            {slide.subtitle}
          </p>

          <a
            href={slide.link}
            className="inline-block bg-red-600 hover:bg-red-700 px-10 py-4 font-semibold"
          >
            {slide.cta}
          </a>
        </motion.div>
      </div>

      {/* Video Controls */}
      {slide.type === 'video' && (
        <div className="absolute bottom-24 right-6 z-20 flex gap-3">
          <button onClick={() => setMuted(!muted)} className="bg-black/50 p-3 rounded-full">
            {muted ? <VolumeX className="text-white" /> : <Volume2 className="text-white" />}
          </button>
          <button onClick={() => setPaused(!paused)} className="bg-black/50 p-3 rounded-full">
            {paused ? <Play className="text-white" /> : <Pause className="text-white" />}
          </button>
        </div>
      )}

      {/* Arrows */}
      <button onClick={() => paginate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full">
        <ChevronLeft className="text-white" />
      </button>
      <button onClick={() => paginate(1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full">
        <ChevronRight className="text-white" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          ref={progressRef}
          className="h-full bg-red-500 transition-all duration-[6000ms] ease-linear"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm"
      >
        ↓ Scroll
      </motion.div>
    </section>
  );
};

export default Hero;