'use client';

import { useEffect, useRef } from 'react';
import CategoryBadge from './CategoryBadge';

export default function SwipableCategories({
  categories,
  activeCategory,
  onSelect,
}: {
  categories: { id: number; name: string }[];
  activeCategory: number | null;
  onSelect: (id: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      container.classList.add('cursor-grabbing');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.classList.remove('cursor-grabbing');
    };

    const handleMouseUp = () => {
      isDown = false;
      container.classList.remove('cursor-grabbing');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex space-x-2 pb-4 mb-6 overflow-x-auto scrollbar-hide cursor-grab hover:cursor-grab"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <CategoryBadge
        key="all"
        name="All"
        onClick={() => onSelect(0)}
        active={activeCategory === 0 || activeCategory === null}
        color="bg-gray-100"
      />
      {categories.map((cat) => {
        const colors = [
          'bg-red-100',
          'bg-blue-100',
          'bg-green-100',
          'bg-yellow-100',
          'bg-purple-100',
          'bg-pink-100',
          'bg-indigo-100',
        ];
        const colorIndex = cat.id % colors.length;
        return (
          <CategoryBadge
            key={cat.id}
            name={cat.name}
            onClick={() => onSelect(cat.id)}
            active={activeCategory === cat.id}
            color={colors[colorIndex]}
          />
        );
      })}
    </div>
  );
}