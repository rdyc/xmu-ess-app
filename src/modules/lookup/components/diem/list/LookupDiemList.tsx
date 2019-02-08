import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IDiem } from '@lookup/classes/response';
import { LookupDiemField } from '@lookup/classes/types/diem/DiemField';
import { WithLookupDiem, withLookupDiem } from '@lookup/hoc/withLookupDiem';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TuneIcon from '@material-ui/icons/Tune';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupDiemSummary } from '../detail/shared/LookupDiemSummary';
import { ILookupDiemListFilterResult, LookupDiemListFilter } from './LookupDiemListFilter';

interface IOwnOption {

}

interface IOwnState extends ILookupDiemListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IDiem>;
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
  handleFilterApplied: (filter: ILookupDiemListFilterResult) => void;
}

type AllProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupDiem
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.lookupDiemState.all}
        loadDataWhen={props.shouldUpdate}
      >
        <LookupDiemListFilter
          isOpen={props.isFilterOpen}
          initialProps={{
            projectType: props.projectType,
            destinationType: props.destinationType,
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => {
  const { request } = props.lookupDiemState.all;

  // default state
  const state: IOwnState = {
    shouldUpdate: false,
    isFilterOpen: false
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.projectType = request.filter.projectType,
    state.destinationType = request.filter.destinationType;
  }

  return state;
};

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldUpdate: !state.shouldUpdate
  }),
  setConfig: (state: IOwnState) => (config: IListConfig<IDiem>): Partial<IOwnState> => ({
    config
  }),
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILookupDiemListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ILookupDiemListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.lookupDiemState.all;
    const { loadAllRequest } = this.props.lookupDiemDispatch;

    const config: IListConfig<IDiem> = {
      // page
      page: {
        uid: AppMenu.LookupDiem,
        parentUid: AppMenu.Lookup,
        title: this.props.intl.formatMessage(lookupMessage.lookupDiem.page.listTitle),
        description: this.props.intl.formatMessage(lookupMessage.lookupDiem.page.listSubHeader)
      },

      // top bar
      fields: Object.keys(LookupDiemField)
        .map(key => ({
          value: key,
          name: LookupDiemField[key]
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
      showActionCentre: false,

      // toolbar controls
      toolbarControls: (callback: ListHandler) => [
        {
          icon: AddCircleIcon,
          onClick: () => {
            this.props.history.push('/lookup/diemValue/form');
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
                projectType: this.props.projectType,
                destinationType: this.props.destinationType,
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
      onBind: (item: IDiem, index: number) => ({
        key: index,
        primary: item.company && item.company.name || item.companyUid,
        secondary: item.project && item.project.value || item.projectType,
        tertiary: item.destination && item.destination.value || item.destinationType,
        quaternary: this.props.intl.formatNumber(item.value),
        quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: IDiem) => (
        <LookupDiemSummary data={item} />
      ),

      // action component
      actionComponent: (item: IDiem, callback: ListHandler) => (
        <React.Fragment>
          {
            <Button
              size="small"
              onClick={() => this.props.history.push(`/lookup/diemvalue/form`, { uid: item.uid, company: item.companyUid })}
            >
              <FormattedMessage {...layoutMessage.action.modify} />
            </Button>
          }

          <Button
            size="small"
            onClick={() => this.props.history.push(`/lookup/diemvalue/${item.uid}`, { company: item.companyUid })}
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
            return this.props.projectType !== undefined ||
              this.props.destinationType !== undefined;
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
      this.props.projectType !== nextProps.projectType ||
      this.props.destinationType !== nextProps.destinationType
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const LookupDiemList = compose(
  setDisplayName('ProjectRegistrationList'),
  withUser,
  withLookupDiem,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);
