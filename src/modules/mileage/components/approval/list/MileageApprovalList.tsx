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

interface OwnOption {
  
}

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
  & OwnOption
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
            month: props.month,
            year: props.year,
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

const createProps: mapper<AllProps, OwnState> = (props: AllProps): OwnState => ({
  shouldUpdate: false,
  isFilterOpen: false,

  // fill partial props from location state to handle redirection from dashboard notif
  status: props.location.state && props.location.state.status,
  isNotify: props.location.state && props.location.state.isNotify
});

const stateUpdaters: StateUpdaters<AllProps, OwnState, OwnStateUpdater> = {
  setShouldUpdate: (prevState: OwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: () => (config: IListConfig<IMileageRequest>) => ({
    config
  }),
  setFilterVisibility: (prevState: OwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: () => (filter: IMileageApprovalListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<AllProps, OwnHandler> = {
  handleFilterVisibility: (props: AllProps) => () => {
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

        if (request && request.filter && request.filter.query && request.filter.query.find) {
          result = request.filter.query.find ? true : false;
        }
    
        return result;
      },

      // action centre
      showActionCentre: true,

      // toolbar controls
      // toolbarControls: () => [
      //   {
      //     icon: AddCircleIcon,
      //     onClick: () => { 
      //       this.props.history.push('/mileage/requests/form'); 
      //     }
      //   }
      // ],

      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean | false) => {
        // when user is set and not loading
        if (user && !isLoading) {
          if (!response || forceReload) {
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
                query: {
                  direction: params.direction,
                  orderBy: params.orderBy,
                  page: params.page,
                  size: params.size,
                  find: params.find,
                  findBy: params.findBy
                },
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