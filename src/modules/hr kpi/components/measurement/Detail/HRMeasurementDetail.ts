import { AppRole } from '@constants/AppRole';
import { IKPIMeasurementDeletePayload } from '@KPI/classes/request/measurement';
import { KPIMeasurementUserAction } from '@KPI/classes/types/KPIMeasurementUserAction';
import { WithKPIMeasurement, withKPIMeasurement } from '@KPI/hoc/withKPIMeasurement';
import { KPIMessage } from '@KPI/locales/messages/KPIMessage';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { DeleteFormData } from '@lookup/components/currency/editor/DeleteForm';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, witKPIouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { KPIMeasurementDetailView } from './KPIMeasurementDetailView';

interface IOwnRouteParams {
  measurementUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleDelete: (payload: DeleteFormData) => void;
  handleDeleteSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleDeleteFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, deleteError: any) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: KPIMeasurementUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
}

export type MeasurementDetailProps
  = WithUser
  & WithOidc
  & WithLayout
  & WithKPIMeasurement
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<MeasurementDetailProps, IOwnState> = (props: MeasurementDetailProps): IOwnState => {
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
    dialogFullScreen: false,
    dialogOpen: false,
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  };
};

const stateUpdaters: StateUpdaters<MeasurementDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: IOwnState, props: MeasurementDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: MeasurementDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: MeasurementDetailProps) => (): Partial<IOwnState> => ({
    action: KPIMeasurementUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(KPIMessage.measurement.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(KPIMessage.measurement.confirm.modifyDescription, { state: 'measurement'}),
  }),
  setDelete: (prevState: IOwnState, props: MeasurementDetailProps) => (): Partial<IOwnState> => ({
    action: KPIMeasurementUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(KPIMessage.measurement.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(KPIMessage.measurement.confirm.deleteDescription, { state: 'measurement'}),
  })
};

const handlerCreators: HandleCreators<MeasurementDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: MeasurementDetailProps) => () => { 
    if (props.userState.user && props.match.params.measurementUid && !props.KPIMeasurementState.detail.isLoading) {
      props.KPIMeasurementDispatch.loadDetailRequest({
        measurementUid: props.match.params.measurementUid,
      });
    }
  },
  handleOnSelectedMenu: (props: MeasurementDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case KPIMeasurementUserAction.Refresh:
        props.setShouldLoad();
        break;
      case KPIMeasurementUserAction.Modify:
        props.setModify();        
        break;
      case KPIMeasurementUserAction.Delete:
        props.setDelete();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: MeasurementDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: MeasurementDetailProps) => () => {
    const { response } = props.KPIMeasurementState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let measurementUid: string | undefined;

    // get project uid
    if (response.data) {
      measurementUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      KPIMeasurementUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case KPIMeasurementUserAction.Modify:
          next = '/kpi/measurement/form';
          break;

        default:
          break;
      }

      props.history.push(next, { 
        uid: measurementUid 
      });
    }
  },
  handleDelete: (props: MeasurementDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.KPIMeasurementDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.measurementUid) {
      const message = intl.formatMessage(KPIMessage.measurement.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      measurementUid: match.params.measurementUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as IKPIMeasurementDeletePayload
      });
    });
  },
  handleDeleteSuccess: (props: MeasurementDetailProps) => (response: boolean) => {
    props.history.push('/kpi/measurement');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(KPIMessage.measurement.message.deleteSuccess, { uid : props.match.params.measurementUid })
    });
  },
  handleDeleteFail: (props: MeasurementDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(KPIMessage.measurement.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<MeasurementDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: MeasurementDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.measurementUid !== prevProps.match.params.measurementUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.KPIMeasurementState.detail.response !== prevProps.KPIMeasurementState.detail.response) {
      const { isLoading } = this.props.KPIMeasurementState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: KPIMeasurementUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: KPIMeasurementUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        },
        {
          id: KPIMeasurementUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const KPIMeasurementDetail = compose(
  setDisplayName('KPIMeasurementDetail'),
  witKPIouter,
  withOidc,
  withUser,
  withLayout,
  withKPIMeasurement,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<MeasurementDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
)(KPIMeasurementDetailView);