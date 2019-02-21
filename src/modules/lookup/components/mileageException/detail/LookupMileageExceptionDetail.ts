import { AppRole } from '@constants/AppRole';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { MileageExceptionUserAction } from '@lookup/classes/types';
import { WithLookupMileageException, withLookupMileageException } from '@lookup/hoc/withLookupMileageException';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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

import { LookupMileageExceptionDetailView } from './LookupMileageExceptionDetailView';

interface IOwnRouteParams {
  mileageExceptionUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  pageOptions?: IAppBarMenu[];
  isAdmin: boolean;
  action?: MileageExceptionUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
}

export type LookupMileageExceptionDetailProps
  = WithUser
  & WithOidc
  & WithLookupMileageException
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<LookupMileageExceptionDetailProps, IOwnState> = (props: LookupMileageExceptionDetailProps): IOwnState => {
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
    dialogFullScreen: false,
    dialogOpen: false,
  };
};

const stateUpdaters: StateUpdaters<LookupMileageExceptionDetailProps, IOwnState, IOwnStateUpdaters> = {
  setOptions: (prevState: IOwnState, props: LookupMileageExceptionDetailProps) => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    pageOptions: options
  }),
  setModify: (prevState: IOwnState, props: LookupMileageExceptionDetailProps) => (): Partial<IOwnState> => ({
    action: MileageExceptionUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription, { state: 'Mileage Exception'}),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<LookupMileageExceptionDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupMileageExceptionDetailProps) => () => { 
    if (props.userState.user && props.match.params.mileageExceptionUid && !props.mileageExceptionState.detail.isLoading) {
      props.mileageExceptionDispatch.loadDetailRequest({
        mileageExceptionUid: props.match.params.mileageExceptionUid
      });
    }
  },  
  handleOnModify: (props: LookupMileageExceptionDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: LookupMileageExceptionDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: LookupMileageExceptionDetailProps) => () => {
    const { response } = props.mileageExceptionState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let mileageExceptionUid: string | undefined;

    // get mileage exception uid
    if (response.data) {
      mileageExceptionUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      MileageExceptionUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case MileageExceptionUserAction.Modify:
          next = '/lookup/mileageexceptions/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: mileageExceptionUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupMileageExceptionDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: LookupMileageExceptionDetailProps) {
    // handle updated route params
    if (this.props.match.params.mileageExceptionUid !== prevProps.match.params.mileageExceptionUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.mileageExceptionState.detail.response !== prevProps.mileageExceptionState.detail.response) {
      const { isLoading } = this.props.mileageExceptionState.detail;

      // generate option menus
      const options: IAppBarMenu[] = [
        {
          id: MileageExceptionUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        },
        {
          id: MileageExceptionUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true,
          onClick: this.props.handleOnModify
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const LookupMileageExceptionDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withLookupMileageException,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('LookupMileageExceptionDetail')
)(LookupMileageExceptionDetailView);