'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/app';

export function useTheme() {
  const { theme, setTheme } = useAppStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
}