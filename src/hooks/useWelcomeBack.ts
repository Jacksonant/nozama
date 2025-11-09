'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useCart } from '@/store/cart';

export function useWelcomeBack() {
  const { items } = useCart();

  useEffect(() => {
    // Check if this is the first load and there are items in cart
    const hasShownWelcome = sessionStorage.getItem('welcomeShown');
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    if (!hasShownWelcome && itemCount > 0) {
      toast.success(`Welcome back! You have ${itemCount} item${itemCount > 1 ? 's' : ''} in your cart`);
      sessionStorage.setItem('welcomeShown', 'true');
    }
  }, [items]);
}