import { ISystemList } from '@common/classes/response';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { IDiemAllFilter } from '@lookup/classes/filters';
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

import { LookupDiemListFilterView } from './LookupDiemListFilterView';

export type ILookupDiemListFilterResult = Pick<IDiemAllFilter,
  'projectType' | 'destinationType'>;

interface OwnOption {
  isOpen: boolean;
  initialProps?: ILookupDiemListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ILookupDiemListFilterResult) => void;
}

interface IOwnState {
  // // filter company
  // isFilterCompanyOpen: boolean;
  // filterCompany?: ILookupCompany;

  // filter project type
  isFilterProjectTypeOpen: boolean;
  filterProjectType?: ISystemList;

  // filter destination type
  isFilterDestinationTypeOpen: boolean;
  filterDestinationType?: ISystemList;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // // filter company
  // setFilterCompanyVisibility: StateHandler<IOwnState>;
  // setFilterCompany: StateHandler<IOwnState>;
  
  // filter project type
  setFilterProjectTypeVisibility: StateHandler<IOwnState>;
  setFilterProjectType: StateHandler<IOwnState>;

  // filter destination type
  setFilterDestinationTypeVisibility: StateHandler<IOwnState>;
  setFilterDestinationType: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // // filter company
  // handleFilterCompanyVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  // handleFilterCompanyOnSelected: (data: ILookupCompany) => void;
  // handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  // handleFilterCompanyOnClose: () => void;

  // filter project type
  handleFilterProjectTypeVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectTypeOnSelected: (data: ISystemList) => void;
  handleFilterProjectTypeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectTypeOnClose: () => void;

  // filter destination type
  handleFilterDestinationTypeVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterDestinationTypeOnSelected: (data: ISystemList) => void;
  handleFilterDestinationTypeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterDestinationTypeOnClose: () => void;
}

export type LookupDiemListFilterProps
  = OwnOption
  & IOwnState
  & IOwnHandler
  & WithCommonSystem
  & IOwnStateUpdater
  & WithStyles<typeof styles>
  & WithTheme
  & InjectedIntlProps;

const createProps: mapper<LookupDiemListFilterProps, IOwnState> = (): IOwnState => ({
  // isFilterCompanyOpen: false,
  isFilterProjectTypeOpen: false,
  isFilterDestinationTypeOpen: false,
});

const stateUpdaters: StateUpdaters<LookupDiemListFilterProps, IOwnState, IOwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    // filterCompany: undefined,
    filterProjectType: undefined,
    filterDestinationType: undefined
  }),

  // filter project type
  setFilterProjectTypeVisibility: (prevState: IOwnState) => () => ({
    isFilterProjectTypeOpen: !prevState.isFilterProjectTypeOpen
  }),
  setFilterProjectType: (prevState: IOwnState) => (data?: ISystemList) => ({
    isFilterProjectTypeOpen: false,
    filterProjectType: data
  }),

  // filter project type
  setFilterDestinationTypeVisibility: (prevState: IOwnState) => () => ({
    isFilterDestinationTypeOpen: !prevState.isFilterDestinationTypeOpen
  }),
  setFilterDestinationType: (prevState: IOwnState) => (data?: ISystemList) => ({
    isFilterDestinationTypeOpen: false,
    filterDestinationType: data
  }),
};

const handlerCreators: HandleCreators<LookupDiemListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: LookupDiemListFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: LookupDiemListFilterProps) => () => {
    props.onApply({
      projectType: props.filterProjectType && props.filterProjectType.type,
      destinationType: props.filterDestinationType && props.filterDestinationType.type,
    });
  },

  // filter project type
  handleFilterProjectTypeVisibility: (props: LookupDiemListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterProjectTypeVisibility();
  },
  handleFilterProjectTypeOnSelected: (props: LookupDiemListFilterProps) => (data: ISystemList) => {
    props.setFilterProjectType(data);
  },
  handleFilterProjectTypeOnClear: (props: LookupDiemListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterProjectType();
  },
  handleFilterProjectTypeOnClose: (props: LookupDiemListFilterProps) => () => {
    props.setFilterProjectTypeVisibility();
  },

  // filter destination type
  handleFilterDestinationTypeVisibility: (props: LookupDiemListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterDestinationTypeVisibility();
  },
  handleFilterDestinationTypeOnSelected: (props: LookupDiemListFilterProps) => (data: ISystemList) => {
    props.setFilterDestinationType(data);
  },
  handleFilterDestinationTypeOnClear: (props: LookupDiemListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterDestinationType();
  },
  handleFilterDestinationTypeOnClose: (props: LookupDiemListFilterProps) => () => {
    props.setFilterDestinationTypeVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupDiemListFilterProps, IOwnState> = {
  componentDidMount() { 
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { projectType, destinationType } = this.props.initialProps;

       // filter project type
      if (projectType) {
        const { response } = this.props.commonProjectListState;
        
        if (response && response.data) {
          const selected = response.data.find(item => item.type === projectType);
          
          this.props.setFilterProjectType(selected);
        }
      }

      // filter status type
      if (destinationType) {
        const { response } = this.props.commonDestinationListState;
        
        if (response && response.data) {
          const selected = response.data.find(item => item.type === destinationType);
          
          this.props.setFilterDestinationType(selected);
        }
      }
    }
  }
};

export const LookupDiemListFilter = compose<LookupDiemListFilterProps, OwnOption>(
  setDisplayName('LookupDiemListFilter'),
  withCommonSystem,
  injectIntl,
  withStyles(styles, { withTheme: true }),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LookupDiemListFilterView);