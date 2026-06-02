import type { Metadata } from 'next';
import About from '../../src_pages/About';

export const metadata: Metadata = {
  title: 'About Us | ImmigrationLaw.org.uk',
  description: 'ImmigrationLaw.org.uk is a UK immigration intermediary, connecting clients with vetted, SRA-regulated solicitors. Operated by Scosh Limited (15141679).',
};

export default function Page() {
  return <About />;
}
