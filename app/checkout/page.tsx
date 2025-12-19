import { Suspense } from 'react';
import CheckoutWrapper from '../../components/CheckoutWrapper';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading checkout...</div>}>
      <CheckoutWrapper />
    </Suspense>
  );
}