import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// jsdom не размонтирует дерево между тестами сам — иначе queries увидят узлы прошлого теста
afterEach(() => {
  cleanup();
});
