'use client';

import { useSearchParams } from 'next/navigation';
import Checkout from '@/components/Checkout';

export default function CheckoutWrapper() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  return <Checkout productId={productId} />;
}