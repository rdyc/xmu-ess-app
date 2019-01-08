import { ISystem } from '@common/classes/response';
import { CommonCategory, CommonField } from '@common/classes/types';
import { CommonSummary } from '@common/components/detail/shared/CommonSummary';
import { categoryTypeTranslator } from '@common/helper';
import { withCommonSystem, WithCommonSystem } from '@common/hoc/withCommonSystem';
import { commonMessage } from '@common/locales/messages/commonMessage';
import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
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
  withStateHandlers
} from 'recompose';
import { CommonListFilter, ICommonListFilterResult } from './CommonListFilter';

interface IOwnOption {
  
}

interface IOwnState extends ICommonListFilterResult  {
  shouldUpdate: boolean;
  config?: IListConfig<ISystem>;
  isFilterOpen: boolean;
}

interface OwnRouteParams {
  category: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setConfig: StateHandler<IOwnState>;
  setShouldUpdate: StateHandler<IOwnState>;
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ICommonListFilterResult) => void;
}

type AllProps 
  = WithUser
  & IOwnStateUpdater
  & IOwnOption
  & IOwnState
  & WithCommonSystem
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

const commonListView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.commonSystemState.all}
        loadDataWhen={props.shouldUpdate}
      >
        <CommonListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            companyUid: props.companyUid
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
  setConfig: (prevState: IOwnState) => (config: IListConfig<ISystem>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: ICommonListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ICommonListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.commonSystemState.all;
    const { systemAllRequest } = this.props.commonDispatch;

    const config: IListConfig<ISystem> = {
      // page info
      page: {
        uid: AppMenu.Common,
        parentUid: AppMenu.Lookup,
        title: `${this.props.intl.formatMessage(commonMessage.system.page.title)} ${CommonCategory[this.props.match.params.category]}`,
        description: this.props.intl.formatMessage(commonMessage.system.page.subTitle),
      },
      
      // top bar
      fields: Object.keys(CommonField).map(key => ({ 
        value: key, 
        name: CommonField[key] 
      })),

      // selection
      hasSelection: false,

      // nav back?
      hasNavBack: true,

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
            systemAllRequest({
              category: categoryTypeTranslator(this.props.match.params.category),
              filter: {
                companyUid: this.props.companyUid,
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
      onBind: (item: ISystem, index: number) => ({
        key: item.id,
        primary: item.type,
        secondary: item.name,
        tertiary: item.description && item.description || 'N/A',
        quaternary: item.isActive ? this.props.intl.formatMessage(layoutMessage.text.active) : this.props.intl.formatMessage(layoutMessage.text.inactive),
        quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName || '?',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: ISystem) => ( 
        <CommonSummary 
          data={item}
          category={this.props.match.params.category}
        />
      ),

      // action component
      actionComponent: (item: ISystem, callback: ListHandler) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => this.props.history.push(`/common/system/${this.props.match.params.category}/form`, { id: item.id })}
          >
            <FormattedMessage {...layoutMessage.action.modify}/>
          </Button>

          <Button 
            size="small"
            onClick={() => this.props.history.push(`/common/system/${this.props.match.params.category}/${item.id}`)}
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
            return this.props.companyUid !== undefined ;
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
      this.props.companyUid !== nextProps.companyUid 
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const CommonListView = compose(
  setDisplayName('CommonList'),
  withUser,
  withCommonSystem,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(commonListView);