"use client";

import dynamic from 'next/dynamic';

// Dynamically import CartDrawerContent to avoid SSR hydration mismatch
const CartDrawerContent = dynamic(() => import('./CartDrawerContent'), {
  ssr: false,
  loading: () => null,
});

export default function CartDrawer() {
  return <CartDrawerContent />;
}
