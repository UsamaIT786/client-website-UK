import type { Metadata } from 'next';
import ProcessingTimes from '../../src_pages/ProcessingTimes';

export const metadata: Metadata = {
  title: 'UK Visa Processing Times 2026 | Latest Updates',
  description: 'Check current Home Office visa processing times for ILR, Skilled Worker, and family visas. Stay updated on standard and priority service timelines.',
};

export default function Page() {
  return <ProcessingTimes />;
}
