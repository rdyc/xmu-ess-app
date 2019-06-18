import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IPositionPostPayload, IPositionPutPayload } from '@lookup/classes/request';
import { IPosition } from '@lookup/classes/response';
import { WithLookupPosition, withLookupPosition } from '@lookup/hoc/withLookupPosition';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { PositionEditorView } from './PositionEditorView';
import { PositionFormData } from './PositionForm';

interface OwnHandlers {
  handleValidate: (payload: PositionFormData) => any;
  handleSubmit: (payload: PositionFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}
interface OwnRouteParams {
  companyUid: string;
  positionUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type PositionEditorProps
  = WithLookupPosition
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<PositionEditorProps, OwnState> = (props: PositionEditorProps): OwnState => {
  const { history } = props;

  const state = history.location.state;

  return {
    formMode: state ? FormMode.Edit : FormMode.New,
    companyUid: state ? state.companyUid : undefined,
    positionUid: state ? state.positionUid : undefined,
    submitDialogTitle: props.intl.formatMessage(lookupMessage.position.dialog.createTitle),
    submitDialogContentText: props.intl.formatMessage(lookupMessage.position.dialog.createDescription),
    submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
    submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<PositionEditorProps, OwnHandlers> = {
  handleValidate: (props: PositionEditorProps) => (formData: PositionFormData) => {
    const errors = {
      information: {}
    };
    const requiredFields = [
      'companyUid', 'name',
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(lookupMessage.position.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: PositionEditorProps) => (formData: PositionFormData) => {
    const { formMode, positionUid, companyUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.lookupPositionDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.information,
    };

    const newPayload = {
      name: payload.name,
      description: payload.description,
      inactiveDate: payload.inactiveDate || '',
      isAllowMultiple: payload.isAllowMultiple
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          companyUid: payload.companyUid || '',
          data: newPayload as IPositionPostPayload,
        });
      });
    }

    // update checking
    if (!companyUid) {
      const message = props.intl.formatMessage(lookupMessage.position.message.emptyCompanyUid);

      return Promise.reject(message);
    }

    if (!positionUid) {
      const message = props.intl.formatMessage(lookupMessage.position.message.emptyPositionUid);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve,
          reject,
          companyUid: payload.companyUid || companyUid,
          positionUid: payload.uid || positionUid,
          data: newPayload as IPositionPutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: PositionEditorProps) => (response: IPosition) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(lookupMessage.position.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(lookupMessage.position.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/lookup/positions/${response.companyUid}/${response.uid}`);
  },
  handleSubmitFail: (props: PositionEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { formMode, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      // another errors from server
      let message: string = '';

      if (formMode === FormMode.New) {
        message = intl.formatMessage(lookupMessage.position.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(lookupMessage.position.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<PositionEditorProps, {}> = {
  componentDidMount() {
    const { intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.lookupPositionDispatch;
    const { user } = this.props.userState;

    const view = {
      title: lookupMessage.position.form.newTitle,
      subTitle: lookupMessage.position.form.newSubTitle,
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {

        view.title = lookupMessage.position.form.editTitle,
        view.subTitle = lookupMessage.position.form.editSubTitle,

        stateUpdate({
          formMode: FormMode.Edit,
          positionUid: history.location.state.uid
        });

        loadDetailRequest({
          companyUid: history.location.state.companyUid,
          positionUid: history.location.state.uid
        });
      
    }

    this.props.masterPage.changePage({
      uid: AppMenu.LookupPosition,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/positions',
      title: intl.formatMessage(view.title),
      description : intl.formatMessage(view.subTitle)
    });
  },
  componentWillUnmount() {
    const { masterPage, lookupPositionDispatch } = this.props;

    masterPage.resetPage();

    lookupPositionDispatch.createDispose();
    lookupPositionDispatch.updateDispose();
  }
};

export const PositionEditor = compose<PositionEditorProps, {}>(
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withLookupPosition,
  injectIntl,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<PositionEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<PositionEditorProps, {}>(lifecycles),
)(PositionEditorView);