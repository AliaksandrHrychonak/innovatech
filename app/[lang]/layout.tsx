import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary } from "@/lib/get-dictionaries";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'ru' | 'kk');
  const seo = dict.seo;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://innovatech.com';

  return {
    title: {
      template: `%s | InnovaTech`,
      default: seo.title,
    },
    description: seo.description,
    keywords: seo.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'ru': '/ru',
        'kk': '/kk',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `/${lang}`,
      siteName: "InnovaTech",
      locale: lang === 'en' ? 'en_US' : lang === 'ru' ? 'ru_RU' : 'kk_KZ',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }, { lang: 'kk' }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://innovatech.com/#organization',
    name: 'InnovaTech',
    url: 'https://innovatech.com',
    logo: {
      '@type': 'ImageObject',
      '@id': 'https://innovatech.com/#logo',
      url: 'https://innovatech.com/logo.png',
      contentUrl: 'https://innovatech.com/logo.png',
      caption: 'InnovaTech',
      width: '512',
      height: '512',
    },
    image: { '@id': 'https://innovatech.com/#logo' },
    sameAs: [
      'https://twitter.com/innovatech',
      'https://linkedin.com/company/innovatech',
    ],
    description: 'Advanced greenhouse complexes and smart farming solutions for the CIS market.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-555-5555',
      contactType: 'sales',
      areaServed: 'CIS',
      availableLanguage: ['English', 'Russian', 'Kazakh'],
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://innovatech.com/#website',
    url: 'https://innovatech.com',
    name: 'InnovaTech',
    description: 'Future of Sustainable Agriculture',
    publisher: { '@id': 'https://innovatech.com/#organization' },
    inLanguage: lang,
  };

  return (
    <html lang={lang} className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
