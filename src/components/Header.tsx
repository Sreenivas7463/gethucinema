'use client';
import ThemeToggle from './ThemeToggle';

export default function Header() {
return (
<header className="py-12 text-center">
    <div>
        <h1 className="text-4xl font-extrabold mb-2 text-primary">Gethu Cinema Blog</h1>
        <p className="text-lg text-gray-600">Fresh takes on Tamil cinema and culture</p>
    </div>
    <ThemeToggle />
</header>
);
}