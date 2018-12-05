import { IntlComponent } from 'react-intl';

const currencyCode = process.env.REACT_APP_DEFAULT_CURRENCY_CODE;

const DateOption: IntlComponent.DateTimeFormatProps = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const DateTimeOption: IntlComponent.DateTimeFormatProps = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

// date time without second
const TimeDateOption: IntlComponent.DateTimeFormatProps = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'GMT'
};

const TimeOption: IntlComponent.DateTimeFormatProps = {
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'GMT'
};

const MonthYearOption: IntlComponent.DateTimeFormatProps = {
  year: 'numeric',
  month: 'long'
};

const CurrencyOption = (symbol: string): ReactIntl.FormattedNumber.PropsBase => ({
  localeMatcher: 'best fit',
  style: 'currency',
  currency: symbol,
  currencyDisplay: 'symbol'
});

const CurrencyDefaultOption: ReactIntl.FormattedNumber.PropsBase = {
  localeMatcher: 'best fit',
  style: 'currency',
  currency: currencyCode || '$',
  currencyDisplay: 'symbol'
};

export const GlobalFormat = {
  Date: DateOption,
  DateTime: DateTimeOption,
  TimeDate: TimeDateOption,
  Time: TimeOption,
  MonthYear: MonthYearOption,
  Currency: CurrencyOption,
  CurrencyDefault: CurrencyDefaultOption
};