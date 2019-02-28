import { WithUser, withUser } from '@layout/hoc/withUser';
import { ICompanyList } from '@lookup/classes/response';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';

import { FilterCompanyView } from './FilterCompanyView';

interface OwnOptions {
  title: string;
  value?: string | undefined;
  isOpen: boolean;
  hideBackdrop?: boolean;
  onSelected: (company?: ICompanyList) => void;
  onClose: () => void;
}

export type FilterCompanyProps
  = WithLookupCompany
  & WithUser
  & WithStyles<typeof styles>
  & WithTheme
  & InjectedIntlProps
  & OwnOptions;

const lifecycles: ReactLifeCycleFunctions<FilterCompanyProps, {}> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.lookupCompanyState.list;
    const { loadListRequest } = this.props.lookupCompanyDispatch;

    if (user && !isLoading && !response) {
      loadListRequest({
        filter: {
          direction: 'ascending',
          orderBy: undefined,
        }
      });
    }
  }
};

export const FilterCompany = compose<FilterCompanyProps, OwnOptions>(
  withLookupCompany,
  withUser,
  injectIntl,
  withStyles(styles, { withTheme: true }),
  lifecycle(lifecycles)
)(FilterCompanyView);