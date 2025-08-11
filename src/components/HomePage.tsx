'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchPosts, fetchCategories, fetchPostsByCategory, Post, Category } from '../lib/api';
import PostCard from './PostCard';
import SearchBar from './SearchBar';
import SwipableCategories from './SwipableCategories';
import Pagination from './Pagination';
import PostCardSkeleton from './PostCardSkeleton';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const currentPage = parseInt(searchParams.get('page') || '1') || 1;
  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('category') ? parseInt(searchParams.get('category')!) : null;

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      let res;
      if (categoryId) {
        res = await fetchPostsByCategory(categoryId, currentPage);
      } else {
        res = await fetchPosts(currentPage, search);
      }
      setPosts(res.posts);
      setTotalPages(res.totalPages);
      setLoading(false);
    };

    const getCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };

    getPosts();
    getCategories();
  }, [currentPage, search, categoryId]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams();
    params.set('search', term);
    if (categoryId) {
      params.set('category', categoryId.toString());
    }
    router.push(`/?${params.toString()}`);
  };

  const handleCategorySelect = (id: number | null) => {
    const params = new URLSearchParams();
    if (id) {
      params.set('category', id.toString());
    }
    if (search) {
        params.set('search', search);
    }
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (categoryId) {
      params.set('category', categoryId.toString());
    }
    if (search) {
      params.set('search', search);
    }
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };


  return (
    <div className="max-w-7xl mx-auto px-4">
      
      <SearchBar onSearch={handleSearch} />
      <SwipableCategories
        categories={categories}
        activeCategory={categoryId}
        onSelect={handleCategorySelect}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No posts found.</p>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}