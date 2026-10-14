import { notFound } from 'next/navigation';

/** Any unknown path under /en or /pt renders the localized 404 instead of the bare global one. */
export default function CatchAllPage() {
  notFound();
}
