import { WithAccountEmployeeExperience, withAccountEmployeeExperience } from '@account/hoc/withAccountEmployeeExperience';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { AccountEmployeeExperienceView } from './AccountEmployeeExperienceView';

interface OwnRouteParams {
  employeeUid: string;
}

export type AccountEmployeeExperienceProps
  = WithUser
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithAccountEmployeeExperience;

export const AccountEmployeeExperience = compose<AccountEmployeeExperienceProps, {}>(
  withUser,
  withRouter,
  injectIntl,
  withAccountEmployeeExperience,
)(AccountEmployeeExperienceView);