import { IEmployeeAllFilter } from '@account/classes/filters';
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

import { IPositionGetListFilter } from '@lookup/classes/filters';
import { IPositionList } from '@lookup/classes/response';
import { EmployeeManagerInputFilterView } from './EmployeeManagerInputFilterView';

export type IAccountEmployeeFilterResult = Pick<IEmployeeAllFilter, 'companyUids' | 'positionUids' | 'useAccess' | 'roleUids' | 'isActive'>;

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

  // filter access
  filterAccess?: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;

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

  // filter access
  setFilterAccess: StateHandler<OwnState>;
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

  // filter access
  handleFilterAccessOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type EmployeeManagerInputFilterProps
  = OwnOption
  & OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithLookupCompany
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<EmployeeManagerInputFilterProps, OwnState> = (props: EmployeeManagerInputFilterProps): OwnState => ({
  isFilterCompanyOpen: false,
  isFilterPositionOpen: false,
  isFilterRoleOpen: false,

  filterStatus: props.initialProps && props.initialProps.isActive,
  filterAccess: props.initialProps && props.initialProps.useAccess,
});

const stateUpdaters: StateUpdaters<EmployeeManagerInputFilterProps, OwnState, OwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterCompany: undefined,
    filterPosition: undefined,
    filterRole: undefined,
    filterStatus: false,
    filterAccess: false,
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

  // filter access
  setFilterAccess: () => (checked: boolean) => ({
    filterAccess: checked
  }),
};

const handlerCreators: HandleCreators<EmployeeManagerInputFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: EmployeeManagerInputFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: EmployeeManagerInputFilterProps) => () => {
    props.onApply({
      companyUids: props.filterCompany && props.filterCompany.uid,
      positionUids: props.filterPosition && props.filterPosition.uid,
      roleUids: props.filterRole && props.filterRole.uid,
      useAccess: props.filterAccess,
      isActive: props.filterStatus,
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: EmployeeManagerInputFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: EmployeeManagerInputFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: EmployeeManagerInputFilterProps) => () => {
    props.setFilterCompany();
    props.setFilterRole();
  },
  handleFilterCompanyOnClose: (props: EmployeeManagerInputFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter position
  handleFilterPositionVisibility: (props: EmployeeManagerInputFilterProps) => () => {
    props.setFilterPositionVisibility();
  },
  handleFilterPositionOnSelected: (props: EmployeeManagerInputFilterProps) => (data: IPositionList) => {
    props.setFilterPosition(data);
  },
  handleFilterPositionOnClear: (props: EmployeeManagerInputFilterProps) => () => {
    props.setFilterPosition();
  },
  handleFilterPositionOnClose: (props: EmployeeManagerInputFilterProps) => () => {
    props.setFilterPositionVisibility();
  },

  // filter role
  handleFilterRoleVisibility: (props: EmployeeManagerInputFilterProps) => () => {
    props.setFilterRoleVisibility();
  },
  handleFilterRoleOnSelected: (props: EmployeeManagerInputFilterProps) => (data: ILookupRole) => {
    props.setFilterRole(data);
  },
  handleFilterRoleOnClear: (props: EmployeeManagerInputFilterProps) => () => {
    props.setFilterRole();
  },
  handleFilterRoleOnClose: (props: EmployeeManagerInputFilterProps) => () => {
    props.setFilterRoleVisibility();
  },

  // filter status
  handleFilterStatusOnChange: (props: EmployeeManagerInputFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterStatus(checked);
  },

  // filter access
  handleFilterAccessOnChange: (props: EmployeeManagerInputFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterAccess(checked);
  },
};

const lifecycles: ReactLifeCycleFunctions<EmployeeManagerInputFilterProps, OwnState> = { 
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

export const EmployeeManagerInputFilter = compose<EmployeeManagerInputFilterProps, OwnOption>(
  setDisplayName('EmployeeManagerInputFilter'),
  withLayout,
  withLookupCompany,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(EmployeeManagerInputFilterView);