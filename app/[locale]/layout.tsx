import type React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { PwaInstallPrompt } from '@/components/pwa-install-prompt';
import { Footer } from '@/components/layout/footer';

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const currentLocale = locale || 'en';
  const messages = await getMessages({ locale: currentLocale });

  return (
    <div lang={currentLocale} dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}>
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
          <PwaInstallPrompt />
          <Toaster />
        </ThemeProvider>
      </NextIntlClientProvider>
    </div>
  );
}
