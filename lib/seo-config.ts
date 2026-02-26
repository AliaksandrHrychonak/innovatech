/**
 * SEO Configuration for InnovaTech
 * Centralized SEO settings for meta tags, OpenGraph, and Twitter Cards
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  locale?: string;
  siteName?: string;
  author?: string;
}

export const defaultSEO = {
  ru: {
    siteName: 'InnovaTech',
    title: 'InnovaTech - Полный цикл тепличных решений | Теплицы под ключ',
    description: 'Лидер рынка СНГ по тепличным технологиям. Проектирование, строительство и обслуживание промышленных теплиц. 10+ лет опыта, 50+ проектов, поддержка 24/7.',
    keywords: [
      'теплицы',
      'промышленные теплицы',
      'тепличные комплексы',
      'строительство теплиц',
      'климат-контроль',
      'автоматизация теплиц',
      'системы полива',
      'гидропоника',
      'теплицы под ключ',
      'тепличное оборудование'
    ],
    image: '/og-image-ru.jpg',
    author: 'InnovaTech',
    type: 'website' as const,
  },
  en: {
    siteName: 'InnovaTech',
    title: 'InnovaTech - Full-Cycle Greenhouse Solutions | Turnkey Greenhouses',
    description: 'CIS market leader in greenhouse technologies. Design, construction and maintenance of industrial greenhouses. 10+ years experience, 50+ projects, 24/7 support.',
    keywords: [
      'greenhouses',
      'industrial greenhouses',
      'greenhouse complexes',
      'greenhouse construction',
      'climate control',
      'greenhouse automation',
      'irrigation systems',
      'hydroponics',
      'turnkey greenhouses',
      'greenhouse equipment'
    ],
    image: '/og-image-en.jpg',
    author: 'InnovaTech',
    type: 'website' as const,
  },
  kk: {
    siteName: 'InnovaTech',
    title: 'InnovaTech - Жылыжай шешімдерінің толық циклі | Кілтті жылыжайлар',
    description: 'ТМД нарығындағы жылыжай технологиялары бойынша көшбасшы. Өнеркәсіптік жылыжайларды жобалау, салу және қызмет көрсету. 10+ жыл тәжірибе, 50+ жоба, 24/7 қолдау.',
    keywords: [
      'жылыжайлар',
      'өнеркәсіптік жылыжайлар',
      'жылыжай кешендері',
      'жылыжай құрылысы',
      'климат-бақылау',
      'жылыжай автоматтандыруы',
      'суару жүйелері',
      'гидропоника',
      'кілтті жылыжайлар',
      'жылыжай жабдықтары'
    ],
    image: '/og-image-kk.jpg',
    author: 'InnovaTech',
    type: 'website' as const,
  }
};

export const contactInfo = {
  ru: {
    phone: '+7 (XXX) XXX-XX-XX',
    email: 'info@innovatech.com',
    address: 'Россия, Москва'
  },
  by: {
    phone: '+375 (XX) XXX-XX-XX',
    email: 'info@innovatech.by',
    address: 'Беларусь, Минск'
  },
  kk: {
    phone: '+7 (7XX) XXX-XX-XX',
    email: 'info@innovatech.kz',
    address: 'Казахстан, Алматы'
  }
};

export const socialMedia = {
  telegram: 'https://t.me/innovatech',
  instagram: 'https://instagram.com/innovatech',
  facebook: 'https://facebook.com/innovatech',
  linkedin: 'https://linkedin.com/company/innovatech',
  youtube: 'https://youtube.com/@innovatech'
};

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://innovatech.com';

export function generateSEOConfig(
  lang: 'ru' | 'en' | 'kk',
  customConfig?: Partial<SEOConfig>
): SEOConfig {
  const defaults = defaultSEO[lang];

  return {
    ...defaults,
    ...customConfig,
    url: customConfig?.url || `${baseUrl}/${lang}`,
    locale: lang === 'ru' ? 'ru_RU' : lang === 'en' ? 'en_US' : 'kk_KZ',
  };
}
