import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rental Property Management & Investment Portal',
  description: 'Full-Stack Real Estate Investment Dashboard & Tenant Portal on Cloudflare D1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="th">
        <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
