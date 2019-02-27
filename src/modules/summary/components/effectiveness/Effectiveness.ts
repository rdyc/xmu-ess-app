import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { EffectivenessView } from '@summary/components/effectiveness/EffectivenessView';
import { WithSummary, withSummary } from '@summary/hoc/withSummary';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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
import { IEffectivenessFilterResult } from './EffectivenessFilter';

interface OwnHandlers {
  handleChangeFilter: (filter: IEffectivenessFilterResult) => void;
  handleReloadData: () => void;
}

interface OwnOptions {
}

interface OwnState extends IEffectivenessFilterResult {
  reloadData: boolean;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
  setFilterApplied: StateHandler<OwnState>;
}

export type EffectivenessProps 
  = WithSummary
  & WithOidc
  & WithWidth
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & WithStyles<typeof styles>
  & OwnStateUpdaters;

const createProps: mapper<EffectivenessProps, OwnState> = (props: EffectivenessProps): OwnState => {
    return { 
      reloadData: false,
    };
  };

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setFilterApplied: (prevState: OwnState) => (filter: IEffectivenessFilterResult) => ({
    ...filter
  }),
};

const handlerCreators: HandleCreators<EffectivenessProps, OwnHandlers> = {
  handleChangeFilter: (props: EffectivenessProps) => (filter: IEffectivenessFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleReloadData: (props: EffectivenessProps) => () => {
    props.stateUpdate({
      reloadData: true,
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<EffectivenessProps, OwnState> = {
    componentDidMount() { 
      const { intl, stateUpdate } = this.props;
      const { isLoading, response } = this.props.summaryState.effectiveness;

      // checking admin status
      const { user: oidc } = this.props.oidcState;
      let result: boolean = false;
      if (oidc) {
        const role: string | string[] | undefined = oidc.profile.role;

        if (role) {
          if (Array.isArray(role)) {
            result = role.indexOf(AppRole.Admin) !== -1;
          } else {
            result = role === AppRole.Admin;
          }
        }

        if (result) {
          stateUpdate({ 
            isAdmin: true
          });
        }
      }
  
      this.props.masterPage.changePage({
        uid: AppMenu.ReportEffectiveness,
        parentUid: AppMenu.Report,
        title: intl.formatMessage(summaryMessage.effectiveness.page.title),
      });
    
      // only load data when response are empty
      if (!isLoading && !response) {
        loadData(this.props);
      }
    },
    componentWillUpdate(props: EffectivenessProps, state: OwnState) {
      if (this.props.employeeUid !== props.employeeUid ||
          this.props.projectUid !== props.projectUid) {
            loadData(props);
          }
      if (props.reloadData) {
        loadData(props);

        props.stateUpdate({
          reloadData: false,
        });
      }
    },
    componentWillUnmount() {
      const { view } = this.props.layoutState;
      const { loadEffectivenessDispose } = this.props.summaryDispatch;
  
      // dispose 'get all' from 'redux store' when the page is 'out of project registration' context 
      if (view && view.uid !== AppMenu.ReportEffectiveness) {
        loadEffectivenessDispose();
      }
    }
  };

const loadData = (props: EffectivenessProps): void => {
    const { user } = props.userState;
    const { loadEffectivenessRequest } = props.summaryDispatch;
    const { alertAdd } = props.layoutDispatch;

    if (user) {
      loadEffectivenessRequest({
        filter: {
          employeeUid: props.employeeUid,
          projectUid: props.projectUid,
        }
      }); 
    } else {
      alertAdd({
        time: new Date(),
        message: 'Unable to find current user state'
      });
    }
  };

export const Effectiveness = compose<EffectivenessProps, OwnOptions>(
    setDisplayName('SummaryEffectiveness'),
    withOidc,
    withSummary,
    withUser,
    withLayout,
    withMasterPage,
    withRouter,
    injectIntl,
    withWidth(),
    withStyles(styles),
    withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
    withHandlers<EffectivenessProps, OwnHandlers>(handlerCreators),
    lifecycle<EffectivenessProps, OwnState>(lifecycles),
  )(EffectivenessView);