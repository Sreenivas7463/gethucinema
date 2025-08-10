'use client';

export default function CategoryBadge({ name, onClick, active = false, color = 'bg-white' }: {
  name: string;
  onClick?: () => void;
  active?: boolean;
  color?: string;
}) {
  const getDarkerColor = (baseColor: string) => {
    const parts = baseColor.split('-');
    if (parts.length === 3) {
      const colorName = parts[1];
      return `bg-${colorName}-800`;
    }
    return 'bg-primary'; // Fallback
  };

  return (
    <span
      onClick={onClick}
      className={`inline-block px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 mr-3 mb-2
        ${active
          ? 'bg-gray-800 text-white shadow'
          : `${color} text-gray-700 hover:bg-gray-100 shadow-sm`
        }`}
    >
      {name}
    </span>
  );
}