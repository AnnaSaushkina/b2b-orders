import { VirtualList } from '@/shared/ui/virtual-list';
import { fetchProducts } from '@/entities/product/api';
import type { Product } from '@/entities/product/model/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductCard } from './product-card';

export function Page() {
  const { data, fetchNextPage, isLoading, error } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['products'],
    queryFn: (pageNumber) => fetchProducts(200, pageNumber.pageParam, pageNumber.signal),
    getNextPageParam: (lastPage, allPage, lastPageParam, allPageParam) =>
      lastPage.length < 200 ? undefined : lastPageParam + 200,
  });

  return isLoading ? (
    <p>Загрузка товаров...</p>
  ) : error && !data ? (
    <p>Товары не загружены</p>
  ) : (
    <div
      className="
     border-zinc-200 
     mx-auto
      max-w-3xl
        "
    >
      <VirtualList<Product>
        items={data?.pages.flat() || []}
        height={{ item: 50, list: 500 }}
        onEndReached={() => fetchNextPage()}
        renderItem={(item) => <ProductCard product={item} />}
      />
    </div>
  );
}
