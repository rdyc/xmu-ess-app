import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { MileageUserAction } from '@mileage/classes/types';
import { WithMileageRequest, withMileageRequest } from '@mileage/hoc/withMileageRequest';
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

import { MileageRequestDetailView } from './MileageRequestDetailView';

interface IOwnRouteParams {
  mileageUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  isAdmin: boolean;
  action?: MileageUserAction;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

export type MileageRequestDetailProps
  = WithOidc
  & WithUser
  & WithMileageRequest
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<MileageRequestDetailProps, IOwnState> = (props: MileageRequestDetailProps): IOwnState => { 
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
      shouldLoad: false
  };
};

const stateUpdaters: StateUpdaters<MileageRequestDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: MileageRequestDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: MileageRequestDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<MileageRequestDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: MileageRequestDetailProps) => () => { 
    if (props.userState.user && props.match.params.mileageUid && !props.mileageRequestState.detail.isLoading) {
      props.mileageRequestDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        mileageUid: props.match.params.mileageUid
      });
    }
  },
  handleOnSelectedMenu: (props: MileageRequestDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case MileageUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<MileageRequestDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: MileageRequestDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.mileageUid !== prevProps.match.params.mileageUid) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.mileageRequestState.detail.response !== prevProps.mileageRequestState.detail.response) {
      const { isLoading } = this.props.mileageRequestState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: MileageUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
}; 

export const MileageRequestDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withMileageRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('MileageRequestDetail')
)(MileageRequestDetailView);