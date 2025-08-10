import Link from 'next/link';

export default function PostCard({ post }: { post: any }) {
  const imageUrl =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    '/placeholder.jpg';

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="card group border border-gray-200 rounded-lg shadow-md">
      <Link href={`/posts/${post.slug}`}>
        <div className="overflow-hidden rounded-lg mb-4">
          <img
            src={imageUrl}
            alt={post.title.rendered}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2
          className="text-2xl font-bold mb-2 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <p
          className="text-gray-600 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <div className="flex items-center justify-between text-sm text-gray-500">
          <time>{formattedDate}</time>
          <span>Read more →</span>
        </div>
      </Link>
    </article>
  );
}