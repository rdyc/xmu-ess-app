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
  & RouteComponentProps<OwnRouteParams>;

export const DetailPage = compose<DetailPageProps, OwnOption>(
  withRouter,
  setDisplayName('DetailPage'),
)(DetailPageView);