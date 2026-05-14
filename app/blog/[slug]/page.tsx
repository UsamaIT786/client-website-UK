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

  return {
    title: `${post.title} | Immigration Law Experts`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image || ''],
    },
  };
}

export default function Page() {
  return <BlogPost />;
}
