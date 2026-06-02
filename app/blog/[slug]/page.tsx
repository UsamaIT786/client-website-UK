import BlogPost from '../../../src_pages/BlogPost';
import { blogPosts } from '../../../lib/blogData';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const description = post.excerpt || (post.content ? post.content.slice(0, 155) : '');

  return {
    title: `${post.title} | Immigration Law Experts`,
    description: description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: description,
      images: [post.image || ''],
    },
  };
}

export default function Page() {
  return <BlogPost />;
}
