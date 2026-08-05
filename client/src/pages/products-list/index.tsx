import { VirtualList } from '@/shared/ui/virtual-list';
import type { Product } from '@/entities/product/model/types';
import { ProductCard } from './product-card';
import { SearchInput } from './search-input';
import { useProductsSearch } from './use-products-search';

export function Page() {
  const {
    searchedText,
    setSearchedText,
    debouncedText,
    products,
    total,
    isLoading,
    isPlaceholderData,
    error,
    handleEndReached,
  } = useProductsSearch();
  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <h1 className="text-lg font-semibold text-zinc-900">Каталог всех товаров</h1>

          <p className="text-sm text-zinc-500">
            {debouncedText ? `Найдено: ${total} товаров` : '50 000 позиций · Для оформления заказа'}
          </p>
          <div className="mt-3">
            <SearchInput
              value={searchedText}
              onChange={setSearchedText}
              placeholder="Введите товар, например: перчатки, розетка, куртка, пакет"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto h-[calc(100dvh-5.5rem)] max-w-3xl px-4 py-4">
        {isLoading ? (
          <p>Загрузка товаров...</p>
        ) : error && products.length === 0 ? (
          <p>Товары не загружены</p>
        ) : products.length === 0 ? (
          <p>Таких товаров не найдено</p>
        ) : (



          <div
            aria-busy={isPlaceholderData}
            className={isPlaceholderData ? 'h-full opacity-50' : 'h-full transition-opacity'}
          >
            <VirtualList<Product>
              items={products}
              estimateItemHeight={240}
              onEndReached={handleEndReached}
              renderItem={(item) => <ProductCard product={item} />}
            />
          </div>
        )}
      </main>
    </div>
  );
}
