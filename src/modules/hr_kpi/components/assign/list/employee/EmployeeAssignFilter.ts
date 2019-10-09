import { withLayout } from '@layout/hoc/withLayout';
import { ILookupCompany, ILookupRole } from '@lookup/classes';
import { ILookupRoleGetListFilter } from '@lookup/classes/filters/role';
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

import { IEmployeeKPIGetAllFilter } from '@kpi/classes/filter';
import { ICollectionValue } from '@layout/classes/core';
import { IPositionGetListFilter } from '@lookup/classes/filters';
import { IPositionList } from '@lookup/classes/response';
import * as moment from 'moment';
import { EmployeeAssignFilterView } from './EmployeeAssignFilterView';

export type IAccountEmployeeFilterResult = Pick<IEmployeeKPIGetAllFilter, 'companyUids' | 'positionUids' | 'useAccess' | 'useSuperOrdinate' | 'isActive' | 'isNotAssigned' | 'year' | 'isFinal'>;

const nowYear: number = Number(moment().format('YYYY'));

const finalStatus: ICollectionValue[] = [
  { value: 'true', name: 'Final' },
  { value: 'false', name: 'Not Final' }
];

const yearOptions: ICollectionValue[] = [
  { value: nowYear - 2, name: (nowYear - 2).toString() },
  { value: nowYear - 1, name: (nowYear - 1).toString() },
  { value: nowYear, name: nowYear.toString() },
  { value: nowYear + 1, name: (nowYear + 1).toString() },
];

interface OwnOption {
  isOpen: boolean;
  initialProps?: IAccountEmployeeFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IAccountEmployeeFilterResult) => void;
}

interface OwnState {
  finalStatus: ICollectionValue[];
  yearOptions: ICollectionValue[];

  // filter final
  isFilterFinalOpen: boolean;
  filterFinal?: ICollectionValue;

  // filter year
  isFilterYearOpen: boolean;
  filterYear?: ICollectionValue;

  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;

  // filter position
  filterPositionValue?: IPositionGetListFilter;
  isFilterPositionOpen: boolean;
  filterPosition?: IPositionList;

  // filter role
  filterRoleValue?: ILookupRoleGetListFilter;
  isFilterRoleOpen: boolean;
  filterRole?: ILookupRole;

  // filter status
  filterStatus?: boolean; 

  // filter assign
  filterNotAssign?: boolean; 

  // filter access
  filterAccess?: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;

  // filter final
  setFilterFinalVisibility: StateHandler<OwnState>;
  setFilterFinal: StateHandler<OwnState>;

  // filter year
  setFilterYearVisibility: StateHandler<OwnState>;
  setFilterYear: StateHandler<OwnState>;

  // filter company
  setFilterCompanyVisibility: StateHandler<OwnState>;
  setFilterCompany: StateHandler<OwnState>;

  // filter position
  setFilterPositionVisibility: StateHandler<OwnState>;
  setFilterPosition: StateHandler<OwnState>;

  // filter role
  setFilterRoleVisibility: StateHandler<OwnState>;
  setFilterRole: StateHandler<OwnState>;

  // filter status
  setFilterStatus: StateHandler<OwnState>;

  // filter assign
  setFilterNotAssign: StateHandler<OwnState>;

  // filter access
  setFilterAccess: StateHandler<OwnState>;
}

interface OwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter final
  handleFilterFinalVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterFinalOnSelected: (data: ICollectionValue) => void;
  handleFilterFinalOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterFinalOnClose: () => void;

  // filter year
  handleFilterYearVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterYearOnSelected: (data: ICollectionValue) => void;
  handleFilterYearOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterYearOnClose: () => void;

  // filter company
  handleFilterCompanyVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnSelected: (data: ILookupCompany) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;

  // filter position
  handleFilterPositionVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterPositionOnSelected: (data: IPositionList) => void;
  handleFilterPositionOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterPositionOnClose: () => void;
  
  // filter role
  handleFilterRoleVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterRoleOnSelected: (data: ILookupRole) => void;
  handleFilterRoleOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterRoleOnClose: () => void;

  // filter status
  handleFilterStatusOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;

  // filter assign
  handleFilterNotAssignOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;

  // filter access
  handleFilterAccessOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
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
  finalStatus,
  yearOptions,

  isFilterCompanyOpen: false,
  isFilterPositionOpen: false,
  isFilterRoleOpen: false,
  isFilterFinalOpen: false,
  isFilterYearOpen: false,

  filterStatus: props.initialProps && props.initialProps.isActive,
  filterAccess: props.initialProps && props.initialProps.useAccess,
});

