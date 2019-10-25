import { IHrCompetencyMappedGetAllFilter } from '@hr/classes/filters';
import { ILookupCompany } from '@lookup/classes';
import { IPositionGetListFilter } from '@lookup/classes/filters';
import { IPositionList } from '@lookup/classes/response';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithLookupPosition, withLookupPosition } from '@lookup/hoc/withLookupPosition';
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

import { HrCompetencyMappedFilterView } from './HrCompetencyMappedFilterView';

export type IHrCompetencyMappedFilterResult = Pick<IHrCompetencyMappedGetAllFilter,
  'companyUid' | 'positionUid'>;

interface OwnOption {
  isOpen: boolean;
  initialProps?: IHrCompetencyMappedFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IHrCompetencyMappedFilterResult) => void;
}

interface OwnState {
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

export type HrCompetencyMappedFilterProps
  = OwnOption
  & OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithStyles<typeof styles>
  & WithLookupCompany
  & WithLookupPosition
  & InjectedIntlProps;

const createProps: mapper<HrCompetencyMappedFilterProps, OwnState> = (): OwnState => ({
  isFilterCompanyOpen: false,
  isFilterPositionOpen: false,
});

const stateUpdaters: StateUpdaters<HrCompetencyMappedFilterProps, OwnState, OwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterCompany: undefined,
    filterPosition: undefined
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

const handlerCreators: HandleCreators<HrCompetencyMappedFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: HrCompetencyMappedFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: HrCompetencyMappedFilterProps) => () => {
    props.onApply({
      companyUid: props.filterCompany && props.filterCompany.uid,
      positionUid: props.filterPosition && props.filterPosition.uid
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: HrCompetencyMappedFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: HrCompetencyMappedFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: HrCompetencyMappedFilterProps) => () => {
    props.setFilterCompany();
    props.setFilterPosition();
  },
  handleFilterCompanyOnClose: (props: HrCompetencyMappedFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter position
  handleFilterPositionVisibility: (props: HrCompetencyMappedFilterProps) => () => {
    props.setFilterPositionVisibility();
  },
  handleFilterPositionOnSelected: (props: HrCompetencyMappedFilterProps) => (data: IPositionList) => {
    props.setFilterPosition(data);
  },
  handleFilterPositionOnClear: (props: HrCompetencyMappedFilterProps) => () => {
    props.setFilterPosition();
  },
  handleFilterPositionOnClose: (props: HrCompetencyMappedFilterProps) => () => {
    props.setFilterPositionVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyMappedFilterProps, OwnState> = {
  componentDidMount() {
    if (this.props.initialProps) {
      const { companyUid, positionUid } = this.props.initialProps;

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

export const HrCompetencyMappedFilter = compose<HrCompetencyMappedFilterProps, OwnOption>(
  setDisplayName('HrCompetencyMappedFilter'),
  withLookupCompany,
  withLookupPosition,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(HrCompetencyMappedFilterView);