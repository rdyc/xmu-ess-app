import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ICompanyList } from '@lookup/classes/response';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithStyles, withStyles } from '@material-ui/core';
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
  & WithLayout
  & InjectedIntlProps
  & OwnOptions;

const lifecycles: ReactLifeCycleFunctions<FilterCompanyProps, {}> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.lookupCompanyState.list;
    const { loadAllRequest } = this.props.lookupCompanyDispatch;

    if (user && !isLoading && !response) {
      loadAllRequest({
        filter: {
          direction: 'ascending',
          orderBy: undefined,
          page: undefined,
          size: undefined,
          find: undefined,
          findBy: undefined
        }
      });
    }
  }
};

export const FilterCompany = compose<FilterCompanyProps, OwnOptions>(
  withLookupCompany,
  withUser,
  withLayout,
  injectIntl,
  withStyles(styles),
  lifecycle(lifecycles)
)(FilterCompanyView);