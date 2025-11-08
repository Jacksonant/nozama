'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useCart } from '@/store/cart';

export function useWelcomeBack() {
  const { items } = useCart();

  useEffect(() => {
    // Check if this is the first load and there are items in cart
    const hasShownWelcome = sessionStorage.getItem('welcomeShown');
    
    if (!hasShownWelcome && items.length > 0) {
      toast.success(`Welcome back! You have ${items.length} item${items.length > 1 ? 's' : ''} in your cart`);
      sessionStorage.setItem('welcomeShown', 'true');
    }
  }, [items]);
}