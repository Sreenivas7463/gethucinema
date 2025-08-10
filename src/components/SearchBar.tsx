'use client';

export default function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
  return (
    <div className="mb-8 max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Search articles..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
      />
    </div>
  );
}