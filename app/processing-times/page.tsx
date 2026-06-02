import type { Metadata } from 'next';
import ProcessingTimes from '../../src_pages/ProcessingTimes';

export const metadata: Metadata = {
  title: 'UK Visa Processing Times 2026 | ImmigrationLaw.org.uk',
  description: 'Current Home Office processing times for UK visa applications. Skilled Worker, Spouse, Student, ILR and more — updated for 2026.',
};

export default function Page() {
  return <ProcessingTimes />;
}
