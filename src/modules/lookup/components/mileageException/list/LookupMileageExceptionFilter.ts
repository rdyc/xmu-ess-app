import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { ILookupCompany, ILookupRole } from '@lookup/classes';
import { IMileageExceptionAllFilter } from '@lookup/classes/filters';
import { ILookupRoleGetListFilter } from '@lookup/classes/filters/role';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
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

import { LookupMileageExceptionFilterView } from './LookupMileageExceptionFilterView';

export type ILookupMileageExceptionFilterResult = Pick<IMileageExceptionAllFilter,
  'companyUid' | 'roleUid'>;

interface OwnOption {
  isOpen: boolean;
  initialProps?: ILookupMileageExceptionFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ILookupMileageExceptionFilterResult) => void;
}

interface OwnState {
  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;

  // filter role
  filterRoleValue?: ILookupRoleGetListFilter;
  isFilterRoleOpen: boolean;
  filterRole?: ILookupRole;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;

  // filter company
  setFilterCompanyVisibility: StateHandler<OwnState>;
  setFilterCompany: StateHandler<OwnState>;

  // filter role
  setFilterRoleVisibility: StateHandler<OwnState>;
  setFilterRole: StateHandler<OwnState>;
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
  
  // filter role
  handleFilterRoleVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterRoleOnSelected: (data: ILookupRole) => void;
  handleFilterRoleOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterRoleOnClose: () => void;
}

export type LookupMileageExceptionFilterProps
  = OwnOption
  & OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithStyles<typeof styles>
  & WithLookupCompany
  & WithLookupRole
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<LookupMileageExceptionFilterProps, OwnState> = (): OwnState => ({
  isFilterCompanyOpen: false,
  isFilterRoleOpen: false,
});

const stateUpdaters: StateUpdaters<LookupMileageExceptionFilterProps, OwnState, OwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterCompany: undefined,
    filterRole: undefined
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: OwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: (prevState: OwnState) => (data?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: data,
    filterRoleValue: {
      companyUid: data && data.uid
    },
    filterRole: (prevState.filterCompany === data ? prevState.filterRole : undefined)
  }),

  // filter role
  setFilterRoleVisibility: (prevState: OwnState) => () => ({
    isFilterRoleOpen: !prevState.isFilterRoleOpen
  }),
  setFilterRole: () => (data?: ILookupRole) => ({
    isFilterRoleOpen: false,
    filterRole: data
  }),
};

const handlerCreators: HandleCreators<LookupMileageExceptionFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: LookupMileageExceptionFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: LookupMileageExceptionFilterProps) => () => {
    props.onApply({
      companyUid: props.filterCompany && props.filterCompany.uid,
      roleUid: props.filterRole && props.filterRole.uid
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: LookupMileageExceptionFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: LookupMileageExceptionFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: LookupMileageExceptionFilterProps) => () => {
    props.setFilterCompany();
    props.setFilterRole();
  },
  handleFilterCompanyOnClose: (props: LookupMileageExceptionFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter role
  handleFilterRoleVisibility: (props: LookupMileageExceptionFilterProps) => () => {
    props.setFilterRoleVisibility();
  },
  handleFilterRoleOnSelected: (props: LookupMileageExceptionFilterProps) => (data: ILookupRole) => {
    props.setFilterRole(data);
  },
  handleFilterRoleOnClear: (props: LookupMileageExceptionFilterProps) => () => {
    props.setFilterRole();
  },
  handleFilterRoleOnClose: (props: LookupMileageExceptionFilterProps) => () => {
    props.setFilterRoleVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupMileageExceptionFilterProps, OwnState> = {
  componentDidMount() {
    if (this.props.initialProps) {
      const { companyUid, roleUid } = this.props.initialProps;

      if (companyUid) {
        const { response } = this.props.lookupCompanyState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === companyUid);

          this.props.setFilterCompany(selected);
        }
      }

      if (roleUid) {
        const { response } = this.props.lookupRoleState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === roleUid);

          this.props.setFilterRole(selected);
        }
      }
    }
  }
};

export const LookupMileageExceptionFilter = compose<LookupMileageExceptionFilterProps, OwnOption>(
  setDisplayName('LookupMileageExceptionFilter'),
  withLayout,
  withLookupCompany,
  withLookupRole,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles),
)(LookupMileageExceptionFilterView);