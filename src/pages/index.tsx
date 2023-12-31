import { FC } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Home from '@/components/Home/Home';
import { GetStaticPropsContext } from 'next';
import { Seo } from '@/components/Seo';

export type LanguageOptions = 'pl' | 'en';

export async function getStaticProps(context: GetStaticPropsContext) {
  // extract the locale identifier from the URL
  const { locale } = context;

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
}

const App: FC = () => {
  const { t, i18n } = useTranslation('common');

  const currentLocale = i18n?.language;

  return (
    <>
      <Seo
        title={t('seo.title')}
        description={t('seo.description')}
        canonicalUrl={`https://dawidpolednik.pl${
          currentLocale === 'pl' ? '/' : currentLocale + '/'
        }`}
        og={{
          imageSrc: '/images/og-image.png',
        }}
        locale={currentLocale}
      />
      <Home />
    </>
  );
};

export default App;
