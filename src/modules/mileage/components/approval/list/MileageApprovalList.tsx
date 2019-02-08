import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
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

import { IMileageRequest } from '@mileage/classes/response';
import { MileageRequestField } from '@mileage/classes/types';
import { MileageSummary } from '@mileage/components/request/shared/MileageSummary';
import { withMileageApproval, WithMileageApproval } from '@mileage/hoc/withMileageApproval';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { IMileageApprovalListFilterResult, MileageApprovalListFilter } from './MileageApprovalListFilter';

interface OwnState extends IMileageApprovalListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IMileageRequest>;
  isFilterOpen: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setConfig: StateHandler<OwnState>;
  setShouldUpdate: StateHandler<OwnState>;
  setFilterVisibility: StateHandler<OwnState>;
  setFilterApplied: StateHandler<OwnState>;
}

interface OwnHandler {
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: any) => void;
}

type AllProps
  = OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithUser
  & WithMileageApproval
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.mileageApprovalState.all}
        loadDataWhen={props.shouldUpdate}
      >
        <MileageApprovalListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            employeeUid: props.employeeUid,
            year: props.year,
            month: props.month,
            statusType: props.statusType,
            status: props.status,
            isNotify: props.isNotify
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);

const createProps: mapper<AllProps, OwnState> = (props: AllProps): OwnState => {
  const { request } = props.mileageApprovalState.all;

  const state: OwnState = {
    shouldUpdate: false,
    isFilterOpen: false
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.isNotify = props.location.state.isNotify;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.year = request.filter.year,
      state.month = request.filter.month,
      state.statusType = request.filter.statusType,
      state.status = request.filter.status,
      state.isNotify = request.filter.isNotify;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<AllProps, OwnState, OwnStateUpdater> = {
  setShouldUpdate: (prevState: OwnState) => (): Partial<OwnState> => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: () => (config: IListConfig<IMileageRequest>): Partial<OwnState> => ({
    config
  }),
  setFilterVisibility: (prevState: OwnState) => (): Partial<OwnState> => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: () => (filter: IMileageApprovalListFilterResult): Partial<OwnState> => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<AllProps, OwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IMileageApprovalListFilterResult) => {
    props.setFilterApplied(filter);
  }
};

const lifecycles: ReactLifeCycleFunctions<AllProps, OwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.mileageApprovalState.all;
    const { loadAllRequest } = this.props.mileageApprovalDispatch;

    const config: IListConfig<IMileageRequest> = {
      // page
      page: {
        uid: AppMenu.MileageApproval,
        parentUid: AppMenu.Mileage,
        title: this.props.intl.formatMessage(mileageMessage.approval.page.listTitle),
        description: this.props.intl.formatMessage(mileageMessage.approval.page.listSubHeader),
      },

      // top bar
      fields: Object.keys(MileageRequestField).map(key => ({
        value: key,
        name: MileageRequestField[key]
      })),

      // searching
      hasSearching: true,
      searchStatus: (): boolean => {
        let result: boolean = false;

        if (request && request.filter && request.filter.find) {
          result = request.filter.find ? true : false;
        }
    
        return result;
      },

      // action centre
      showActionCentre: true,

      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean, resetPage?: boolean) => {
        // when user is set and not loading
        if (user && !isLoading) {
          // when request, response are empty and or force reloading
          if (!request || !response || forceReload) {
            loadAllRequest({
              filter: {
                companyUid: user.company.uid,
                positionUid: user.position.uid,
                employeeUid: this.props.employeeUid,
                month: this.props.month,
                year: this.props.year,
                statusType: this.props.statusType,
                status: this.props.status,
                isNotify: this.props.isNotify,
                direction: params.direction,
                orderBy: params.orderBy,
                page: resetPage ? 1 : params.page,
                size: params.size,
                find: params.find,
                findBy: params.findBy
              }
            });
          } else {
            // just take data from previous response
            callback.handleResponse(response);
          }
        }
      },
      onBind: (item: IMileageRequest, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: this.props.intl.formatDate(new Date(item.year, item.month - 1), GlobalFormat.MonthYear),
        tertiary: item.employee && item.employee.fullName || item.employeeUid,
        quaternary: this.props.intl.formatNumber(item.amount, GlobalFormat.CurrencyDefault),
        quinary: item.status && item.status.value || item.statusType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    
      }),

      // summary component
      summaryComponent: (item: IMileageRequest) => ( 
        <MileageSummary data={item} />
      ),

      // action component
      actionComponent: (item: IMileageRequest) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => this.props.history.push(`/mileage/approvals/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details}/>
          </Button>
        </React.Fragment>
      ),

      // additional controls
      additionalControls: [
        {
          id: 'option-filter',
          title: this.props.intl.formatMessage(layoutMessage.tooltip.filter),
          icon: TuneIcon,
          showBadgeWhen: () => {
            return this.props.employeeUid !== undefined ||
              this.props.year !== undefined ||
              this.props.month !== undefined ||
              this.props.statusType !== undefined ||
              this.props.status !== undefined ||
              this.props.isNotify === true;
          },
          onClick: this.props.handleFilterVisibility
        }
      ]
    };

    this.props.setConfig(config);
  },
  componentDidUpdate(nextProps: AllProps) {
    // track any changes in filter props
    if (
      this.props.employeeUid !== nextProps.employeeUid ||
      this.props.year !== nextProps.year ||
      this.props.month !== nextProps.month ||
      this.props.statusType !== nextProps.statusType ||
      this.props.status !== nextProps.status ||
      this.props.isNotify !== nextProps.isNotify
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const MileageApprovalList = compose(
  setDisplayName('MileageApprovalList'),
  withUser,
  withMileageApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);