import { fetchPostBySlug } from '../../../lib/api';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const post = await fetchPostBySlug(slug);
  if (!post) return { title: 'Post not found' };
  return { title: post.title.rendered, description: post.excerpt.rendered };
}

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}