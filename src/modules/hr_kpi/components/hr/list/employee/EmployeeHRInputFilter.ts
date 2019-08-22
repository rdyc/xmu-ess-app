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
import { EmployeeHRInputFilterView } from './EmployeeHRInputFilterView';

export type IAccountEmployeeFilterResult = Pick<IEmployeeAllFilter, 'companyUids' | 'positionUids' | 'useAccess' | 'useSuperOrdinate' | 'isActive'>;

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

export type EmployeeHRInputFilterProps
  = OwnOption
  & OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithLookupCompany
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<EmployeeHRInputFilterProps, OwnState> = (props: EmployeeHRInputFilterProps): OwnState => ({
  isFilterCompanyOpen: false,
  isFilterPositionOpen: false,
  isFilterRoleOpen: false,

  filterStatus: props.initialProps && props.initialProps.isActive,
  filterAccess: props.initialProps && props.initialProps.useAccess,
});

const stateUpdaters: StateUpdaters<EmployeeHRInputFilterProps, OwnState, OwnStateUpdater> = {
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

const handlerCreators: HandleCreators<EmployeeHRInputFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: EmployeeHRInputFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: EmployeeHRInputFilterProps) => () => {
    props.onApply({
      companyUids: props.filterCompany && props.filterCompany.uid,
      positionUids: props.filterPosition && props.filterPosition.uid,
      useAccess: props.filterAccess,
      isActive: props.filterStatus,
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: EmployeeHRInputFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: EmployeeHRInputFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: EmployeeHRInputFilterProps) => () => {
    props.setFilterCompany();
    props.setFilterRole();
  },
  handleFilterCompanyOnClose: (props: EmployeeHRInputFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter position
  handleFilterPositionVisibility: (props: EmployeeHRInputFilterProps) => () => {
    props.setFilterPositionVisibility();
  },
  handleFilterPositionOnSelected: (props: EmployeeHRInputFilterProps) => (data: IPositionList) => {
    props.setFilterPosition(data);
  },
  handleFilterPositionOnClear: (props: EmployeeHRInputFilterProps) => () => {
    props.setFilterPosition();
  },
  handleFilterPositionOnClose: (props: EmployeeHRInputFilterProps) => () => {
    props.setFilterPositionVisibility();
  },

  // filter role
  handleFilterRoleVisibility: (props: EmployeeHRInputFilterProps) => () => {
    props.setFilterRoleVisibility();
  },
  handleFilterRoleOnSelected: (props: EmployeeHRInputFilterProps) => (data: ILookupRole) => {
    props.setFilterRole(data);
  },
  handleFilterRoleOnClear: (props: EmployeeHRInputFilterProps) => () => {
    props.setFilterRole();
  },
  handleFilterRoleOnClose: (props: EmployeeHRInputFilterProps) => () => {
    props.setFilterRoleVisibility();
  },

  // filter status
  handleFilterStatusOnChange: (props: EmployeeHRInputFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterStatus(checked);
  },

  // filter access
  handleFilterAccessOnChange: (props: EmployeeHRInputFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterAccess(checked);
  },
};

const lifecycles: ReactLifeCycleFunctions<EmployeeHRInputFilterProps, OwnState> = { 
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

export const EmployeeHRInputFilter = compose<EmployeeHRInputFilterProps, OwnOption>(
  setDisplayName('EmployeeHRInputFilter'),
  withLayout,
  withLookupCompany,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(EmployeeHRInputFilterView);