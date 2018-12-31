import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
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
  withStateHandlers,
} from 'recompose';

import { IMileageException } from '@lookup/classes/response';
import { MileageExceptionField } from '@lookup/classes/types';
import { WithLookupMileageException, withLookupMileageException } from '@lookup/hoc/withLookupMileageException';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { ILookupMileageExceptionFilterResult, LookupMileageExceptionFilter } from './LookupMileageExceptionFilter';
import { LookupMileageExceptionSummary } from './LookupMileageExceptionSummary';

interface OwnOption {
  
}

interface OwnState extends ILookupMileageExceptionFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IMileageException>;
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
  & WithLookupMileageException
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
  {
    props.config &&
    <ListPage
      config={props.config}
      source={props.mileageExceptionState.all}
      loadDataWhen={props.shouldUpdate}
    >
      <LookupMileageExceptionFilter
        isOpen={props.isFilterOpen}
        initialProps={{
          companyUid: props.companyUid,
          roleUid: props.roleUid
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
});

const stateUpdaters: StateUpdaters<AllProps, OwnState, OwnStateUpdater> = {
  setShouldUpdate: (prevState: OwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  
  setConfig: () => (config: IListConfig<IMileageException>) => ({
    config
  }),
  setFilterVisibility: (prevState: OwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: () => (filter: ILookupMileageExceptionFilterResult) => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<AllProps, OwnHandler> = {
  handleFilterVisibility: (props: AllProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ILookupMileageExceptionFilterResult) => {
    props.setFilterApplied(filter);
  }
};

const lifecycles: ReactLifeCycleFunctions<AllProps, OwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.mileageExceptionState.all;
    const { loadAllRequest } = this.props.mileageExceptionDispatch;

    const config: IListConfig<IMileageException> = {
      // page
      page: {
        uid: AppMenu.LookupMileageException,
        parentUid: AppMenu.Lookup,
        title: this.props.intl.formatMessage(lookupMessage.mileageException.page.listTitle),
        description: this.props.intl.formatMessage(lookupMessage.mileageException.page.listSubHeader),
      },

      // top bar
      fields: Object.keys(MileageExceptionField).map(key => ({
        value: key,
        name: MileageExceptionField[key]
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

      // toolbar controls
      toolbarControls: () => [
        {
          icon: AddCircleIcon,
          onClick: () => { 
            this.props.history.push('/lookup/mileageexceptions/form'); 
          }
        }
      ],

      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean | false) => {
        // when user is set and not loading
        if (user && !isLoading) {
          if (!response || forceReload) {
            loadAllRequest({
              filter: {
                companyUid: this.props.companyUid,
                roleUid: this.props.companyUid ? this.props.roleUid : undefined,
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
      onBind: (item: IMileageException, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.role && item.role.company && item.role.company.name,
        tertiary: item.role.name,
        quaternary: item.reason ? item.reason : 'N/A',
        quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
    
      }),

      // summary component
      summaryComponent: (item: IMileageException) => ( 
        <LookupMileageExceptionSummary data={item} />
      ),

      // action component
      actionComponent: (item: IMileageException) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => this.props.history.push(`/lookup/mileageexceptions/${item.uid}`)}
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
            return this.props.companyUid !== undefined || this.props.roleUid !== undefined;
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
      this.props.companyUid !== nextProps.companyUid ||
      this.props.roleUid !== nextProps.roleUid
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const LookupMileageExceptionList = compose(
  setDisplayName('LookupMileageExceptionList'),
  withUser,
  withLookupMileageException,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);