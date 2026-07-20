import type { CSSProperties } from 'react';

export const scrollContainerStyle: CSSProperties = {
  overflow: 'auto',
  position: 'relative',
};

export const visibleWindowStyle: CSSProperties = {
  position: 'absolute',
  // width: '100%',
  maxWidth: 'fit-content',
};
