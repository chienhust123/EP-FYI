import { MonetaryValue } from "@/services/offer";
import Dinero, { Currency } from "dinero.js";
import * as currencies from '@dinero.js/currencies';

const currenciesMap = currencies as unknown as Record<string, currencies.Currency<number>>

/**
 * Format the currency string from currency format
 */
export const formatCurrency = (monetaryValue: MonetaryValue): string => {
  const { currency: currencyCode, amount } = monetaryValue;

  const currency = currenciesMap[currencyCode];

  if (!currency) {
    return `$${amount}`
  }

  return Dinero({ currency: currencyCode as Currency, amount: amount * Math.pow(10, currency.exponent) }).toFormat('$0,0')
}