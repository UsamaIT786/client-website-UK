import type { Metadata } from 'next';
import Blog from '../../src_pages/Blog';

export const metadata: Metadata = {
  title: 'UK Immigration Law Blog | Expert Guides & Updates',
  description: 'UK immigration guides, Home Office updates and legal insights for visa applicants, sponsors and settlement seekers. Written and reviewed by immigration specialists.',
};

export default function Page() {
  return <Blog />;
}
