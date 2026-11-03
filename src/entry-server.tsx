// Render landingu do statycznego HTML przy budowaniu (scripts/prerender.mjs):
// treść jest w pliku strony, zanim załaduje się JavaScript.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '@/App';
import { FAQS } from '@/components/sections/FaqSection';
import { CONTACT_EMAIL, SITE_URL } from '@/lib/site';

export function render(): string {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

// Dane strukturalne z tych samych źródeł co treść strony, żeby się nie rozjechały.
export function structuredData(): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Receply',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon.svg`,
      email: CONTACT_EMAIL,
      areaServed: 'PL',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Receply',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'pl-PL',
      url: `${SITE_URL}/`,
      description:
        'AI recepcjonista dla małych firm w Polsce. Odbiera telefony i odpisuje na Instagramie, umawia wizyty prosto do kalendarza.',
      offers: {
        '@type': 'Offer',
        name: 'Pakiet Start',
        price: '299',
        priceCurrency: 'PLN',
        description: 'Wczesny dostęp dla pierwszych 20 firm, płatność miesięczna.',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ];
}
