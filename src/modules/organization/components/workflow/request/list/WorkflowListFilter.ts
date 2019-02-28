import { ILookupCompany } from '@lookup/classes';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithStyles, withStyles } from '@material-ui/core';
import { IOrganizationWorkflowAllFilter } from '@organization/classes/filters/workflow';
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

import { WorkflowListFilterView } from './WorkflowListFilterView';

export type IWorkflowMenuListFilterResult = Pick<IOrganizationWorkflowAllFilter,
  'companyUid'>;

interface OwnOption {
  isOpen: boolean;
  initialProps?: IWorkflowMenuListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (company: ILookupCompany | undefined) => void;
}

interface IOwnState {
  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter company
  setFilterCompanyVisibility: StateHandler<IOwnState>;
  setFilterCompany: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter company
  handleFilterCompanyVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnSelected: (data: ILookupCompany) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;
}

export type WorkflowListFilterProps
  = OwnOption
  & IOwnState
  & IOwnHandler
  & WithLookupCompany
  & IOwnStateUpdater
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<WorkflowListFilterProps, IOwnState> = (): IOwnState => ({
  isFilterCompanyOpen: false,
});

const stateUpdaters: StateUpdaters<WorkflowListFilterProps, IOwnState, IOwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterCompany: undefined
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: IOwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: () => (data?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: data,
  }),
};

const handlerCreators: HandleCreators<WorkflowListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: WorkflowListFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: WorkflowListFilterProps) => () => {
    props.onApply(props.filterCompany);
  },

  // filter company
  handleFilterCompanyVisibility: (props: WorkflowListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: WorkflowListFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: WorkflowListFilterProps) => () => {
    props.setFilterCompany();
  },
  handleFilterCompanyOnClose: (props: WorkflowListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<WorkflowListFilterProps, IOwnState> = {
  componentDidMount() {
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { companyUid } = this.props.initialProps;

      // filter company
      if (companyUid) {
        const { response } = this.props.lookupCompanyState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === companyUid);

          this.props.setFilterCompany(selected);
        }
      }
    }
  }
};

export const WorkflowListFilter = compose<WorkflowListFilterProps, OwnOption>(
  setDisplayName('WorkflowListFilter'),
  withLookupCompany,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(WorkflowListFilterView);