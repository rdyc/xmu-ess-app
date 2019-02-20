import { AppRole } from '@constants/AppRole';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
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
}

interface IOwnState {
  pageOptions?: IAppBarMenu[];
  isAdmin: boolean;
  action?: MileageUserAction;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
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
      isAdmin
    };
};

const stateUpdaters: StateUpdaters<MileageRequestDetailProps, IOwnState, IOwnStateUpdaters> = {
  setOptions: (prevState: IOwnState, props: MileageRequestDetailProps) => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    pageOptions: options
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
  }
};

const lifecycles: ReactLifeCycleFunctions<MileageRequestDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: MileageRequestDetailProps) {
    // handle updated route params
    if (this.props.match.params.mileageUid !== prevProps.match.params.mileageUid) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.mileageRequestState.detail.response !== prevProps.mileageRequestState.detail.response) {
      const { isLoading } = this.props.mileageRequestState.detail;

      const options: IAppBarMenu[] = [
        {
          id: MileageUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
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