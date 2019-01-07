import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IPositionGetAllFilter } from '@lookup/classes/filters/position/IPositionGetAllFilter';
// import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { ICompanyList } from '@lookup/classes/response';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  mapper,
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
  handleFilterCompanyOnSelected: (company: ICompanyList) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;
}

export type PositionListFilterProps 
  = IOwnOption
  & WithUser
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithLayout
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
  setFilterCompanyVisibility: (prevState: IOwnState, props: PositionListFilterProps) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen,
  }),
  setFilterCompany: (prevState: IOwnState) => (company?: ICompanyList) => ({
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
  handleFilterCompanyOnSelected: (props: PositionListFilterProps) => (company: ICompanyList) => {
    props.setFilterCompany(company);
  },
  handleFilterCompanyOnClear: (props: PositionListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompany();
  },
  handleFilterCompanyOnClose: (props: PositionListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

};

export const PositionListFilter = compose<PositionListFilterProps, IOwnOption>(
  setDisplayName('PositionListFilter'),
  withUser,
  withLayout,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(PositionListFilterView);