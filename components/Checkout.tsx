// 'use client';

// import { useMemo, useState } from 'react';
// import { allProducts } from '@/data/products';

// type Address = {
//   name: string;
//   phone: string;
//   email: string;
//   address: string;
//   city: string;
//   country: string;
// };

// export default function Checkout({ productId }: { productId: string | null }) {
//   const product = allProducts.find(p => p.id === productId);

//   const [address, setAddress] = useState<Address>({
//     name: '',
//     phone: '',
//     email: '',
//     address: '',
//     city: '',
//     country: '',
//   });

//   const [paymentMethod, setPaymentMethod] = useState('bank');

//   const requiresShipping =
//     product?.category === 'print-on-demand' ||
//     product?.category === 'actual-stuffs';

//   const shipping = useMemo(() => {
//     if (!product || !requiresShipping) return 0;

//     const city = address.city.trim().toLowerCase();
//     if (!city) return 0;
//     if (city === 'windhoek') return 5;
//     if (city === 'austrafstrauss') return 10;
//     return 15;
//   }, [address.city, product, requiresShipping]);

//   if (!product) return <div className="p-10">Product not found</div>;

//   const total = product.price + shipping;

//   return (
//     <div className="max-w-4xl mx-auto py-16 px-6">
//       <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//       {/* PRODUCT SUMMARY */}
//       <div className="bg-white shadow rounded-lg p-6 mb-8">
//         <h2 className="text-xl font-semibold">{product.name}</h2>
//         <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
//         {!requiresShipping && (
//           <p className="mt-2 text-sm text-green-600">
//             Digital product — no shipping required
//           </p>
//         )}
//       </div>

//       {/* ADDRESS FORM */}
//       {requiresShipping && (
//         <div className="bg-white shadow rounded-lg p-6 mb-8">
//           <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               placeholder="Full Name"
//               className="border p-3 rounded"
//               value={address.name}
//               onChange={e => setAddress({ ...address, name: e.target.value })}
//             />
//             <input
//               placeholder="Email Address"
//               type="email"
//               className="border p-3 rounded"
//               value={address.email}
//               onChange={e => setAddress({ ...address, email: e.target.value })}
//             />
//             <input
//               placeholder="Phone Number"
//               type="tel"
//               className="border p-3 rounded"
//               value={address.phone}
//               onChange={e => setAddress({ ...address, phone: e.target.value })}
//             />
//             <input
//               placeholder="Address"
//               className="border p-3 rounded"
//               value={address.address}
//               onChange={e => setAddress({ ...address, address: e.target.value })}
//             />
//             <input
//               placeholder="City"
//               className="border p-3 rounded"
//               value={address.city}
//               onChange={e => setAddress({ ...address, city: e.target.value })}
//             />
//             <input
//               placeholder="Country"
//               className="border p-3 rounded"
//               value={address.country}
//               onChange={e => setAddress({ ...address, country: e.target.value })}
//             />
//           </div>
//         </div>
//       )}

//       {/* PAYMENT */}
//       <div className="bg-white shadow rounded-lg p-6 mb-8">
//         <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
//         <div className="space-y-3">
//           {['bank', 'debit', 'credit'].map(method => (
//             <label key={method} className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 checked={paymentMethod === method}
//                 onChange={() => setPaymentMethod(method)}
//               />
//               {method === 'bank'
//                 ? 'Bank Transfer'
//                 : method === 'debit'
//                 ? 'Debit Card'
//                 : 'Credit Card'}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* TOTAL */}
//       <div className="bg-gray-100 rounded-lg p-6">
//         <p>Product: ${product.price.toFixed(2)}</p>
//         {requiresShipping && <p>Shipping: ${shipping.toFixed(2)}</p>}
//         <hr className="my-3" />
//         <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
//         <button className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800">
//           Confirm & Pay
//         </button>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { allProducts } from '@/data/products';
// import { useState, useMemo } from 'react';

// type Address = {
//   name: string;
//   phone: string;
//   email: string;
//   address: string;
//   city: string;
//   country: string;
// };

// type Props = {
//   productId: string;
// };

// export default function Checkout({ productId }: Props) {
//   const product = allProducts.find(p => p.id === productId);

//   const [address, setAddress] = useState<Address>({
//     name: '',
//     phone: '',
//     email: '',
//     address: '',
//     city: '',
//     country: '',
//   });

//   const [paymentMethod, setPaymentMethod] = useState('bank');

//   const requiresShipping =
//     product?.category === 'print-on-demand' ||
//     product?.category === 'actual-stuffs';

//   const shipping = useMemo(() => {
//     if (!product || !requiresShipping) return 0;

//     const city = address.city.trim().toLowerCase();
//     if (!city) return 0;
//     if (city === 'windhoek') return 5;
//     if (city === 'austrafstrauss') return 10;
//     return 15;
//   }, [address.city, product, requiresShipping]);

