// 'use client';

// import { useState } from 'react';
// import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';

// const Navigation = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isShopOpen, setIsShopOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-20">
//           <h1 className="text-2xl font-bold text-emerald-600">
//             JuliaStore
//           </h1>

//           <div className="hidden md:flex items-center space-x-8">
//             <a href="#home">Home</a>

//             <div
//               className="relative"
//               onMouseEnter={() => setIsShopOpen(true)}
//               onMouseLeave={() => setIsShopOpen(false)}
//             >
//               <button className="flex items-center">
//                 Shop <ChevronDown className="ml-1 w-4 h-4" />
//               </button>

//               {isShopOpen && (
//                 <div className="absolute bg-white shadow-lg rounded-md w-48">
//                   <a className="block px-4 py-2">Print on Demand</a>
//                   <a className="block px-4 py-2">PDF Templates</a>
//                   <a className="block px-4 py-2">Actual Stuffs</a>
//                 </div>
//               )}
//             </div>

//             <a href="#about">About</a>
//             <a href="#blog">Blog</a>
//             <a href="#contact">Contact</a>
//           </div>

//           <div className="hidden md:flex gap-4">
//             <User />
//             <ShoppingCart />
//           </div>

//           <button
//             className="md:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X /> : <Menu />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <h1 className="text-2xl font-bold text-emerald-600">JuliaStore</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">Home</Link>

            <div
              className="relative"
              onMouseEnter={() => setIsShopOpen(true)}
              onMouseLeave={() => setIsShopOpen(false)}
            >
              <button className="flex items-center">
                Shop <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              {isShopOpen && (
                <div className="absolute bg-white shadow-lg rounded-md w-48">
                  <Link className="block px-4 py-2" href="/shop/pod">Print on Demand</Link>
                  <Link className="block px-4 py-2" href="/shop/pdf">PDF Templates</Link>
                  <Link className="block px-4 py-2" href="/shop/actual">Actual Stuffs</Link>
                </div>
              )}
            </div>

            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex gap-4">
            <User />
            <ShoppingCart />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col">
          <Link href="/" className="px-4 py-2 border-b" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/about" className="px-4 py-2 border-b" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="/blog" className="px-4 py-2 border-b" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <Link href="/contact" className="px-4 py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
