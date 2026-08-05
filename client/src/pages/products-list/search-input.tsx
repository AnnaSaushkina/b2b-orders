import { Search } from 'lucide-react';

const wrapperClass = 'relative';

const iconClass =
  'pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400';

const inputClass = [
  'w-full rounded-lg border border-zinc-300 bg-white',
  'py-2 pr-3 pl-9 text-sm text-zinc-900 placeholder:text-zinc-400',
  'focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none',
].join(' ');

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className={wrapperClass}>
      <Search className={iconClass} aria-hidden="true" />
      <input
        type="search"
        className={inputClass}
        placeholder={placeholder}
        aria-label="Поиск по каталогу"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
