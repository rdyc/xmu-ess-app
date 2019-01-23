import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  setDisplayName,
} from 'recompose';
import { DetailPageView } from './DetailPageView';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnOption {
  tab: number;
}

export type DetailPageProps
  = OwnOption
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>;

export const DetailPage = compose<DetailPageProps, OwnOption>(
  withRouter,
  injectIntl,
  setDisplayName('DetailPage'),
)(DetailPageView);