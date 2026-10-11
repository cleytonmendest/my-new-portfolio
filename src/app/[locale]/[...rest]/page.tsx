import { notFound } from 'next/navigation';

// Any unknown path below /en or /pt renders the localized not-found page.
export default function CatchAllPage() {
  notFound();
}
