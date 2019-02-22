import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCustomerDeletePayload } from '@lookup/classes/request/customer';
import { LookupUserAction } from '@lookup/classes/types';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
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
  withStateHandlers
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { LookupCustomerDetailView } from './LookupCustomerDetailView';

interface OwnRouteParams {
  customerUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnOpenDialog: (action: LookupUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleSubmit: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnState {
  pageOptions?: IAppBarMenu[];
  isAdmin: boolean;
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setOptions: StateHandler<OwnState>;
  stateUpdate: StateHandler<OwnState>;
}

export type LookupCustomerDetailProps
  = WithUser
  & WithLayout
  & WithLookupCustomer
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<LookupCustomerDetailProps, OwnState> = (props: LookupCustomerDetailProps): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
});

const stateUpdaters: StateUpdaters<LookupCustomerDetailProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: OwnState, props: LookupCustomerDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  }),
};

const handlerCreators: HandleCreators<LookupCustomerDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: LookupCustomerDetailProps) => () => { 
    if (props.userState.user && props.match.params.customerUid && !props.lookupCustomerState.detail.isLoading ) {
      props.lookupCustomerDispatch.loadDetailRequest({
        companyUid: props.history.location.state ? props.history.location.state.companyUid : '',
        customerUid: props.match.params.customerUid
      });
    }
  },
  handleOnOpenDialog: (props: LookupCustomerDetailProps) => (action: LookupUserAction) => {
    if (action === LookupUserAction.Modify) {
      props.stateUpdate({
        action: LookupUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription, { state: 'Customer'}),
      });
    } else if (action === LookupUserAction.Delete) {
      props.stateUpdate({
        action: LookupUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription, { state: 'Customer'}),
      });
    }
  },
  handleOnCloseDialog: (props: LookupCustomerDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: LookupCustomerDetailProps) => () => {
    const { response } = props.lookupCustomerState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let customerUid: string | undefined;

    // get project uid
    if (response.data) {
      customerUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/lookup/customer/form';
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, { 
        uid: customerUid 
      });
    }
  },
  handleSubmit: (props: LookupCustomerDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.lookupCustomerDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.customerUid) {
      const message = intl.formatMessage(lookupMessage.customer.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.customerUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupCustomerDeletePayload
      });
    });
  },
  handleSubmitSuccess: (props: LookupCustomerDetailProps) => (response: boolean) => {
    props.history.push('/lookup/customer/list');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.customer.message.deleteSuccess, { uid : props.match.params.customerUid })
    });
  },
  handleSubmitFail: (props: LookupCustomerDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.customer.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<LookupCustomerDetailProps, OwnState> = {
  componentDidUpdate(prevProps: LookupCustomerDetailProps) {
    // handle updated route params
    if (this.props.match.params.customerUid !== prevProps.match.params.customerUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.lookupCustomerState.detail.response !== prevProps.lookupCustomerState.detail.response) {
      const { isLoading } = this.props.lookupCustomerState.detail;

      // generate option menus
      const options: IAppBarMenu[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        },
        {
          id: LookupUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true,
          onClick: () => this.props.handleOnOpenDialog(LookupUserAction.Modify)
        },
        {
          id: LookupUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true,
          onClick: () => this.props.handleOnOpenDialog(LookupUserAction.Delete)
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const LookupCustomerDetail = compose<LookupCustomerDetailProps, {}>(
  withRouter,
  withUser,
  withLayout,
  withLookupCustomer,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupCustomerDetailProps, OwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('LookupDiemDetail')
)(LookupCustomerDetailView);