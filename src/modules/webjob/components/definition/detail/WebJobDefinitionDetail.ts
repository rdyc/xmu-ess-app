import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IWebJobUserAction } from '@webjob/classes/types';
import { WithWebJobDefinition, withWebJobDefinition } from '@webjob/hoc/withWebJobDefinition';
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

import { WebJobDefinitionDetailView } from './WebJobDefinitionDetailView';

interface IOwnRouteParams {
  definitionUid: string;
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

export type WebJobDefinitionDetailProps
  = WithOidc
  & WithUser
  & WithWebJobDefinition
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<WebJobDefinitionDetailProps, IOwnState> = (props: WebJobDefinitionDetailProps): IOwnState => { 
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

const stateUpdaters: StateUpdaters<WebJobDefinitionDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: WebJobDefinitionDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: WebJobDefinitionDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
};

const handlerCreators: HandleCreators<WebJobDefinitionDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: WebJobDefinitionDetailProps) => () => { 
    const { user } = props.userState;
    const definitionUid = props.match.params.definitionUid;
    const { isLoading } = props.webJobDefinitionState.detail;

    if (user && definitionUid && !isLoading) {
      props.webJobDefinitionDispatch.loadDetailRequest({
        definitionUid
      });
    }
  },
  handleOnSelectedMenu: (props: WebJobDefinitionDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case IWebJobUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<WebJobDefinitionDetailProps, IOwnState> = {
  componentDidMount() {
    // console.log('WOI');
  },
  componentDidUpdate(prevProps: WebJobDefinitionDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.definitionUid !== prevProps.match.params.definitionUid) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.webJobDefinitionState.detail.response !== prevProps.webJobDefinitionState.detail.response) {
      const { isLoading } = this.props.webJobDefinitionState.detail;

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

export const WebJobDefinitionDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withWebJobDefinition,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('WebJobDefinitionDetail')
)(WebJobDefinitionDetailView);