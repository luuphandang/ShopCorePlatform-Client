import '@/styles/global.scss';

import type { Metadata } from 'next';

import { Footer, Header } from '@/components/common';
import ContactRing from '@/components/pages/contact-ring';
import generateMetadata from '@/components/seo/metadata';
import JSONLDStructuredData from '@/components/seo/structure-data';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ApolloWrapper } from '@/components/wrappers/apollo-provider';
import { AuthProvider } from '@/contexts/auth.context';
import { EJsonldType } from '@/shared/enums/jsonld.enum';
import { EMetadataType } from '@/shared/enums/metadata.enum';

export const metadata: Metadata = generateMetadata({ type: EMetadataType.HOME });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <JSONLDStructuredData type={EJsonldType.WEBSITE} />
      </head>

      <body className="antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <ApolloWrapper>
            <TooltipProvider delayDuration={300}>
              <Toaster />
              <Header />
              {children}
              <Footer />
              <ContactRing />
            </TooltipProvider>
          </ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
