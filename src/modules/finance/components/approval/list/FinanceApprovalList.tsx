import AppMenu from '@constants/AppMenu';
import { IFinance } from '@finance/classes/response';
import { FinanceField } from '@finance/classes/types';
import { FinanceSummary } from '@finance/components/approval/detail/shared/FinanceSummary';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { CollectionHandler, IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
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

import { FinanceStatusType } from '@common/classes/types';
import { WithFinanceApproval, withFinanceApproval } from '@finance/hoc/withFinanceApproval';
import { FinanceApprovalListFilter, IFinanceApprovalListFilterResult } from './FinanceApprovalListFilter';

interface IOwnOption {
  
}

interface IOwnState extends IFinanceApprovalListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IFinance>;
  isFilterOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setConfig: StateHandler<IOwnState>;
  setShouldUpdate: StateHandler<IOwnState>;
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IFinanceApprovalListFilterResult) => void;
}

type AllProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithFinanceApproval
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage 
        config={props.config} 
        source={props.financeApprovalState.all} 
        loadDataWhen={props.shouldUpdate} 
      >
        <FinanceApprovalListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            moduleType: props.moduleType,
            financeStatusTypes: props.financeStatusTypes,
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  shouldUpdate: false,
  isFilterOpen: false,
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<IFinance>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: IFinanceApprovalListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IFinanceApprovalListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.financeApprovalState.all;
    const { loadAllRequest } = this.props.financeApprovalDispatch;

    const config: IListConfig<IFinance> = {
      // page
      page: {
        uid: AppMenu.FinanceApproval,
      parentUid: AppMenu.Finance,
      title: this.props.intl.formatMessage(financeMessage.approval.page.title),
      description: this.props.intl.formatMessage(financeMessage.approval.page.subTitle)
      },
      
      // top bar
      fields: Object.keys(FinanceField).map(key => ({ 
        value: key, 
        name: FinanceField[key] 
      })),

      // selection
      hasSelection: true,
      notSelectionTypes: [FinanceStatusType.NotPaid, FinanceStatusType.Paid],
      onProcessSelection: (values: string[], callback: CollectionHandler) => {
        this.props.history.push('/finance/approvals/payment', {values});
      },
    
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
      showActionCentre: false,
    
      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean | false) => {
        // when user is set and not loading
        if (user && !isLoading) {
          // when response are empty or force reloading
          if (!response || forceReload) {
            loadAllRequest({
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              filter: {
                moduleType: this.props.moduleType,
                employeeName: undefined,
                start: undefined,
                end: undefined,
                financeStatusTypes: this.props.financeStatusTypes,
                direction: params.direction,
                orderBy: params.orderBy,
                page: params.page,
                size: params.size,
                find: params.find,
                findBy: params.findBy,
              }
            });
          } else {
            // just take data from previous response
            callback.handleResponse(response);
          }
        }
      },
      onBind: (item: IFinance, index: number) => ({
        key: index,
        primary: item.module && item.module.value,
        secondary: item.document.changes.created && item.document.changes.created.fullName || item.document.changes.createdBy,
        tertiary: item.document.amount && item.document.amount.total && this.props.intl.formatNumber(item.document.amount.total, GlobalFormat.CurrencyDefault) || '0',
        quaternary: item.uid,
        quinary: item.status && item.status.value || item.statusType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: IFinance) => ( 
        <FinanceSummary data={item} />
      ),

      // action component
      actionComponent: (item: IFinance, callback: ListHandler) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => this.props.history.push(`/finance/approvals/${item.uid}`)}
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
            return this.props.moduleType !== undefined || 
              this.props.financeStatusTypes !== undefined;
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
      this.props.moduleType !== nextProps.moduleType ||
      this.props.financeStatusTypes !== nextProps.financeStatusTypes
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const FinanceApprovalList = compose(
  setDisplayName('FinanceApprovalList'),
  withUser,
  withFinanceApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);