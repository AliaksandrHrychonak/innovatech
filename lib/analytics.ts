/**
 * Analytics utilities for tracking events across Google Analytics and Yandex Metrika
 */

// Types
export interface AnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

// Google Analytics 4
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Yandex Metrika
export const YM_COUNTER_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

/**
 * Track page view
 */
export const pageview = (url: string) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }

  // Yandex Metrika
  if (typeof window !== 'undefined' && window.ym && YM_COUNTER_ID) {
    window.ym(YM_COUNTER_ID, 'hit', url);
  }
};

/**
 * Track custom event
 */
export const trackEvent = ({ action, category, label, value, ...params }: AnalyticsEvent) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  }

  // Yandex Metrika
  if (typeof window !== 'undefined' && window.ym && YM_COUNTER_ID) {
    window.ym(YM_COUNTER_ID, 'reachGoal', action, params);
  }
};

/**
 * Pre-defined events for common actions
 */

// CTA clicks
export const trackCTAClick = (buttonText: string, location: string) => {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: buttonText,
    location: location,
  });
};

// Form submissions
export const trackFormSubmit = (formName: string, formLocation: string) => {
  trackEvent({
    action: 'form_submit',
    category: 'conversion',
    label: formName,
    form_location: formLocation,
  });
};

// Contact clicks
export const trackContactClick = (contactType: 'phone' | 'email' | 'telegram', contactValue: string) => {
  trackEvent({
    action: 'contact_click',
    category: 'engagement',
    label: contactType,
    contact_type: contactType,
    contact_value: contactValue,
  });
};

// Solution views
export const trackSolutionView = (solutionName: string, solutionCategory: string) => {
  trackEvent({
    action: 'solution_view',
    category: 'engagement',
    label: solutionName,
    solution_category: solutionCategory,
  });
};

// File downloads
export const trackFileDownload = (fileName: string, fileType: string) => {
  trackEvent({
    action: 'file_download',
    category: 'engagement',
    label: fileName,
    file_type: fileType,
  });
};

// Language change
export const trackLanguageChange = (fromLang: string, toLang: string) => {
  trackEvent({
    action: 'language_change',
    category: 'engagement',
    label: `${fromLang} -> ${toLang}`,
    from_language: fromLang,
    to_language: toLang,
  });
};

// Scroll depth
export const trackScrollDepth = (depth: number) => {
  trackEvent({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${depth}%`,
    value: depth,
  });
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    ym?: (counterId: string, method: string, ...args: any[]) => void;
    clarity?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
