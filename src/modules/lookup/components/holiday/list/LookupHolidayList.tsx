import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupHoliday } from '@lookup/classes/response/holiday/ILookupHoliday';
import { LookupHolidayField } from '@lookup/classes/types';
import { LookupHolidaySummary } from '@lookup/components/holiday/detail/shared/LookupHolidaySummary';
import { withLookupHoliday, WithLookupHoliday } from '@lookup/hoc/withLookupHoliday';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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
  withStateHandlers 
} from 'recompose';
import { ILookupHolidayListFilterResult, LookupHolidayListFilter } from './LookupHolidayListFilter';

interface IOwnOption {

}

interface IOwnState extends ILookupHolidayListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<ILookupHoliday>;
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
  handleFilterApplied: (filter: ILookupHolidayListFilterResult) => void;
}

type AllProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & InjectedIntlProps
  & RouteComponentProps
  & IOwnHandler
  & WithUser
  & WithLookupHoliday;

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  shouldUpdate: false, 
  isFilterOpen: false,
  companyUid: props.location.state && props.location.state.companyUid,
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: () => (config: IListConfig<ILookupHoliday>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState, props: AllProps) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: ILookupHolidayListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ILookupHolidayListFilterResult) => {
    props.setFilterApplied(filter);
  }
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.lookupHolidayState.all;
    const { loadAllRequest } = this.props.lookupHolidayDispatch;
    
    const config: IListConfig<ILookupHoliday> = {
      // page info
      page: {
        uid: AppMenu.LookupHoliday,
        parentUid: AppMenu.Lookup,
        title: this.props.intl.formatMessage(lookupMessage.holiday.page.listTitle),
        // description: props.intl.formatMessage(lookupMessage.holiday.page.listTitle),
        description: '',
      },

      // top bar
      fields: Object.keys(LookupHolidayField)
        .map(key => ({
          value: key,
          name: LookupHolidayField[key]
        })),

      // searching
      hasSearching: true,
      searchStatus: () => {
        let result: boolean = false;

        if (request && request.filter && request.filter.find) {
          result = request.filter.find ? true : false;
        }

        return result;
      },

      // action centre
      showActionCentre: false,
      // toolbar controls
      toolbarControls: () => [
        {
          icon: AddCircleIcon,
          onClick: () => {
            this.props.history.push('/lookup/holiday/form');
          }
        }
      ],

      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean | false) => {
        // when user is set and not loading
        if (user && !isLoading) {
          // when response are empty or force reloading
          if (!response || forceReload) {
            loadAllRequest({
              filter: {
                companyUid: this.props.companyUid,
                find: params.find,
                findBy: params.findBy,
                orderBy: params.orderBy,
                direction: params.direction,
                page: params.page,
                size: params.size,
              }
            });
          } else {
            // just take data from previous response
            callback.handleResponse(response);
          }
        }
      },
      onBind: (item: ILookupHoliday, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.company ? item.company.name : 'N/A',
        tertiary: item.description ? item.description : 'N/A',
        quaternary: item.date.toString(),
        quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName || '?',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: ILookupHoliday) => (
        <LookupHolidaySummary data={item} />
      ),

      // action component
      actionComponent: (item: ILookupHoliday) => (
        <React.Fragment>
          <Button
            size="small"
            onClick={() => this.props.history.push('/lookup/holidays/form', { companyUid: item.companyUid, uid: item.uid })}
          >
            <FormattedMessage {...layoutMessage.action.modify} />
          </Button>
          <Button
            size="small"
            onClick={() => this.props.history.push(`/lookup/holidays/${item.companyUid}/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details} />
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
            return this.props.companyUid !== undefined;
          },
          onClick: this.props.handleFilterVisibility
        }
      ]
    };
    this.props.setConfig(config);
  },
  componentDidUpdate(nextProps: AllProps) {
    if (
      this.props.companyUid !== nextProps.companyUid
    ) {
      this.props.setShouldUpdate();
    }
  }
};

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.lookupHolidayState.all}
        loadDataWhen={props.shouldUpdate}
      >
      <LookupHolidayListFilter
          isOpen={props.isFilterOpen}
          initialProps={{
            companyUid: props.companyUid,
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
      
    }
  </React.Fragment>
);

export const LookupHolidayList = compose<AllProps, IOwnOption>(
  setDisplayName('LookupHolidayList'),
  withRouter,
  withUser,
  injectIntl,
  withLookupHoliday,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);