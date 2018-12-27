import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupRoleGetListFilter } from '@lookup/classes/filters/role';
import { IRoleList } from '@lookup/classes/response';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { FilterRoleView } from './FilterRoleView';

interface OwnOptions {
  title: string;
  value?: string | undefined;
  isOpen: boolean;
  hideBackdrop?: boolean;
  filter?: ILookupRoleGetListFilter | undefined;
  onSelected: (role?: IRoleList) => void;
  onClose: () => void;
}

export type FilterRoleProps
  = WithLookupRole
  & WithUser
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps
  & OwnOptions;

const lifecycles: ReactLifeCycleFunctions<FilterRoleProps, {}> = {
  componentDidMount() {
    const { filter } = this.props;
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.lookupRoleState.list;
    const { loadListRequest } = this.props.lookupRoleDispatch;

    if (user && !isLoading && !response) {
      loadListRequest({ filter });
    }
  },
  componentWillReceiveProps(nextProps: FilterRoleProps) {
    if (nextProps.filter !== this.props.filter) {
      const { loadListRequest } = this.props.lookupRoleDispatch;
      const { filter } = nextProps;
  
      loadListRequest({ filter });
      }
  }
};

export const FilterRole = compose<FilterRoleProps, OwnOptions>(
  withLookupRole,
  withUser,
  withLayout,
  injectIntl,
  withStyles(styles),
  lifecycle(lifecycles)
)(FilterRoleView);