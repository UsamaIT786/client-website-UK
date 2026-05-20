import type { Metadata } from 'next';
import PrivacyPolicy from '../../src_pages/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy | ImmigrationLaw.org.uk',
  description: 'Read our privacy policy to understand how we securely collect, process, and protect your personal data in compliance with UK legal regulations.',
};

export default function Page() {
  return <PrivacyPolicy />;
}
