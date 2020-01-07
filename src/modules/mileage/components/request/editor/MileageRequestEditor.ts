import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IMileageRequestPostPayload } from '@mileage/classes/request/';
import { IMileageRequest } from '@mileage/classes/response';
import { MileageRequestFormData } from '@mileage/components/request/editor/forms/MileageRequestForm';
import { MileageRequestEditorView } from '@mileage/components/request/editor/MileageRequestEditorView';
import {
  WithMileageRequest,
  withMileageRequest
} from '@mileage/hoc/withMileageRequest';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {  RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';

interface OwnHandlers {
  handleValidate: (payload: MileageRequestFormData) => FormErrors;
  handleSubmit: (payload: MileageRequestFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (
    errors: FormErrors | undefined,
    dispatch: Dispatch<any>,
    submitError: any
  ) => void;
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

export type MileageRequestEditorProps = WithMileageRequest &
  WithUser &
  WithLayout &
  WithMasterPage &
  RouteComponentProps &
  InjectedIntlProps &
  OwnHandlers &
  OwnState &
  OwnStateUpdaters;

const handlerCreators: HandleCreators<MileageRequestEditorProps, OwnHandlers> = {
  handleValidate: (props: MileageRequestEditorProps) => (
    formData: MileageRequestFormData
  ) => {
    const errors = {
      information: {}
    };
    const requiredFields = [
      'year',
      'month'
    ];

    requiredFields.forEach(field => {
      if (
        !formData.information[field] ||
        (formData.information[field] === undefined || formData.information[field] === null)
      ) {
        errors.information[field] = props.intl.formatMessage({
          id: `mileage.request.field.information.${field}.required`
        });
      }
    });

    return errors;
  },
  handleSubmit: (props: MileageRequestEditorProps) => (
    formData: MileageRequestFormData
  ) => {
    const { formMode } = props;
    const { user } = props.userState;
    const { createRequest } = props.mileageRequestDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.information,
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as IMileageRequestPostPayload
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: MileageRequestEditorProps) => (
    response: IMileageRequest
  ) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(mileageMessage.request.message.createSuccess, {
        uid: response.uid
      });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/mileage/requests/${response.uid}`);
  },
  handleSubmitFail: (props: MileageRequestEditorProps) => (
    errors: FormErrors | undefined,
    dispatch: Dispatch<any>,
    submitError: any
  ) => {
    const { formMode, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    } else {
      // another errors from server
      let message: string = '';

      if (formMode === FormMode.New) {
        message = intl.formatMessage(mileageMessage.request.message.createFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<MileageRequestEditorProps, OwnState> = (props: MileageRequestEditorProps): OwnState => ({ 
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(mileageMessage.request.confirm.createTitle),
  submitDialogContentText: props.intl.formatMessage(mileageMessage.request.confirm.createDescription),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<MileageRequestEditorProps, {}> = {
  componentDidMount() {
    const { intl, stateUpdate } = this.props;
    const { user } = this.props.userState;

    const view = {
      title: mileageMessage.request.page.newTitle,
      subTitle: mileageMessage.request.page.newSubHeader,
    };

    if (!user) {
      return;
    }

    stateUpdate({ 
      companyUid: user.company.uid,
      positionUid: user.position.uid,
      submitDialogTitle: this.props.intl.formatMessage(mileageMessage.request.confirm.createTitle),
      submitDialogContentText : this.props.intl.formatMessage(mileageMessage.request.confirm.createDescription)
    });

    this.props.masterPage.changePage({
      uid: AppMenu.MileageRequest,
      parentUid: AppMenu.Mileage,
      parentUrl: '/mileage/requests',
      title: intl.formatMessage(view.title),
      description : intl.formatMessage(view.subTitle)
    });
  },
  componentWillUnmount() {
    const { mileageRequestDispatch, masterPage } = this.props;

    masterPage.resetPage();

    mileageRequestDispatch.createDispose();
  }
};

export default compose<MileageRequestEditorProps, {}>(
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withMileageRequest,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<MileageRequestEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<MileageRequestEditorProps, {}>(lifecycles),
)(MileageRequestEditorView);