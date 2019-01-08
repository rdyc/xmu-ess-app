import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ICompany } from '@lookup/classes/response';
import { CompanyField } from '@lookup/classes/types';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { LookupCompanySumarry } from '../detail/shared/LookupCompanySummary';

interface IOwnState {
  shouldUpdate: boolean;
  config?: IListConfig<ICompany>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setConfig: StateHandler<IOwnState>;
  setShouldUpdate: StateHandler<IOwnState>;
}

type AllProps
  = IOwnState
  & IOwnStateUpdater
  & WithUser
  & WithLookupCompany
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.lookupCompanyState.all}
        loadDataWhen={props.shouldUpdate}
      />
    }
  </React.Fragment>
);

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  shouldUpdate: false,
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, {}> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<ICompany>) => ({
    config
  })
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.lookupCompanyState.all;
    const { loadAllRequest } = this.props.lookupCompanyDispatch;

    const config: IListConfig<ICompany> = {
      // page
      page: {
        uid: AppMenu.LookupCompany,
        parentUid: AppMenu.Lookup,
        title: this.props.intl.formatMessage(lookupMessage.company.page.listTitle),
        description: this.props.intl.formatMessage(lookupMessage.company.page.listSubHeader)
      },

      // top bar
      fields: Object.keys(CompanyField)
        .map(key => ({
          value: key,
          name: CompanyField[key]
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
            this.props.history.push('/lookup/company/form');
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
      onBind: (item: ICompany, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.code,
        tertiary: item.name,
        quaternary: '',
        quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: ICompany) => (
        <LookupCompanySumarry data={item} />
      ),

      // action component
      actionComponent: (item: ICompany, callback: ListHandler) => (
        <React.Fragment>
          <Button
            size="small"
            onClick={() => this.props.history.push(`/lookup/company/form`, { uid: item.uid })}
          >
            <FormattedMessage {...layoutMessage.action.modify} />
          </Button>

          <Button
            size="small"
            onClick={() => this.props.history.push(`/lookup/company/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details} />
          </Button>
        </React.Fragment>
      )
    };
    this.props.setConfig(config);
  }
};

export const LookupCompanyList = compose(
  setDisplayName('LookupCompanyList'),
  withUser,
  withLookupCompany,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifecycles)
)(listView);