const stateUpdaters: StateUpdaters<AccountEmployeeAssignFilterProps, OwnState, OwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterYear: undefined,
    filterFinal: undefined,
    filterCompany: undefined,
    filterPosition: undefined,
    filterRole: undefined,
    filterStatus: false,
    filterNotAssign: false,
    filterAccess: false,
  }),

  // filter completion
  setFilterFinalVisibility: (prevState: OwnState) => () => ({
    isFilterFinalOpen: !prevState.isFilterFinalOpen
  }),
  setFilterFinal: () => (data?: ICollectionValue) => ({
    isFilterFinalOpen: false,
    filterFinal: data
  }),

  // filter year
  setFilterYearVisibility: (prevState: OwnState) => () => ({
    isFilterYearOpen: !prevState.isFilterFinalOpen
  }),
  setFilterYear: () => (data?: ICollectionValue) => ({
    isFilterYearOpen: false,
    filterYear: data
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

  // filter position
  setFilterPositionVisibility: (prevState: OwnState) => () => ({
    isFilterPositionOpen: !prevState.isFilterPositionOpen
  }),
  setFilterPosition: () => (data?: IPositionList) => ({
    isFilterPositionOpen: false,
    filterPosition: data,
  }),

  // filter role
  setFilterRoleVisibility: (prevState: OwnState) => () => ({
    isFilterRoleOpen: !prevState.isFilterRoleOpen
  }),
  setFilterRole: () => (data?: ILookupRole) => ({
    isFilterRoleOpen: false,
    filterRole: data
  }),

  // filter status
  setFilterStatus: () => (checked: boolean) => ({
    filterStatus: checked
  }),

  // filter not assign
  setFilterNotAssign: () => (checked: boolean) => ({
    filterNotAssign: checked
  }),

  // filter access
  setFilterAccess: () => (checked: boolean) => ({
    filterAccess: checked
  }),
};

const handlerCreators: HandleCreators<AccountEmployeeAssignFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: AccountEmployeeAssignFilterProps) => () => {
    props.onApply({
      isFinal: props.filterFinal && props.filterFinal.value && props.filterFinal.value === 'true' ? true : (props.filterFinal && props.filterFinal.value === 'false' ? false : undefined ),
      year: props.filterYear && props.filterYear.value,
      companyUids: props.filterCompany && props.filterCompany.uid,
      positionUids: props.filterPosition && props.filterPosition.uid,
      useAccess: props.filterAccess,
      isNotAssigned: props.filterNotAssign,
      isActive: props.filterStatus,
    });
  },

  // filter completion
  handleFilterFinalVisibility: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterFinalVisibility();
  },
  handleFilterFinalOnSelected: (props: AccountEmployeeAssignFilterProps) => (data: ICollectionValue) => {
    props.setFilterFinal(data);
  },
  handleFilterFinalOnClear: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterFinal();
  },
  handleFilterFinalOnClose: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterFinalVisibility();
  },

  // filter year
  handleFilterYearVisibility: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterYearVisibility();
  },
  handleFilterYearOnSelected: (props: AccountEmployeeAssignFilterProps) => (data: ICollectionValue) => {
    props.setFilterYear(data);
  },
  handleFilterYearOnClear: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterYear();
  },
  handleFilterYearOnClose: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterYearVisibility();
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

  // filter position
  handleFilterPositionVisibility: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterPositionVisibility();
  },
  handleFilterPositionOnSelected: (props: AccountEmployeeAssignFilterProps) => (data: IPositionList) => {
    props.setFilterPosition(data);
  },
  handleFilterPositionOnClear: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterPosition();
  },
  handleFilterPositionOnClose: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterPositionVisibility();
  },

  // filter role
  handleFilterRoleVisibility: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterRoleVisibility();
  },
  handleFilterRoleOnSelected: (props: AccountEmployeeAssignFilterProps) => (data: ILookupRole) => {
    props.setFilterRole(data);
  },
  handleFilterRoleOnClear: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterRole();
  },
  handleFilterRoleOnClose: (props: AccountEmployeeAssignFilterProps) => () => {
    props.setFilterRoleVisibility();
  },

  // filter status
  handleFilterStatusOnChange: (props: AccountEmployeeAssignFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterStatus(checked);
  },

  // filter no assign
  handleFilterNotAssignOnChange: (props: AccountEmployeeAssignFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterNotAssign(checked);
  },

  // filter access
  handleFilterAccessOnChange: (props: AccountEmployeeAssignFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterAccess(checked);
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAssignFilterProps, OwnState> = { 
  componentDidMount() {
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { companyUids } = this.props.initialProps;

      // filter company
      if (companyUids) {
        const { response } = this.props.lookupCompanyState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === companyUids);

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