// 'use client';

// import { Product } from '@/types/product';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// type Props = {
//   product: Product;
// };

// const ProductCard = ({ product }: Props) => {
//   const router = useRouter();

//   const isActualStuff = product.category === 'actual-stuffs';
//   const isPrintOnDemand = product.category === 'print-on-demand'

// const handleClick = () => {
//   if (isActualStuff) {
//     router.push(`/checkout?productId=${product.id}`);
//     return;
//   }


//   if (isPrintOnDemand) {
//     router.push(`/customize/${product.id}`);
//     return;
//   }

//   // fallback (if any other category later)
//   alert(`${product.name} added to cart`);
// };


//   return (
//     <div className="bg-white rounded-lg shadow-md flex flex-col h-full">
//       {/* Image */}
//       <div className="relative w-full h-64 rounded-t-lg overflow-hidden">
//         <Image
//           src={product.image}
//           alt={product.name}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 100vw, 25vw"
//         />
//       </div>

//       {/* Content */}
//       <div className="p-4 flex flex-col flex-1">
//         <h2 className="text-lg font-semibold">{product.name}</h2>
//         <p className="text-gray-700 mt-2">
//           ${product.price.toFixed(2)}
//         </p>

//         {/* Button */}
//         <button
//           onClick={handleClick}
//           className={`mt-auto w-full py-2 rounded-lg font-semibold transition
//             ${
//               isPrintOnDemand
//                 ? 'bg-purple-600 text-white hover:bg-purple-700'
//                 : 'bg-green-600 text-white hover:bg-green-800'
//             }
//           `}
//         >
//           {isPrintOnDemand ? 'Customize Now' : 'Add to Cart'}
//         </button>
//         {/* Button */}


//       </div>
//     </div>
//   );
// };

// export default ProductCard;



'use client';

import { Product } from '@/types/product';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    switch (product.category) {
      case 'actual-stuffs':
        // Physical product → go to checkout
        router.push(`/checkout?productId=${product.id}`);
        break;

      case 'print-on-demand':
        // POD product → go to customize page
        router.push(`/customize/${product.id}`);
        break;

      case 'pdf-templates':
        // Digital product → maybe instant download or alert
        alert(`${product.name} added to your digital library`);
        break;

      default:
        alert(`${product.name} added to cart`);
    }
  };

  const getButtonText = () => {
    switch (product.category) {
      case 'actual-stuffs':
        return 'Add to Cart';
      case 'print-on-demand':
        return 'Customize Now';
      case 'pdf-templates':
        return 'Get Digital Item';
      default:
        return 'Add to Cart';
    }
  };

  const getButtonColor = () => {
    switch (product.category) {
      case 'print-on-demand':
        return 'bg-purple-600 hover:bg-purple-700';
      case 'actual-stuffs':
        return 'bg-green-600 hover:bg-green-800';
      case 'pdf-templates':
        return 'bg-blue-600 hover:bg-blue-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-full">
      {/* Product Image */}
      <div className="relative w-full h-64 rounded-t-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-700 mt-2">${product.price.toFixed(2)}</p>

        {/* Action Button */}
        <button
          onClick={handleClick}
          className={`mt-auto w-full py-2 rounded-lg font-semibold text-white transition ${getButtonColor()}`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
