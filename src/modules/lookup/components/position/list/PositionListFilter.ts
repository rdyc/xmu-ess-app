import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompany } from '@lookup/classes';
import { IPositionGetAllFilter } from '@lookup/classes/filters/position/IPositionGetAllFilter';
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

import { PositionListFilterView } from './PositionListFilterView';

export type IPositionListFilterResult = Pick<IPositionGetAllFilter, 'companyUid' >;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IPositionListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IPositionListFilterResult) => void;
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
  handleFilterCompanyOnSelected: (company: ILookupCompany) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;
}

export type PositionListFilterProps 
  = IOwnOption
  & WithUser
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithLookupCompany
  & WithStyles<typeof styles>
  & WithTheme
  & InjectedIntlProps;

const createProps: mapper<PositionListFilterProps, IOwnState> = (props: PositionListFilterProps): IOwnState => ({
  isFilterCompanyOpen: false,
});

const stateUpdaters: StateUpdaters<PositionListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCompany: undefined,
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: IOwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen,
  }),
  setFilterCompany: (prevState: IOwnState) => (company?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: company,
  }),
};

const handlerCreators: HandleCreators<PositionListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: PositionListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: PositionListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      companyUid: props.filterCompany && props.filterCompany.uid,
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: PositionListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompanyVisibility(); 
  },
  handleFilterCompanyOnSelected: (props: PositionListFilterProps) => (company: ILookupCompany) => {
    props.setFilterCompany(company);
  },
  handleFilterCompanyOnClear: (props: PositionListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompany();
  },
  handleFilterCompanyOnClose: (props: PositionListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

};

const lifecycles: ReactLifeCycleFunctions<PositionListFilterProps, IOwnState> = {
  componentDidMount() {
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { companyUid } = this.props.initialProps;

      // filter customer
      if ( companyUid ) {
        const { response } = this.props.lookupCompanyState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === companyUid);

          this.props.setFilterCompany(selected);
        }
      }
    }
  }
};

export const PositionListFilter = compose<PositionListFilterProps, IOwnOption>(
  setDisplayName('PositionListFilter'),
  withUser,
  withLookupCompany,
  injectIntl,
  withStyles(styles, { withTheme: true }),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(PositionListFilterView);