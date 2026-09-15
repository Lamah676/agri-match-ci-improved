import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import './styles/globals.css';

export const metadata: Metadata = {
  title: '🌾 Agri-Match CI - Plateforme Agricole Intelligente',
  description: 'Connecter les producteurs agricoles aux acheteurs de manière intelligente',
  viewport: 'width=device-width, initial-scale=1',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
