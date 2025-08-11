import { fetchPostBySlug } from '../../../lib/api';
import { Metadata } from 'next';

// Helper function to strip HTML tags
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '');
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  const title = post.title.rendered;
  const description = stripHtml(post.excerpt.rendered);
  const url = `https://www.gethucinema.com/posts/${post.slug}`;
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const imageWidth = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.width;
  const imageHeight = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.height;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: imageWidth,
              height: imageHeight,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}