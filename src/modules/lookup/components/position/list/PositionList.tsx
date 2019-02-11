import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IPosition } from '@lookup/classes/response/position/IPosition';
import { PositionField } from '@lookup/classes/types';
import { PositionSummary } from '@lookup/components/position/detail/shared/PositionSummary';
import { withLookupPosition, WithLookupPosition } from '@lookup/hoc/withLookupPosition';
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
import { IPositionListFilterResult, PositionListFilter } from './PositionListFilter';

interface IOwnOption {

}

interface IOwnState extends IPositionListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IPosition>;
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
  handleFilterApplied: (filter: IPositionListFilterResult) => void;
}

type AllProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & InjectedIntlProps
  & RouteComponentProps
  & IOwnHandler
  & WithUser
  & WithLookupPosition;

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => {
  const { request } = props.lookupPositionState.all;
  const state: IOwnState = {
    shouldUpdate: false,
    isFilterOpen: false,
  };
  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
  state.companyUid = props.location.state.companyUid;
  } else {
    if (request && request.filter) {
      state.companyUid = request.filter.companyUid;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: () => (config: IListConfig<IPosition>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState, props: AllProps) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: IPositionListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IPositionListFilterResult) => {
    props.setFilterApplied(filter);
  }
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.lookupPositionState.all;
    const { loadAllRequest } = this.props.lookupPositionDispatch;
    
    const config: IListConfig<IPosition> = {
      // page info
      page: {
        uid: AppMenu.LookupPosition,
        parentUid: AppMenu.Lookup,
        title: this.props.intl.formatMessage(lookupMessage.position.page.listTitle),
        // description: props.intl.formatMessage(lookupMessage.position.page.listTitle),
        description: '',
      },

      // top bar
      fields: Object.keys(PositionField)
        .map(key => ({
          value: key,
          name: PositionField[key]
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
            this.props.history.push('/lookup/positions/form');
          }
        }
      ],

      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean, resetPage?: boolean) => {
        // when user is set and not loading
        if (user && !isLoading) {
          // when response are empty or force reloading
          if (!request || !response || forceReload) {
            loadAllRequest({
              filter: {
                companyUid: this.props.companyUid,
                find: params.find,
                findBy: params.findBy,
                orderBy: params.orderBy,
                direction: params.direction,
                page: resetPage ? 1 : params.page,
                size: params.size,
              }
            });
          } else {
            // just take data from previous response
            callback.handleResponse(response);
          }
        }
      },
      onBind: (item: IPosition, index: number) => ({
        key: index,
        primary: `${item.uid}` || '',
        secondary: `${item.name}` || '',
        tertiary: `${item.company && item.company.name}` || '',
        quaternary: item.isAllowMultiple ?
          this.props.intl.formatMessage(lookupMessage.position.field.isAllowed) :
          this.props.intl.formatMessage(lookupMessage.position.field.isNotAllowed)
        ,
        quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: IPosition) => (
        <PositionSummary data={item} />
      ),

      // action component
      actionComponent: (item: IPosition) => (
        <React.Fragment>
          <Button
            size="small"
            onClick={() => this.props.history.push('/lookup/positions/form', { companyUid: item.companyUid, uid: item.uid })}
          >
            <FormattedMessage {...layoutMessage.action.modify} />
          </Button>
          <Button
            size="small"
            onClick={() => this.props.history.push(`/lookup/positions/${item.companyUid}/${item.uid}`)}
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
        source={props.lookupPositionState.all}
        loadDataWhen={props.shouldUpdate}
      >
      <PositionListFilter
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

export const PositionList = compose<AllProps, IOwnOption>(
  setDisplayName('LookupPositionList'),
  withRouter,
  withUser,
  injectIntl,
  withLookupPosition,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);