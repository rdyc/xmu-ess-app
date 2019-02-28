import { ISystemAllFilter } from '@common/classes/filters';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { ICompanyList } from '@lookup/classes/response';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
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

import { CommonListFilterView } from './CommonListFilterView';

export type ICommonListFilterResult = Pick<ISystemAllFilter, 'companyUid' >;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: ICommonListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ICommonListFilterResult) => void;
}

interface IOwnState {
  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ICompanyList;

  // filter company Dialog
  filterCompanyDialog: ILookupCompanyGetListFilter;
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
  handleFilterCompanyOnSelected: (company: ICompanyList) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;
}

export type CommonListFilterProps 
  = IOwnOption
  & WithUser
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithLookupCompany
  & WithStyles<typeof styles>
  & WithTheme
  & InjectedIntlProps;

const createProps: mapper<CommonListFilterProps, IOwnState> = (): IOwnState => ({
  isFilterCompanyOpen: false,

  // default filter project dialog
  filterCompanyDialog: {
    orderBy: 'uid'
  }
});

const stateUpdaters: StateUpdaters<CommonListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: () => () => ({
    filterCompany: undefined,
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: IOwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: () => (company?: ICompanyList) => ({
    isFilterCompanyOpen: false,
    filterCompany: company,
  }),
};

const handlerCreators: HandleCreators<CommonListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: CommonListFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: CommonListFilterProps) => () => {
    props.onApply({
      companyUid: props.filterCompany && props.filterCompany.uid,
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: CommonListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: CommonListFilterProps) => (company: ICompanyList) => {
    props.setFilterCompany(company);
  },
  handleFilterCompanyOnClear: (props: CommonListFilterProps) => () => {
    props.setFilterCompany();
  },
  handleFilterCompanyOnClose: (props: CommonListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<CommonListFilterProps, IOwnState> = {
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

export const CommonListFilter = compose<CommonListFilterProps, IOwnOption>(
  setDisplayName('CommonListFilter'),
  withUser,
  withLookupCompany,
  withStyles(styles, { withTheme: true }),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(CommonListFilterView);