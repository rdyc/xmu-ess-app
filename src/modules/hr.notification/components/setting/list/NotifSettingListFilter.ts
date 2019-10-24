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

import { INotifSettingGetAllFilter } from '@hr.notification/classes/filters/setting';
import { WithNotifSetting, withNotifSetting } from '@hr.notification/hoc/withNotifSetting';
import { ICompanyList } from '@lookup/classes/response';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { NotifSettingListFilterView } from './NotifSettingListFilterView';

export type INotifSettingListFilterResult = Pick<INotifSettingGetAllFilter, 'companyUid'>;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: INotifSettingListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: INotifSettingListFilterResult) => void;
}

interface IOwnState {
  // filter type
  isFilterCompanyOpen: boolean;
  filterCompany?: ICompanyList;
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
  handleFilterCompanyOnSelected: (data: ICompanyList) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;
}

export type NotifSettingListFilterProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithUser
  & WithLookupCompany
  & WithNotifSetting
  & InjectedIntlProps;

const createProps: mapper<NotifSettingListFilterProps, IOwnState> = (): IOwnState => ({
  isFilterCompanyOpen: false,
});

const stateUpdaters: StateUpdaters<NotifSettingListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: () => () => ({
    filterCompany: undefined
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: IOwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: () => (data?: ICompanyList) => ({
    isFilterCompanyOpen: false,
    filterCompany: data
  })
};

const handlerCreators: HandleCreators<NotifSettingListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: NotifSettingListFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: NotifSettingListFilterProps) => () => {
    props.onApply({
      companyUid: props.filterCompany && props.filterCompany.uid
    });
  },

  // filter type
  handleFilterCompanyVisibility: (props: NotifSettingListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: NotifSettingListFilterProps) => (data: ICompanyList) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: NotifSettingListFilterProps) => () => {
    props.setFilterCompany();
  },
  handleFilterCompanyOnClose: (props: NotifSettingListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<NotifSettingListFilterProps, IOwnState> = {
  componentDidMount() { 
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { companyUid } = this.props.initialProps;

      // filter project type
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

export const NotifSettingListFilter = compose<NotifSettingListFilterProps, IOwnOption>(
  setDisplayName('NotifSettingListFilter'),
  withUser,
  withLookupCompany,
  withNotifSetting,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(NotifSettingListFilterView);