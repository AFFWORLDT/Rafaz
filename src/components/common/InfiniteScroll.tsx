"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface InfiniteScrollProps<T> {
  fetchMore: (page: number) => Promise<T[]>;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  loadingComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  threshold?: number;
  pageSize?: number;
}

export default function InfiniteScroll<T>({
  fetchMore,
  renderItem,
  className = "",
  itemClassName = "",
  loadingComponent,
  endComponent,
  threshold = 200,
  pageSize = 20
}: InfiniteScrollProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newItems = await fetchMore(page);
      
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchMore, page, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      {
        rootMargin: `${threshold}px`,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore, hasMore, loading, threshold]);

  useEffect(() => {
    // Load initial data
    loadMore();
  }, []);

  const defaultLoadingComponent = (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span className="ml-3 text-gray-600">Loading more properties...</span>
    </div>
  );

  const defaultEndComponent = (
    <div className="text-center py-8 text-gray-500">
      <p>You've reached the end of the list</p>
    </div>
  );

  return (
    <div className={className}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={itemClassName}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </div>

      {loading && (loadingComponent || defaultLoadingComponent)}
      
      {hasMore && !loading && (
        <div ref={observerRef} className="h-4" />
      )}
      
      {!hasMore && items.length > 0 && (endComponent || defaultEndComponent)}
    </div>
  );
}
