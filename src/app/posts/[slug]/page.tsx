'use client';

import { fetchPostBySlug, Post } from '../../../lib/api';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import BackButton from '../../../components/BackButton';
import { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import LightboxWrapper from '../../../components/LightboxWrapper';

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [sanitizedContent, setSanitizedContent] = useState('');
  const [postImageUrl, setPostImageUrl] = useState<string | null>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt?: string }[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getPost = async () => {
      setLoadingPost(true);
      const fetchedPost = await fetchPostBySlug(slug as string);
      if (!fetchedPost) {
        notFound();
      }
      setPost(fetchedPost);
      setSanitizedContent(DOMPurify.sanitize(fetchedPost.content.rendered, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ['data-src'],
      }));
      setPostImageUrl(fetchedPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null);
      setLoadingPost(false);
    };
    getPost();
  }, [slug]);

  useEffect(() => {
    if (contentRef.current && sanitizedContent) {
      const images = Array.from(contentRef.current.querySelectorAll('img'));
      const extractedImages = images.map((img) => ({
        src: img.src,
        alt: img.alt,
      }));
      setLightboxImages(extractedImages);

      images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        const handleClick = (event: MouseEvent) => {
          event.preventDefault(); // Prevent default link behavior
          setCurrentImageIndex(index);
          setLightboxOpen(true);
        };
        img.addEventListener('click', handleClick);

        // Cleanup function for useEffect
        return () => {
          img.removeEventListener('click', handleClick);
        };
      });
    }
  }, [sanitizedContent]);

  if (loadingPost) {
    return <div className="text-center py-10">Loading post...</div>;
  }

  if (!post) {
    notFound();
  }

  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy');

  const categories = post._embedded?.['wp:term']?.[0] || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <BackButton />
      <article>
      <header className="mb-8 text-center">
        <h1
          className="text-4xl font-bold mb-4"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div className="flex justify-center gap-4 text-sm mb-6">
          <time>{formattedDate}</time>
          <span>•</span>
          {categories.length > 0 && (
            <span>
              In:{' '}
              {categories.map((cat) => cat.name).join(', ')}
            </span>
          )}
        </div>
        {postImageUrl && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={postImageUrl}
              alt={post.title.rendered}
              className="w-full h-64 object-cover"
            />
          </div>
        )}
      </header>

      <div
        ref={contentRef}
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </article>
    <LightboxWrapper
      images={lightboxImages}
      open={lightboxOpen}
      close={() => setLightboxOpen(false)}
      startIndex={currentImageIndex}
    />
  </div>
  );
}