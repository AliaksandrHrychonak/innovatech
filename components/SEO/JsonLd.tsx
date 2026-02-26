/**
 * JSON-LD Structured Data Component
 * Provides rich snippets for search engines
 */

import React from 'react';
import { baseUrl, socialMedia, contactInfo } from '@/lib/seo-config';

interface JsonLdProps {
  type: 'organization' | 'website' | 'breadcrumb' | 'faq' | 'review';
  data?: any;
  lang?: 'ru' | 'en' | 'kk';
}

export function JsonLd({ type, data, lang = 'ru' }: JsonLdProps) {
  const structuredData = generateStructuredData(type, data, lang);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

function generateStructuredData(type: string, data: any, lang: 'ru' | 'en' | 'kk') {
  const region = lang === 'kk' ? 'kk' : lang === 'ru' ? 'ru' : 'ru';
  const contact = contactInfo[region as keyof typeof contactInfo];

  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'InnovaTech',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description:
          lang === 'ru'
            ? 'Полный цикл тепличных решений. Проектирование, строительство и обслуживание промышленных теплиц.'
            : lang === 'en'
            ? 'Full-cycle greenhouse solutions. Design, construction and maintenance of industrial greenhouses.'
            : 'Жылыжай шешімдерінің толық циклі. Өнеркәсіптік жылыжайларды жобалау, салу және қызмет көрсету.',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: contact.phone,
          contactType: 'Customer Service',
          email: contact.email,
          availableLanguage: ['Russian', 'English', 'Kazakh'],
          areaServed: ['RU', 'BY', 'KZ'],
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: lang === 'kk' ? 'KZ' : 'RU',
          addressLocality: contact.address,
        },
        sameAs: [
          socialMedia.telegram,
          socialMedia.instagram,
          socialMedia.facebook,
          socialMedia.linkedin,
          socialMedia.youtube,
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '127',
          bestRating: '5',
          worstRating: '1',
        },
        foundingDate: '2014',
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          value: '50+',
        },
      };

    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'InnovaTech',
        url: `${baseUrl}/${lang}`,
        inLanguage: lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : 'kk-KZ',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/${lang}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      };

    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data?.items?.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })) || [],
      };

    case 'faq':
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data?.questions?.map((q: any) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        })) || [],
      };

    case 'review':
      return {
        '@context': 'https://schema.org',
        '@type': 'Review',
        itemReviewed: {
          '@type': 'Organization',
          name: 'InnovaTech',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: data?.rating || '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: data?.author || 'Anonymous',
        },
        reviewBody: data?.body || '',
        datePublished: data?.date || new Date().toISOString(),
      };

    default:
      return {};
  }
}

// Pre-made components for common use cases
export function OrganizationJsonLd({ lang = 'ru' }: { lang?: 'ru' | 'en' | 'kk' }) {
  return <JsonLd type="organization" lang={lang} />;
}

export function WebsiteJsonLd({ lang = 'ru' }: { lang?: 'ru' | 'en' | 'kk' }) {
  return <JsonLd type="website" lang={lang} />;
}

export function FAQJsonLd({ questions, lang = 'ru' }: { questions: any[]; lang?: 'ru' | 'en' | 'kk' }) {
  return <JsonLd type="faq" data={{ questions }} lang={lang} />;
}

export function BreadcrumbJsonLd({ items, lang = 'ru' }: { items: any[]; lang?: 'ru' | 'en' | 'kk' }) {
  return <JsonLd type="breadcrumb" data={{ items }} lang={lang} />;
}
