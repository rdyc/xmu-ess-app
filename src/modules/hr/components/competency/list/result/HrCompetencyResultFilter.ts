import { IHrCompetencyEmployeeGetAllFilter } from '@hr/classes/filters';
import { ICollectionValue } from '@layout/classes/core';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompany } from '@lookup/classes';
import { IPositionGetListFilter } from '@lookup/classes/filters';
import { IPositionList } from '@lookup/classes/response';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithLookupPosition, withLookupPosition } from '@lookup/hoc/withLookupPosition';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as moment from 'moment';
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

import { HrCompetencyResultFilterView } from './HrCompetencyResultFilterView';

export type IHrCompetencyResultFilterResult = Pick<IHrCompetencyEmployeeGetAllFilter, 'status' | 'companyUid' | 'positionUid' | 'assessmentYear'>;

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
];

const getYear: number = Number(moment().format('YYYY'));

const yearList: ICollectionValue[] = [
  {value: getYear - 1, name: (getYear - 1).toString() },
  {value: getYear, name: (getYear).toString() },
  {value: getYear + 1, name: (getYear + 1).toString() },
];

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IHrCompetencyResultFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IHrCompetencyResultFilterResult) => void;
}

interface IOwnState {
  completionStatus: ICollectionValue[];

  // filter completion
  isFilterCompletionOpen: boolean;
  filterCompletion?: ICollectionValue;
  
  yearList: ICollectionValue[];
  
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
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;

  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter completion
  setFilterCompletionVisibility: StateHandler<IOwnState>;
  setFilterCompletion: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // mainfilter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter completion
  handleFilterCompletionVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnSelected: (data: ICollectionValue) => void;
  handleFilterCompletionOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnClose: () => void;
  
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
}

export type HrCompetencyResultFilterProps 
  = IOwnOption 
  & IOwnState 
  & IOwnHandler 
  & IOwnStateUpdater
  & WithStyles<typeof styles> 
  & WithUser 
  & WithLookupCompany
  & WithLookupPosition
  & InjectedIntlProps;

const createProps: mapper<HrCompetencyResultFilterProps, IOwnState> = (props: HrCompetencyResultFilterProps): IOwnState => {
  return {
    yearList,
    completionStatus,
    isFilterCompletionOpen: false,
    isFilterYearOpen: false,
    isFilterCompanyOpen: false,
    isFilterPositionOpen: false,
  };
};

const stateUpdaters: StateUpdaters<HrCompetencyResultFilterProps, IOwnState, IOwnStateUpdater> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),

  // main filter
  setFilterReset: (prevState: IOwnState, props: HrCompetencyResultFilterProps) => () => ({
    filterCompletion: { value: 'pending', name: 'Pending'},
    filterYear: undefined,
    filterCompany: undefined,
    filterPosition: undefined
  }),

  // filter completion
  setFilterCompletionVisibility: (prevState: IOwnState) => () => ({
    isFilterCompletionOpen: !prevState.isFilterCompletionOpen
  }),
  setFilterCompletion: (prevState: IOwnState) => (data?: ICollectionValue) => ({
    isFilterCompletionOpen: false,
    filterCompletion: data
  }),
  
  // filter year
  setFilterYearVisibility: (prevState: IOwnState) => () => ({
    isFilterYearOpen: !prevState.isFilterYearOpen
  }),
  setFilterYear: () => (data?: ICollectionValue) => ({
    isFilterYearOpen: false,
    filterYear: data
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: IOwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: (prevState: IOwnState) => (data?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: data,
    filterPositionValue: {
      companyUid: data && data.uid
    },
    filterPosition: (prevState.filterCompany === data ? prevState.filterPosition : undefined)
  }),

  // filter position
  setFilterPositionVisibility: (prevState: IOwnState) => () => ({
    isFilterPositionOpen: !prevState.isFilterPositionOpen
  }),
  setFilterPosition: () => (data?: IPositionList) => ({
    isFilterPositionOpen: false,
    filterPosition: data
  }),
};

const handlerCreators: HandleCreators<HrCompetencyResultFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: HrCompetencyResultFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: HrCompetencyResultFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      status: props.filterCompletion && props.filterCompletion.value,
      assessmentYear: props.filterYear && props.filterYear.value,
      companyUid: props.filterCompany && props.filterCompany.uid,
      positionUid: props.filterPosition && props.filterPosition.uid
    });
  },
  handleFilterVisibility: (props: HrCompetencyResultFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: HrCompetencyResultFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: HrCompetencyResultFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: HrCompetencyResultFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion({value: 'pending', name: 'Pending'});
  },
  handleFilterCompletionOnClose: (props: HrCompetencyResultFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },
  
  // filter year
  handleFilterYearVisibility: (props: HrCompetencyResultFilterProps) => () => {
    props.setFilterYearVisibility();
  },
  handleFilterYearOnSelected: (props: HrCompetencyResultFilterProps) => (data: ICollectionValue) => {
    props.setFilterYear(data);
  },
  handleFilterYearOnClear: (props: HrCompetencyResultFilterProps) => () => {
    props.setFilterYear();
  },
  handleFilterYearOnClose: (props: HrCompetencyResultFilterProps) => () => {
    props.setFilterYearVisibility();
  },

  // filter company
  handleFilterCompanyVisibility: (props: HrCompetencyResultFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: HrCompetencyResultFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: HrCompetencyResultFilterProps) => () => {
    props.setFilterCompany();
    props.setFilterPosition();
  },
  handleFilterCompanyOnClose: (props: HrCompetencyResultFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter position
  handleFilterPositionVisibility: (props: HrCompetencyResultFilterProps) => () => {
    props.setFilterPositionVisibility();
  },
  handleFilterPositionOnSelected: (props: HrCompetencyResultFilterProps) => (data: IPositionList) => {
    props.setFilterPosition(data);
  },
  handleFilterPositionOnClear: (props: HrCompetencyResultFilterProps) => () => {
    props.setFilterPosition();
  },
  handleFilterPositionOnClose: (props: HrCompetencyResultFilterProps) => () => {
    props.setFilterPositionVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyResultFilterProps, IOwnState> = {
  componentDidMount() {
    if (this.props.initialProps) {
      const { status, companyUid, positionUid, assessmentYear } = this.props.initialProps;

      // filter completion
      if (status) {
        const selected = completionStatus.find(item => item.value === status);
          
        this.props.setFilterCompletion(selected);
      }

      // filter year
      if (assessmentYear) {
        const selected = yearList.find(item => item.value === assessmentYear);

        this.props.setFilterYear(selected);
      }
      
      if (companyUid) {
        const { response } = this.props.lookupCompanyState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === companyUid);

          this.props.setFilterCompany(selected);
        }
      }

      if (positionUid) {
        const { response } = this.props.lookupPositionState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === positionUid);

          this.props.setFilterPosition(selected);
        }
      }
    }
  },
};

export const HrCompetencyResultFilter = compose<HrCompetencyResultFilterProps, IOwnOption>(
  setDisplayName('HrCompetencyResultFilter'),
  withUser,
  withLookupCompany,
  withLookupPosition,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles),
  lifecycle(lifecycles),
  injectIntl
)(HrCompetencyResultFilterView);
