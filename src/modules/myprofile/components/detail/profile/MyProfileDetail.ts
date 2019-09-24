import { withAccountEmployeeMy, WithAccountEmployeeMy } from '@account/hoc/withAccountEmployeeMy';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withOidc, WithOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { MyProfileUserAction } from '@profile/classes/types/MyProfileUserAction';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { MyProfileDetailView } from './MyProfileDetailView';

interface IOwnRouteParams {
  //
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  action?: MyProfileUserAction;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

export type MyProfileDetailProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdaters
  & RouteComponentProps<IOwnRouteParams>
  & WithUser
  & WithOidc
  & WithLayout
  & WithAccountEmployeeMy
  & InjectedIntlProps;

const createProps: mapper<MyProfileDetailProps, IOwnState> = (): IOwnState => ({
  shouldLoad: false,
});

const stateUpdaters: StateUpdaters<MyProfileDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  })
};

const handlerCreators: HandleCreators<MyProfileDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: MyProfileDetailProps) => () => { 
    const { loadRequest } = props.accountEmployeeMyDispatch;
    const { isLoading } = props.accountEmployeeMyState.detail;
    const { user } = props.userState;

    if (user && !isLoading) {
      loadRequest();
    }
  },
  handleOnSelectedMenu: (props: MyProfileDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case MyProfileUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<MyProfileDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: MyProfileDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.accountEmployeeMyState.detail.response !== prevProps.accountEmployeeMyState.detail.response) {
      const { isLoading } = this.props.accountEmployeeMyState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: MyProfileUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
      ];

      this.props.setOptions(options);
    }
  }
};
 
export const MyProfileDetail = compose<MyProfileDetailProps, {}>(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withAccountEmployeeMy,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<MyProfileDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('MyProfileDetail')
)(MyProfileDetailView);