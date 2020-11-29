import React from 'react';
import { IntlContext } from 'utils/i18n';
import { createIntl, createIntlCache } from 'react-intl';
import { defaultLocale, Locales } from './';
import formattedMessages from './messages';

const getMessage = (locale: Locales, id: string) => {
  const cache = createIntlCache();
  const intl = createIntl(
    {
      locale,
      defaultLocale,
      messages: formattedMessages[locale],
    },
    cache
  );

  return intl.formatMessage({
    id,
  });
};

export const withLocale = (locale: Locales) => (id: string) =>
  getMessage(locale, id);

export const withPrefix = (locale: Locales, prefix: string) => (id: string) =>
  getMessage(locale, `${prefix}.${id}`);

export const useGetMessage = (prefix: string) => {
  const i18n = React.useContext(IntlContext);
  return withPrefix(i18n.locale, prefix);
};

export default getMessage;
