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
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { IPositionListFilterResult } from './PositionListFilter';

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
  & InjectedIntlProps
  & WithLookupPosition;

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  shouldUpdate: false, 
  isFilterOpen: false,
  companyUid: props.location.state && props.location.state.companyUid,
});

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
            this.props.history.push('/lookup/currencies/form');
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
    };
    this.props.setConfig(config);
  },
  componentDidUpdate(nextProps: AllProps) {
    // track any changes in filter props
      this.props.setShouldUpdate();
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
      </ListPage>
    }
  </React.Fragment>
);

export const PositionList = compose<AllProps, IOwnOption>(
  setDisplayName('LookupPositionList'),
  withRouter,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withLookupPosition,
  lifecycle(lifecycles)
)(listView);