//   if (!product) return <div className="p-10">Product not found</div>;

//   const total = product.price + shipping;

//   return (
//     <div className="max-w-4xl mx-auto py-16 px-6">
//       <h1 className="text-3xl font-bold mb-8">Checkout</h1>
//       {/* Product Summary */}
//       <div className="bg-white shadow rounded-lg p-6 mb-8">
//         <h2 className="text-xl font-semibold">{product.name}</h2>
//         <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
//         {!requiresShipping && (
//           <p className="mt-2 text-sm text-green-600">
//             Digital product — no shipping required
//           </p>
//         )}
//       </div>

//       {/* Address Form */}
//       {requiresShipping && (
//         <div className="bg-white shadow rounded-lg p-6 mb-8">
//           <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input placeholder="Full Name" className="border p-3 rounded" value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} />
//             <input placeholder="Email" type="email" className="border p-3 rounded" value={address.email} onChange={e => setAddress({ ...address, email: e.target.value })} />
//             <input placeholder="Phone" type="tel" className="border p-3 rounded" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />
//             <input placeholder="Address" className="border p-3 rounded" value={address.address} onChange={e => setAddress({ ...address, address: e.target.value })} />
//             <input placeholder="City" className="border p-3 rounded" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
//             <input placeholder="Country" className="border p-3 rounded" value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} />
//           </div>
//         </div>
//       )}

//       {/* Payment */}
//       <div className="bg-white shadow rounded-lg p-6 mb-8">
//         <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
//         <div className="space-y-3">
//           {['bank', 'debit', 'credit'].map(method => (
//             <label key={method} className="flex items-center gap-2">
//               <input type="radio" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />
//               {method === 'bank' ? 'Bank Transfer' : method === 'debit' ? 'Debit Card' : 'Credit Card'}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Total */}
//       <div className="bg-gray-100 rounded-lg p-6">
//         <p>Product: ${product.price.toFixed(2)}</p>
//         {requiresShipping && <p>Shipping: ${shipping.toFixed(2)}</p>}
//         <hr className="my-3" />
//         <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
//         <button className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800">Confirm & Pay</button>
//       </div>
//     </div>
//   );
// }

'use client';

import { allProducts } from '@/data/products';
import { useMemo, useState } from 'react';

type Address = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
};

type Props = {
  productId: string | null;
};

export default function Checkout({ productId }: Props) {
  const product = allProducts.find(p => p.id === productId);

  const [address, setAddress] = useState<Address>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('bank');

  const requiresShipping =
    product?.category === 'print-on-demand' ||
    product?.category === 'actual-stuffs';

  const shipping = useMemo(() => {
    if (!product || !requiresShipping) return 0;

    const city = address.city.trim().toLowerCase();
    if (!city) return 0;
    if (city === 'windhoek') return 5;
    if (city === 'austrafstrauss') return 10;
    return 15;
  }, [address.city, product, requiresShipping]);

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  const total = product.price + shipping;

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* PRODUCT SUMMARY */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
        {!requiresShipping && (
          <p className="mt-2 text-sm text-green-600">
            Digital product — no shipping required
          </p>
        )}
      </div>

      {/* ADDRESS FORM */}
      {requiresShipping && (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Full Name"
              className="border p-3 rounded"
              value={address.name}
              onChange={e => setAddress({ ...address, name: e.target.value })}
            />
            <input
              placeholder="Email Address"
              type="email"
              className="border p-3 rounded"
              value={address.email}
              onChange={e => setAddress({ ...address, email: e.target.value })}
            />
            <input
              placeholder="Phone Number"
              type="tel"
              className="border p-3 rounded"
              value={address.phone}
              onChange={e => setAddress({ ...address, phone: e.target.value })}
            />
            <input
              placeholder="Address"
              className="border p-3 rounded"
              value={address.address}
              onChange={e => setAddress({ ...address, address: e.target.value })}
            />
            <input
              placeholder="City"
              className="border p-3 rounded"
              value={address.city}
              onChange={e => setAddress({ ...address, city: e.target.value })}
            />
            <input
              placeholder="Country"
              className="border p-3 rounded"
              value={address.country}
              onChange={e => setAddress({ ...address, country: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* PAYMENT */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="space-y-3">
          {['bank', 'debit', 'credit'].map(method => (
            <label key={method} className="flex items-center gap-2">
              <input
                type="radio"
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />
              {method === 'bank'
                ? 'Bank Transfer'
                : method === 'debit'
                ? 'Debit Card'
                : 'Credit Card'}
            </label>
          ))}
        </div>
      </div>

      {/* TOTAL */}
      <div className="bg-gray-100 rounded-lg p-6">
        <p>Product: ${product.price.toFixed(2)}</p>
        {requiresShipping && <p>Shipping: ${shipping.toFixed(2)}</p>}
        <hr className="my-3" />
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <button className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800">
          Confirm & Pay
        </button>
      </div>
    </div>
  );
}