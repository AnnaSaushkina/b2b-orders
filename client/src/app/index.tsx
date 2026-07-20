import { createRoot } from 'react-dom/client';
import { Page } from '../pages/products-list';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = document.querySelector('#root');
if (root === null) {
  throw new Error('не инициализируется root');
}
const initRoot = createRoot(root);

const queryClient = new QueryClient();

initRoot.render(
  <QueryClientProvider client={queryClient}>
    <Page />
  </QueryClientProvider>,
);
