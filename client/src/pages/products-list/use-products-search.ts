import type { Product } from '@/entities/product/model/types';
import { fetchProducts } from '@/entities/product/api';
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';

export type ProductsSearch = {
    searchedText: string;
    setSearchedText: (value: string) => void;
    debouncedText: string;
     products: Product[];
     total?: number;
    isLoading: boolean;
      isPlaceholderData:boolean;
      error: Error | null;
      handleEndReached: () => void;
  };

 export function useProductsSearch(): ProductsSearch {

  const [searchedText, setSearchedText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');

  const { data, fetchNextPage, isLoading, isPlaceholderData, error } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['products', debouncedText],
    queryFn: (pageNumber) =>
      fetchProducts(200, pageNumber.pageParam, pageNumber.signal, debouncedText),
    getNextPageParam: (lastPage, allPage, lastPageParam, allPageParam) =>
      lastPageParam + 200 >= lastPage.total ? undefined : lastPageParam + 200,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedText(searchedText);
    }, 400);

    return () => clearTimeout(id);
  }, [searchedText]);

  const handleEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const products = data?.pages.flatMap((page) => page.items) ?? [];


     return {
     searchedText,
     setSearchedText,
    debouncedText,
     products,
     total: data?.pages[0]?.total,
    isLoading,
      isPlaceholderData,
      error,
      handleEndReached,
  }


  }

