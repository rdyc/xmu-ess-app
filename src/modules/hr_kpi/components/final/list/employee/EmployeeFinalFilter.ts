import { withLayout } from '@layout/hoc/withLayout';
import { ILookupCompany } from '@lookup/classes';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
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

import { IEmployeeAllKPIFinalFilter } from '@account/classes/filters/employeeKPI';
import { EmployeeAssignFilterView } from './EmployeeFinalFilterView';

export type IAccountEmployeeFilterResult = Pick<IEmployeeAllKPIFinalFilter, 'companyUid' | 'isActive'>;

interface OwnOption {
  isOpen: boolean;
  initialProps?: IAccountEmployeeFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IAccountEmployeeFilterResult) => void;
}

interface OwnState {

  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;

  // filter status
  filterStatus?: boolean; 
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;

  // filter company
  setFilterCompanyVisibility: StateHandler<OwnState>;
  setFilterCompany: StateHandler<OwnState>;

  // filter status
  setFilterStatus: StateHandler<OwnState>;
}

interface OwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter company
  handleFilterCompanyVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnSelected: (data: ILookupCompany) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;

  // filter status
  handleFilterStatusOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type AccountEmployeeAssignFilterProps
  = OwnOption
  & OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithLookupCompany
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<AccountEmployeeAssignFilterProps, OwnState> = (props: AccountEmployeeAssignFilterProps): OwnState => ({
  isFilterCompanyOpen: false,

  filterStatus: props.initialProps && props.initialProps.isActive,
});

const stateUpdaters: StateUpdaters<AccountEmployeeAssignFilterProps, OwnState, OwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterCompany: undefined,
    filterStatus: false,
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: OwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: () => (data?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: data,
    filterRoleValue: {
      companyUid: data && data.uid
    },
    filterPositionValue: {
      companyUid: data && data.uid
    },
  }),

  // filter status
  setFilterStatus: () => (checked: boolean) => ({
    filterStatus: checked
  }),
};

const handlerCreators: HandleCreators<AccountEmployeeAssignFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: AccountEmployeeAssignFilterProps) => () => {
    props.onApply({
      companyUid: props.filterCompany && props.filterCompany.uid,
      isActive: props.filterStatus,
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: AccountEmployeeAssignFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterCompany();
    props.setFilterRole();
  },
  handleFilterCompanyOnClose: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter status
  handleFilterStatusOnChange: (props: AccountEmployeeAssignFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterStatus(checked);
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAssignFilterProps, OwnState> = { 
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

export const EmployeeAssignFilter = compose<AccountEmployeeAssignFilterProps, OwnOption>(
  setDisplayName('EmployeeAssignFilter'),
  withLayout,
  withLookupCompany,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(EmployeeAssignFilterView);