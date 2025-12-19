import { Product } from '@/types/product';

export const printOnDemandProducts: Product[] = [
 {
    id: '1',
    name: 'Custom T-Shirt',
    price: 24.99,
    image: '/pod-img/brown-tshirt-pod.jpg',
    category: 'print-on-demand',
    subcategory: 'tshirt',
    designer: {
      canvas: { width: 800, height: 600 },
      printArea: { x: 260, y: 170, width: 280, height: 320 },
      variants: [
        {
          color: 'brown',
          mockup: '/mockups/tshirt.png',
        }
      ],
    },
  },
  {
    id: '2',
    name: 'Custom Hoodie',
    price: 44.99,
    image: '/pod-img/white-hoodie-pod.jpg',
    category: 'print-on-demand',
    subcategory: 'hoodie',
    designer: {
      canvas: { width: 800, height: 600 },
      printArea: { x: 260, y: 200, width: 300, height: 320 },
      variants: [
        {
          color: 'white',
          mockup: '/mockups/hoodie.png',
        }
      ],
    },
  },
  {
    id: '3',
    name: 'Custom Hat',
    price: 19.99,
    image: '/pod-img/hat-pod.jpg',
    category: 'print-on-demand',
    subcategory: 'hat',
    designer: {
      canvas: { width: 700, height: 500 },
      printArea: { x: 250, y: 160, width: 200, height: 140 },
      variants: [
        {
          color: 'black',
          mockup: '/mockups/cap.png',
        }
      ],
    },
  },
  {
    id: '4',
    name: 'Custom Mug',
    price: 14.99,
    image: '/pod-img/mug-customize.jpg',
    category: 'print-on-demand',
    subcategory: 'mug',
    designer: {
      canvas: { width: 800, height: 500 },
      printArea: { x: 280, y: 180, width: 240, height: 200 },
      variants: [
        {
          color: 'white',
          mockup: '/mockups/mug.png',
        }
      ],
    },
  },
];

export const pdfTemplates: Product[] = [
  {
    id: '5',
    name: 'Monthly Planner',
    price: 9.99,
    image: '/pod-img/monthly-planner.jpg',
    category: 'pdf-templates',
  },
  {
    id: '6',
    name: 'Online Course',
    price: 49.99,
    image: '/pod-img/online-course.jpg',
    category: 'pdf-templates',
  },
  {
    id: '7',
    name: 'E-Book Bundle',
    price: 29.99,
    image: '/pod-img/ebook.jpg',
    category: 'pdf-templates',
  },
];

export const actualStuffs: Product[] = [
  {
    id: '8',
    name: 'Shea Butter',
    price: 15.99,
    image: '/pod-img/shea-butter.jpg',
    category: 'actual-stuffs',
  },
  {
    id: '9',
    name: 'Coconut Oil',
    price: 12.99,
    image: '/pod-img/coconut-oil.jpg',
    category: 'actual-stuffs',
  },
  {
    id: '10',
    name: 'Organic Soap',
    price: 8.99,
    image: '/pod-img/organic-soap.jpg',
    category: 'actual-stuffs',
  },
  {
    id: '11',
    name: 'Face Mask',
    price: 18.99,
    image: '/pod-img/face-mask.jpg',
    category: 'actual-stuffs',
  },
];

export const allProducts: Product[] = [
  ...printOnDemandProducts,
  ...pdfTemplates,
  ...actualStuffs,
];
