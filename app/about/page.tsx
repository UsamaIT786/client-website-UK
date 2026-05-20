import type { Metadata } from 'next';
import About from '../../src_pages/About';

export const metadata: Metadata = {
  title: 'About Us | Regulated UK Immigration Solicitors',
  description: 'Meet our expert team of regulated UK immigration solicitors. Learn about our legal expertise, values, and dedication to your settlement success.',
};

export default function Page() {
  return <About />;
}
