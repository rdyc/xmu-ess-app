import { AppRole } from '@constants/AppRole';
import { IHRMeasurementDeletePayload } from '@hr/classes/request/measurement';
import { HRMeasurementUserAction } from '@hr/classes/types/HRMeasurementUserAction';
import { WithHRMeasurement, withHRMeasurement } from '@hr/hoc/withHRMeasurement';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { DeleteFormData } from '@lookup/components/currency/editor/DeleteForm';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { HRMeasurementDetailView } from './HRMeasurementDetailView';

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
  action?: HRMeasurementUserAction;
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
  & WithHRMeasurement
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
    action: HRMeasurementUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.measurement.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(hrMessage.measurement.confirm.modifyDescription, { state: 'measurement'}),
  }),
  setDelete: (prevState: IOwnState, props: MeasurementDetailProps) => (): Partial<IOwnState> => ({
    action: HRMeasurementUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.measurement.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(hrMessage.measurement.confirm.deleteDescription, { state: 'measurement'}),
  })
};

const handlerCreators: HandleCreators<MeasurementDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: MeasurementDetailProps) => () => { 
    if (props.userState.user && props.match.params.measurementUid && !props.hrMeasurementState.detail.isLoading) {
      props.hrMeasurementDispatch.loadDetailRequest({
        measurementUid: props.match.params.measurementUid,
      });
    }
  },
  handleOnSelectedMenu: (props: MeasurementDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case HRMeasurementUserAction.Refresh:
        props.setShouldLoad();
        break;
      case HRMeasurementUserAction.Modify:
        props.setModify();        
        break;
      case HRMeasurementUserAction.Delete:
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
    const { response } = props.hrMeasurementState.detail;

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
      HRMeasurementUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case HRMeasurementUserAction.Modify:
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
    const { deleteRequest } = props.hrMeasurementDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.measurementUid) {
      const message = intl.formatMessage(hrMessage.measurement.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      measurementUid: match.params.measurementUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as IHRMeasurementDeletePayload
      });
    });
  },
  handleDeleteSuccess: (props: MeasurementDetailProps) => (response: boolean) => {
    props.history.push('/kpi/measurement');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(hrMessage.measurement.message.deleteSuccess, { uid : props.match.params.measurementUid })
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
        message: props.intl.formatMessage(hrMessage.measurement.message.deleteFailure),
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
    if (this.props.hrMeasurementState.detail.response !== prevProps.hrMeasurementState.detail.response) {
      const { isLoading } = this.props.hrMeasurementState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: HRMeasurementUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: HRMeasurementUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        },
        {
          id: HRMeasurementUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const HRMeasurementDetail = compose(
  setDisplayName('HRMeasurementDetail'),
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withHRMeasurement,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<MeasurementDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
)(HRMeasurementDetailView);