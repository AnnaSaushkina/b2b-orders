// ЗАДАЧА: дебаунс-поиск по каталогу товаров

// Шаги:
// 1. Написать хук useDebounce(value, delay) — возвращает отложенное значение
//    Инструменты: useState + useEffect + useRef (для хранения таймера)

// 2. Создать компонент SearchInput — поле ввода с пропсом onSearch
//    Внутри использовать useDebounce со значением из инпута

// 3. Добавить на сервер: GET /products?search=query
//    В products.service.ts: Prisma где name LIKE '%query%'

// 4. Подключить SearchInput в pages/products-list — при изменении
//    дебаунсированного значения делать новый fetchProducts с search-параметром

// Троттл (отдельная задача после):
// Написать useThrottle(fn, delay) и применить к onScroll в VirtualList
// Разница: debounce ждёт паузы, throttle ограничивает частоту вызовов
