import { ISystemList } from '@common/classes/response';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { ILookupCompany } from '@lookup/classes';
import { ISystemLimitAllFilter } from '@lookup/classes/filters';
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

import { LookupSystemLimitFilterView } from './LookupSystemLimitFilterView';

export type ILookupSystemLimitFilterResult = Pick<ISystemLimitAllFilter,
 'companyUid' | 'categoryType'>;
 
interface OwnOption {
  isOpen: boolean;
  initialProps?: ILookupSystemLimitFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ILookupSystemLimitFilterResult) => void;
}

interface OwnState {
  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;

  // filter category
  isFilterCategoryOpen: boolean;
  filterCategory?: ISystemList;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;

  // filter company
  setFilterCompanyVisibility: StateHandler<OwnState>;
  setFilterCompany: StateHandler<OwnState>;

  // filter category
  setFilterCategoryVisibility: StateHandler<OwnState>;
  setFilterCategory: StateHandler<OwnState>;
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
  handleFilterCategoryVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCategoryOnSelected: (data: ISystemList) => void;
  handleFilterCategoryOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCategoryOnClose: () => void;
}

export type LookupSystemLimitFilterProps
  = OwnOption
  & OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithLookupCompany
  & WithCommonSystem
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<LookupSystemLimitFilterProps, OwnState> = (): OwnState => ({
  isFilterCompanyOpen: false,
  isFilterCategoryOpen: false,
});

const stateUpdaters: StateUpdaters<LookupSystemLimitFilterProps, OwnState, OwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterCompany: undefined,
    filterCategory: undefined
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: OwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: () => (data?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: data
  }),

  // filter category
  setFilterCategoryVisibility: (prevState: OwnState) => () => ({
    isFilterCategoryOpen: !prevState.isFilterCategoryOpen
  }),
  setFilterCategory: () => (data?: ISystemList) => ({
    isFilterCategoryOpen: false,
    filterCategory: data
  }),
};

const handlerCreators: HandleCreators<LookupSystemLimitFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: LookupSystemLimitFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: LookupSystemLimitFilterProps) => () => {
    props.onApply({
      companyUid: props.filterCompany && props.filterCompany.uid,
      categoryType: props.filterCategory && props.filterCategory.type
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: LookupSystemLimitFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: LookupSystemLimitFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: LookupSystemLimitFilterProps) => () => {
    props.setFilterCompany();
  },
  handleFilterCompanyOnClose: (props: LookupSystemLimitFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter category
  handleFilterCategoryVisibility: (props: LookupSystemLimitFilterProps) => () => {
    props.setFilterCategoryVisibility();
  },
  handleFilterCategoryOnSelected: (props: LookupSystemLimitFilterProps) => (data: ISystemList) => {
    props.setFilterCategory(data);
  },
  handleFilterCategoryOnClear: (props: LookupSystemLimitFilterProps) => () => {
    props.setFilterCategory();
  },
  handleFilterCategoryOnClose: (props: LookupSystemLimitFilterProps) => () => {
    props.setFilterCategoryVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupSystemLimitFilterProps, OwnState> = { 
  componentDidMount() {
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { companyUid, categoryType } = this.props.initialProps;

      // filter company
      if (companyUid) {
        const { response } = this.props.lookupCompanyState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === companyUid);

          this.props.setFilterCompany(selected);
        }
      }

      if (categoryType) {
        const { response } = this.props.commonLimiterListState;

        if (response && response.data) {
          const selected = response.data.find(item => item.type === categoryType);

          this.props.setFilterCategory(selected);
        }
      }
    }
  }
};

export const LookupSystemLimitFilter = compose<LookupSystemLimitFilterProps, OwnOption>(
  setDisplayName('LookupSystemLimitFilter'),
  withLookupCompany,
  withCommonSystem,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LookupSystemLimitFilterView);