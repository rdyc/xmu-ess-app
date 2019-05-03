import { IntlComponent } from 'react-intl';

const currencyCode = process.env.REACT_APP_DEFAULT_CURRENCY_CODE;

const DateOption: IntlComponent.DateTimeFormatProps = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const DateOptionWithDay: IntlComponent.DateTimeFormatProps = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
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

const DateEndOption: IntlComponent.DateTimeFormatProps = {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};

export const GlobalFormat = {
  Date: DateOption,
  DateWithDay: DateOptionWithDay,
  DateTime: DateTimeOption,
  TimeDate: TimeDateOption,
  Time: TimeOption,
  MonthYear: MonthYearOption,
  Currency: CurrencyOption,
  CurrencyDefault: CurrencyDefaultOption,
  DateEnd: DateEndOption
};