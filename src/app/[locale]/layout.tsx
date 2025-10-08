import { notFound } from 'next/navigation';
import { locales } from '@/src/i18n/config';
import Header from '@/src/components/common/header';
import Footer from '@/src/components/common/footer';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <main className="min-h-screen">
        <Header />
        {children}
        <Footer />
      </main>
    </NextIntlClientProvider>
  );
}