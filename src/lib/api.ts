export type Post = {
    id: number;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    slug: string;
    date: string;
    featured_media: number;
    media_details?: {
        sizes: {
            medium?: { source_url: string };
            full: { source_url: string };
        };
    };
    categories: number[];
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
        'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
    };
};

export type Category = {
    id: number;
    name: string;
    slug: string;
};

const API_URL = 'https://www.gethucinema.com/wp-json/wp/v2';

export async function fetchPosts(page = 1, search = '', perPage = 6) {
    let url = `${API_URL}/posts?page=${page}&per_page=${perPage}&_embed`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    const posts: Post[] = await res.json();
    const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1');
    return { posts, totalPages };
}

export async function fetchPostBySlug(slug: string) {
    const res = await fetch(
        `${API_URL}/posts?slug=${slug}&_embed`,
        { next: { revalidate: 60 } }
    );
    const posts: Post[] = await res.json();
    return posts[0] || null;
}

export async function fetchCategories() {
    const res = await fetch(`${API_URL}/categories?per_page=100`, {
        next: { revalidate: 3600 },
    });
    return (await res.json()) as Category[];
}

export async function fetchPostsByCategory(categoryId: number, page = 1) {
    const res = await fetch(
        `${API_URL}/posts?categories=${categoryId}&page=${page}&per_page=6&_embed`,
        { next: { revalidate: 60 } }
    );
    const posts: Post[] = await res.json();
    const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1');
    return { posts, totalPages };
}