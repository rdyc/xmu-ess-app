import { IHrCompetencyClusterList } from '@hr/classes/response';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { FilterClusterView } from './FilterClusterView';

interface IOwnOptions {
  title: string;
  value?: string | undefined;
  isOpen: boolean;
  hideBackdrop?: boolean;
  onSelected: (cluster?: IHrCompetencyClusterList) => void;
  onClose: () => void;
}

export type FilterClusterProps
  = WithHrCompetencyCluster
  & WithUser
  & WithStyles<typeof styles>
  & InjectedIntlProps
  & IOwnOptions;

const lifecycles: ReactLifeCycleFunctions<FilterClusterProps, {}> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.hrCompetencyClusterState.list;
    const { loadListRequest } = this.props.hrCompetencyClusterDispatch;

    if (user && !isLoading && !response) {
      loadListRequest({
        filter: {
          direction: 'ascending',
          orderBy: 'name',
        }
      });
    }
  }
};

export const FilterCluster = compose<FilterClusterProps, IOwnOptions>(
  withHrCompetencyCluster,
  withUser,
  injectIntl,
  withStyles(styles),
  lifecycle(lifecycles)
)(FilterClusterView);