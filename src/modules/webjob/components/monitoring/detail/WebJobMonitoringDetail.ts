import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IWebJobUserAction } from '@webjob/classes/types';
import { WithWebJobMonitoring, withWebJobMonitoring } from '@webjob/hoc/withWebJobMonitoring';
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

import { WebJobMonitoringDetailView } from './WebJobMonitoringDetailView';

interface IOwnRouteParams {
  jobId: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  isAdmin: boolean;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

export type WebJobMonitoringDetailProps
  = WithOidc
  & WithUser
  & WithWebJobMonitoring
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<WebJobMonitoringDetailProps, IOwnState> = (props: WebJobMonitoringDetailProps): IOwnState => { 
    // checking admin status
    const { user } = props.oidcState;
    let isAdmin: boolean = false;
  
    if (user) {
      const role: string | string[] | undefined = user.profile.role;
  
      if (role) {
        if (Array.isArray(role)) {
          isAdmin = role.indexOf(AppRole.Admin) !== -1;
        } else {
          isAdmin = role === AppRole.Admin;
        }
      }
    }
    
    return { 
      isAdmin,
      shouldLoad: false,
  };
};

const stateUpdaters: StateUpdaters<WebJobMonitoringDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: WebJobMonitoringDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: WebJobMonitoringDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
};

const handlerCreators: HandleCreators<WebJobMonitoringDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: WebJobMonitoringDetailProps) => () => { 
    const { user } = props.userState;
    const jobId = props.match.params.jobId;
    const { isLoading } = props.webJobMonitoringState.jobDetail;

    if (user && jobId && !isLoading) {
      props.webJobMonitoringDispatch.loadDetailJobRequest({
        jobId
      });
    }
  },
  handleOnSelectedMenu: (props: WebJobMonitoringDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case IWebJobUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<WebJobMonitoringDetailProps, IOwnState> = {
  componentDidMount() {
    // console.log('WOI');
  },
  componentDidUpdate(prevProps: WebJobMonitoringDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.jobId !== prevProps.match.params.jobId) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.webJobMonitoringState.jobDetail.response !== prevProps.webJobMonitoringState.jobDetail.response) {
      const { isLoading } = this.props.webJobMonitoringState.jobDetail;

      const options: IPopupMenuOption[] = [
        {
          id: IWebJobUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
      ];

      this.props.setOptions(options);
    }
  }
}; 

export const WebJobMonitoringDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withWebJobMonitoring,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('WebJobMonitoringDetail')
)(WebJobMonitoringDetailView);