import Dinero, { Currency } from 'dinero.js';
import * as currencies from '@dinero.js/currencies';
import countryCodes, { CountryProperty } from 'country-codes-list';
import { MonetaryValue } from '@/services/offer';

const currenciesMap = currencies as unknown as Record<string, currencies.Currency<number>>;

/**
 * Format the currency string from currency format
 */
export const formatCurrency = (monetaryValue: MonetaryValue): string => {
  const { currency: currencyCode, amount } = monetaryValue;

  const currency = currenciesMap[currencyCode];

  if (!currency) {
    return `$${amount}`;
  }

  return Dinero({
    currency: currencyCode as Currency,
    amount: amount * 10 ** currency.exponent,
  }).toFormat('$0,0');
};

const getCurrencySymbol = (locale: string, currency: string): string => {
  if (!locale) return '';

  return (0)
    .toLocaleString(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, '')
    .trim();
};

const countryCodeToCurrencyCodeMap = countryCodes.customList(
  'countryCode' as CountryProperty,
  '{currencyCode}'
) as Record<string, string>;

const countryCodeToLocaleMap = countryCodes.customList(
  'countryCode' as CountryProperty,
  '{officialLanguageCode}-{countryCode}'
) as Record<string, string>;

export const getIntlByCountryCode = (countryCode: string): { locale: string; currency: string } => {
  return {
    locale: countryCodeToLocaleMap[countryCode],
    currency: countryCodeToCurrencyCodeMap[countryCode],
  };
};
