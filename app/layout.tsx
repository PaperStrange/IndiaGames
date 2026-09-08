import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Enchanted Notebook', description: 'A quiet place to think in ink. Write, read, sketch, and explore with a companion on the page.', icons: { icon: '/favicon.svg' } };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#222b28' };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en"><body>{children}</body></html>; }
