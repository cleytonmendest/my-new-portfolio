import { sendGAEvent } from '@next/third-parties/google';

/** Inlined at build time; without it the site has no Google Analytics. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type AnalyticsEvent =
  /** The contact form posted to Web3Forms (GA4's recommended name for a lead). */
  | 'generate_lead'
  /** Built without the Web3Forms key, the form opened the visitor's email app. */
  | 'contact_email_app'
  | 'contact_form_error'
  | 'language_switch'
  | 'copy_email';

/**
 * Sends a GA4 event when Analytics is set up and does nothing otherwise. CV downloads and clicks on
 * external links (WhatsApp, project sites, profiles) need no code: GA4's enhanced measurement
 * records them as file_download and click events.
 */
export function trackEvent(name: AnalyticsEvent, params: Record<string, string> = {}) {
  if (GA_ID) sendGAEvent('event', name, params);
}
