import { IHrCompetencyAssessmentGetAllFilter } from '@hr/classes/filters';
import { ICollectionValue } from '@layout/classes/core';
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

import { HrCompetencyAssessmentFilterView } from './HrCompetencyAssessmentFilterView';

export type IHrCompetencyAssessmentFilterResult = Pick<IHrCompetencyAssessmentGetAllFilter,
  'companyUid' | 'positionUid' | 'assessmentYear'>;

const getYear: number = Number(moment().format('YYYY'));

const yearList: ICollectionValue[] = [
  {value: getYear - 1, name: (getYear - 1).toString() },
  {value: getYear, name: (getYear).toString() },
  {value: getYear + 1, name: (getYear + 1).toString() },
];

interface OwnOption {
  isOpen: boolean;
  initialProps?: IHrCompetencyAssessmentFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IHrCompetencyAssessmentFilterResult) => void;
}

interface OwnState {
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

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;

  // filter year
  setFilterYearVisibility: StateHandler<OwnState>;
  setFilterYear: StateHandler<OwnState>;

  // filter company
  setFilterCompanyVisibility: StateHandler<OwnState>;
  setFilterCompany: StateHandler<OwnState>;

  // filter position
  setFilterPositionVisibility: StateHandler<OwnState>;
  setFilterPosition: StateHandler<OwnState>;
}

interface OwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

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

export type HrCompetencyAssessmentFilterProps
  = OwnOption
  & OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithStyles<typeof styles>
  & WithLookupCompany
  & WithLookupPosition
  & InjectedIntlProps;

const createProps: mapper<HrCompetencyAssessmentFilterProps, OwnState> = (): OwnState => ({
  yearList,
  isFilterYearOpen: false,
  isFilterCompanyOpen: false,
  isFilterPositionOpen: false,
});

const stateUpdaters: StateUpdaters<HrCompetencyAssessmentFilterProps, OwnState, OwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterYear: undefined,
    filterCompany: undefined,
    filterPosition: undefined
  }),

  // filter year
  setFilterYearVisibility: (prevState: OwnState) => () => ({
    isFilterYearOpen: !prevState.isFilterYearOpen
  }),
  setFilterYear: () => (data?: ICollectionValue) => ({
    isFilterYearOpen: false,
    filterYear: data
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: OwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: (prevState: OwnState) => (data?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: data,
    filterPositionValue: {
      companyUid: data && data.uid
    },
    filterPosition: (prevState.filterCompany === data ? prevState.filterPosition : undefined)
  }),

  // filter position
  setFilterPositionVisibility: (prevState: OwnState) => () => ({
    isFilterPositionOpen: !prevState.isFilterPositionOpen
  }),
  setFilterPosition: () => (data?: IPositionList) => ({
    isFilterPositionOpen: false,
    filterPosition: data
  }),
};

const handlerCreators: HandleCreators<HrCompetencyAssessmentFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: HrCompetencyAssessmentFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: HrCompetencyAssessmentFilterProps) => () => {
    props.onApply({
      assessmentYear: props.filterYear && props.filterYear.value,
      companyUid: props.filterCompany && props.filterCompany.uid,
      positionUid: props.filterPosition && props.filterPosition.uid
    });
  },

  // filter year
  handleFilterYearVisibility: (props: HrCompetencyAssessmentFilterProps) => () => {
    props.setFilterYearVisibility();
  },
  handleFilterYearOnSelected: (props: HrCompetencyAssessmentFilterProps) => (data: ICollectionValue) => {
    props.setFilterYear(data);
  },
  handleFilterYearOnClear: (props: HrCompetencyAssessmentFilterProps) => () => {
    props.setFilterYear();
  },
  handleFilterYearOnClose: (props: HrCompetencyAssessmentFilterProps) => () => {
    props.setFilterYearVisibility();
  },

  // filter company
  handleFilterCompanyVisibility: (props: HrCompetencyAssessmentFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: HrCompetencyAssessmentFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: HrCompetencyAssessmentFilterProps) => () => {
    props.setFilterCompany();
    props.setFilterPosition();
  },
  handleFilterCompanyOnClose: (props: HrCompetencyAssessmentFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter position
  handleFilterPositionVisibility: (props: HrCompetencyAssessmentFilterProps) => () => {
    props.setFilterPositionVisibility();
  },
  handleFilterPositionOnSelected: (props: HrCompetencyAssessmentFilterProps) => (data: IPositionList) => {
    props.setFilterPosition(data);
  },
  handleFilterPositionOnClear: (props: HrCompetencyAssessmentFilterProps) => () => {
    props.setFilterPosition();
  },
  handleFilterPositionOnClose: (props: HrCompetencyAssessmentFilterProps) => () => {
    props.setFilterPositionVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyAssessmentFilterProps, OwnState> = {
  componentDidMount() {
    if (this.props.initialProps) {
      const { companyUid, positionUid, assessmentYear } = this.props.initialProps;

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
  }
};

export const HrCompetencyAssessmentFilter = compose<HrCompetencyAssessmentFilterProps, OwnOption>(
  setDisplayName('HrCompetencyAssessmentFilter'),
  withLookupCompany,
  withLookupPosition,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(HrCompetencyAssessmentFilterView);