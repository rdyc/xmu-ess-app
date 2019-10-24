import { IHrCompetencyCategoryGetAllFilter } from '@hr/classes/filters';
import { IHrCompetencyClusterList } from '@hr/classes/response';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { HrCompetencyCategoryFilterView } from './HrCompetencyCategoryFilterView';

export type IHrCompetencyCategoryFilterResult = Pick<IHrCompetencyCategoryGetAllFilter, 'competencyUid'>;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IHrCompetencyCategoryFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IHrCompetencyCategoryFilterResult) => void;
}

interface IOwnState {
  isFilterClusterOpen: boolean;
  filterCluster?: IHrCompetencyClusterList;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;

  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter Cluster
  setFilterClusterVisibility: StateHandler<IOwnState>;
  setFilterCluster: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // mainfilter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter Cluster
  handleFilterClusterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterClusterOnSelected: (data: IHrCompetencyClusterList) => void;
  handleFilterClusterOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterClusterOnClose: () => void;
}

export type HrCompetencyCategoryFilterProps 
  = IOwnOption 
  & IOwnState 
  & IOwnHandler 
  & IOwnStateUpdater 
  & WithHrCompetencyCluster
  & WithStyles<typeof styles> 
  & WithUser 
  & InjectedIntlProps;

const createProps: mapper<HrCompetencyCategoryFilterProps, IOwnState> = (props: HrCompetencyCategoryFilterProps): IOwnState => {
  return {
    isFilterClusterOpen: false,
  };
};

const stateUpdaters: StateUpdaters<HrCompetencyCategoryFilterProps, IOwnState, IOwnStateUpdater> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),

  // main filter
  setFilterReset: (prevState: IOwnState, props: HrCompetencyCategoryFilterProps) => () => ({
    filterCluster: undefined
  }),
  // filter Cluster
  setFilterClusterVisibility: (prevState: IOwnState) => () => ({
    isFilterClusterOpen: !prevState.isFilterClusterOpen
  }),
  setFilterCluster: (prevState: IOwnState) => (data?: IHrCompetencyClusterList) => ({
    isFilterClusterOpen: false,
    filterCluster: data
  })
};

const handlerCreators: HandleCreators<HrCompetencyCategoryFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: HrCompetencyCategoryFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: HrCompetencyCategoryFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    if (props.filterCluster) {
      props.onApply({
        competencyUid: props.filterCluster.uid
      });
    }
  },
  handleFilterVisibility: (props: HrCompetencyCategoryFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },

  // filter Cluster
  handleFilterClusterVisibility: (props: HrCompetencyCategoryFilterProps) => () => {
    props.setFilterClusterVisibility();
  },
  handleFilterClusterOnSelected: (props: HrCompetencyCategoryFilterProps) => (data: IHrCompetencyClusterList) => {
    props.setFilterCluster(data);
  },
  handleFilterClusterOnClear: (props: HrCompetencyCategoryFilterProps) => () => {
    props.setFilterCluster();
  },
  handleFilterClusterOnClose: (props: HrCompetencyCategoryFilterProps) => () => {
    props.setFilterClusterVisibility();
  }
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyCategoryFilterProps, IOwnState> = {
  componentDidMount() {
    if (this.props.initialProps) {
      const { competencyUid } = this.props.initialProps;

      // filter cluster
      if (competencyUid) {
        const { response } = this.props.hrCompetencyClusterState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === competencyUid);

          this.props.setFilterCluster(selected);
        }
      }
    }
  },
};

export const HrCompetencyCategoryFilter = compose<HrCompetencyCategoryFilterProps, IOwnOption>(
  setDisplayName('HrCompetencyCategoryFilter'),
  withUser,
  withHrCompetencyCluster,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles),
  lifecycle(lifecycles),
  injectIntl
)(HrCompetencyCategoryFilterView);
