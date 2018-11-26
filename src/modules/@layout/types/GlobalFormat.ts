import { IntlComponent } from 'react-intl';

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

export const GlobalFormat = {
  Date: DateOption,
  DateTime: DateTimeOption,
  Time: TimeOption,
  MonthYear: MonthYearOption
};