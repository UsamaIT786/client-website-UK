import Home from '../src_pages/Home';

export default function Page() {
  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "ImmigrationLaw.org.uk",
    "url": "https://www.immigrationlaw.org.uk",
    "description": "Connecting clients with trusted UK immigration legal professionals.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "email": "info@immigrationlaw.org.uk",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "14"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Immigrationlaw.org.uk work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We connect you with regulated UK immigration solicitors."
        }
      },
      {
        "@type": "Question",
        "name": "Is your assessment service free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the initial assessment is completely free."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Home />
    </>
  );
}
