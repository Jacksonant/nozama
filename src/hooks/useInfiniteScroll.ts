import { useEffect, useCallback } from 'react';

export function useInfiniteScroll(
  loading: boolean,
  hasMore: boolean,
  loadMore: () => void
) {
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 1000) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}