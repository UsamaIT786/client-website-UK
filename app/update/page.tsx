import type { Metadata } from 'next';
import Updates from '../../src_pages/Updates';

export const metadata: Metadata = {
  title: 'UK Immigration Law Updates & Policy Changes 2026',
  description: 'Stay informed with the latest immigration rule changes, Home Office announcements, and policy updates affecting UK visas and settlement.',
};

export default function Page() {
  return <Updates />;
}
