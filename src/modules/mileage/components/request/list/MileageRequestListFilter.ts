import { ISystemList } from '@common/classes/response';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithStyles, withStyles } from '@material-ui/core';
import { IMileageRequestGetAllFilter } from '@mileage/classes/filters';
import styles from '@styles';
import * as moment from 'moment';
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
import { MileageRequestListFilterView } from './MileageRequestListFilterView';

const getYear: number = Number(moment().format('YYYY'));

const yearList: ICollectionValue[] = [
  {value: getYear - 1, name: (getYear - 1).toString() },
  {value: getYear, name: (getYear).toString() },
  {value: getYear + 1, name: (getYear + 1).toString() },
];

const monthList: ICollectionValue[] = [];

moment.months().map((item, i) => (
  monthList.push({value: i + 1, name: item.toString()})
  )
);

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
];

export type IMileageRequestListFilterResult = Pick<IMileageRequestGetAllFilter, 
'month' | 'year' | 'isRejected' | 'statusType' | 'status'>;

interface OwnOption {
  isOpen: boolean;
  initialProps?: IMileageRequestListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IMileageRequestListFilterResult) => void;
}

interface OwnState {
  completionStatus: ICollectionValue[];

  monthList: ICollectionValue[];

  yearList: ICollectionValue[];

  // filter month
  isFilterMonthOpen: boolean;
  filterMonth?: ICollectionValue;

  // filter year
  isFilterYearOpen: boolean;
  filterYear?: ICollectionValue;

  // filter status
  isFilterStatusOpen: boolean;
  filterStatus?: ISystemList;

  // filter completion
  isFilterCompletionOpen: boolean;
  filterCompletion?: ICollectionValue;

  // filter rejected
  filterRejected?: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;

  // filter month
  setFilterMonthVisibility: StateHandler<OwnState>;
  setFilterMonth: StateHandler<OwnState>;

  // filter year
  setFilterYearVisibility: StateHandler<OwnState>;
  setFilterYear: StateHandler<OwnState>;

  // filter status
  setFilterStatusVisibility: StateHandler<OwnState>;
  setFilterStatus: StateHandler<OwnState>;

  // filter completion
  setFilterCompletionVisibility: StateHandler<OwnState>;
  setFilterCompletion: StateHandler<OwnState>;

  // filter rejected
  setFilterRejected: StateHandler<OwnState>;
}

interface OwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter month
  handleFilterMonthVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterMonthOnSelected: (data: ICollectionValue) => void;
  handleFilterMonthOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterMonthOnClose: () => void;

  // filter year
  handleFilterYearVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterYearOnSelected: (data: ICollectionValue) => void;
  handleFilterYearOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterYearOnClose: () => void;

  // filter status
  handleFilterStatusVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStatusOnSelected: (data: ISystemList) => void;
  handleFilterStatusOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStatusOnClose: () => void;

  // filter completion
  handleFilterCompletionVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnSelected: (data: ICollectionValue) => void;
  handleFilterCompletionOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnClose: () => void;

  // filter rejected
  handleFilterRejectedOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type MileageRequestListFilterProps
  = OwnOption
  & OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<MileageRequestListFilterProps, OwnState> = (props: MileageRequestListFilterProps): OwnState => ({
  monthList,
  yearList,
  completionStatus,
  isFilterMonthOpen: false,
  isFilterYearOpen: false,
  isFilterStatusOpen: false,
  isFilterCompletionOpen: false,

  // pass initial value for primitive types only, bellow is 'boolean'
  filterRejected: props.initialProps && props.initialProps.isRejected
});

const stateUpdaters: StateUpdaters<MileageRequestListFilterProps, OwnState, OwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterMonth: undefined,
    filterYear: undefined,
    filterStatus: undefined,
    filterCompletion: undefined,
    filterRejected: undefined
  }),

  // filter month
  setFilterMonthVisibility: (prevState: OwnState) => () => ({
    isFilterMonthOpen: !prevState.isFilterMonthOpen
  }),
  setFilterMonth: () => (data?: ICollectionValue) => ({
    isFilterMonthOpen: false,
    filterMonth: data
  }),

  // filter year
  setFilterYearVisibility: (prevState: OwnState) => () => ({
    isFilterYearOpen: !prevState.isFilterYearOpen
  }),
  setFilterYear: () => (data?: ICollectionValue) => ({
    isFilterYearOpen: false,
    filterYear: data
  }),

  // filter status
  setFilterStatusVisibility: (prevState: OwnState) => () => ({
    isFilterStatusOpen: !prevState.isFilterStatusOpen
  }),
  setFilterStatus: () => (data?: ISystemList) => ({
    isFilterStatusOpen: false,
    filterStatus: data
  }),

  // filter completion
  setFilterCompletionVisibility: (prevState: OwnState) => () => ({
    isFilterCompletionOpen: !prevState.isFilterCompletionOpen
  }),
  setFilterCompletion: (prevState: OwnState) => (data?: ICollectionValue) => ({
    isFilterCompletionOpen: false,
    filterCompletion: data
  }),

  // filter rejected
  setFilterRejected: () => (checked: boolean) => ({
    filterRejected: checked
  }),
};

const handlerCreators: HandleCreators<MileageRequestListFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: MileageRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: MileageRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      month: props.filterMonth && props.filterMonth.value,
      year: props.filterYear && props.filterYear.value,
      statusType: props.filterStatus && props.filterStatus.type,
      status: props.filterCompletion && props.filterCompletion.value,
      isRejected: props.filterRejected
    });
  },

  // filter month
  handleFilterMonthVisibility: (props: MileageRequestListFilterProps) => () => {
    props.setFilterMonthVisibility();
  },
  handleFilterMonthOnSelected: (props: MileageRequestListFilterProps) => (data: ICollectionValue) => {
    props.setFilterMonth(data);
  },
  handleFilterMonthOnClear: (props: MileageRequestListFilterProps) => () => {
    props.setFilterMonth();
  },
  handleFilterMonthOnClose: (props: MileageRequestListFilterProps) => () => {
    props.setFilterMonthVisibility();
  },
  
  // filter year
  handleFilterYearVisibility: (props: MileageRequestListFilterProps) => () => {
    props.setFilterYearVisibility();
  },
  handleFilterYearOnSelected: (props: MileageRequestListFilterProps) => (data: ICollectionValue) => {
    props.setFilterYear(data);
  },
  handleFilterYearOnClear: (props: MileageRequestListFilterProps) => () => {
    props.setFilterYear();
  },
  handleFilterYearOnClose: (props: MileageRequestListFilterProps) => () => {
    props.setFilterYearVisibility();
  },
  
  // filter status
  handleFilterStatusVisibility: (props: MileageRequestListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: MileageRequestListFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: MileageRequestListFilterProps) => () => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: MileageRequestListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: MileageRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: MileageRequestListFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: MileageRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion();
  },
  handleFilterCompletionOnClose: (props: MileageRequestListFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },

  // filter rejected
  handleFilterRejectedOnChange: (props: MileageRequestListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterRejected(checked);
  },
};

export const MileageRequestListFilter = compose<MileageRequestListFilterProps, OwnOption>(
  setDisplayName('MileageRequestListFilter'),
  withLayout,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(MileageRequestListFilterView);