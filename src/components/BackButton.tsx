'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (document.referrer === '') {
      router.push('/');
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className="mb-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      &larr; Back
    </button>
  );
}
