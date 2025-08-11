"use client";

import { useTheme } from "../lib/theme-context";
import { useEffect, useState } from "react";

const themes = [
  { value: "light", label: "Light Mode", icon: "☀️" },
  { value: "dark", label: "Dark Mode", icon: "🌙" },
  { value: "system", label: "System Default", icon: "🖥️" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        type="button"
      >
        <span>{themes.find((t) => t.value === theme)?.icon}</span>
        <span className="text-sm font-medium">
          {themes.find((t) => t.value === theme)?.label.split(" ")[0]}
        </span>
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
          {themes.map(({ value, label, icon }) => (
            <li key={value}>
              <button
                onClick={() => {
                  setTheme(value as Theme);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 flex items-center space-x-3 text-sm
                  ${
                    theme === value
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
