

type Palette = { from: string; to: string; ink: string };

const CATEGORY_STYLE: Record<string, Palette> = {
  'Бытовая химия': { from: '#e0f2fe', to: '#bae6fd', ink: '#0369a1' },
  Упаковка: { from: '#fef3c7', to: '#fde68a', ink: '#92400e' },
  'Продукты питания': { from: '#dcfce7', to: '#bbf7d0', ink: '#15803d' },
  Электрика: { from: '#ede9fe', to: '#ddd6fe', ink: '#6d28d9' },
  Инструменты: { from: '#ffe4e6', to: '#fecdd3', ink: '#be123c' },
  Спецодежда: { from: '#e0e7ff', to: '#c7d2fe', ink: '#3730a3' },
};

const FALLBACK: Palette = { from: '#f4f4f5', to: '#e4e4e7', ink: '#52525b' };

const CATEGORY_SHAPE: Record<string, string> = {
  'Бытовая химия': 'M26 18h12v6h4a6 6 0 0 1 6 6v22a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V30a6 6 0 0 1 6-6h4v-6Z',
  Упаковка: 'M12 24h40v30a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V24Zm0 0 6-10h28l6 10M32 24v34',
  'Продукты питания': 'M22 20h20a4 4 0 0 1 4 4v30a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4Zm2 10h16',
  Электрика: 'M32 12a16 16 0 0 1 10 28v6H22v-6a16 16 0 0 1 10-28Zm-6 40h12m-10 6h8',
  Инструменты: 'M40 14a12 12 0 0 0-9 20L15 50a5 5 0 0 0 7 7l16-16a12 12 0 0 0 14-19l-8 8-6-6 8-8a12 12 0 0 0-6-2Z',
  Спецодежда: 'M32 14c-11 0-19 8-19 19v9h38v-9c0-11-8-19-19-19Zm-21 28h42v6H11v-6Z',
};

const FALLBACK_SHAPE = 'M16 22h32v28a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V22Zm0 0 4-8h24l4 8';

export function ProductThumb({ category, className }: { category: string; className?: string }) {
  const palette = CATEGORY_STYLE[category] ?? FALLBACK;
  const shape = CATEGORY_SHAPE[category] ?? FALLBACK_SHAPE;

  const gradientId = `thumb-${category.replace(/\s+/g, '-')}`;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={`Категория: ${category}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="10" fill={`url(#${gradientId})`} />
      <path
        d={shape}
        fill="none"
        stroke={palette.ink}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </svg>
  );
}
