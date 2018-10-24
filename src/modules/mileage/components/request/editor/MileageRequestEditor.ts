import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
import {  withRouter } from 'react-router';
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
import { isNullOrUndefined, isObject } from 'util';

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
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type MileageRequestEditorProps = WithMileageRequest &
  WithUser &
  WithLayout &
  WithAppBar &
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
        isNullOrUndefined(formData.information[field])
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
    const { formMode, intl/* , history */ } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(mileageMessage.createSuccess, {
        uid: response.uid
      });
    }

    alertAdd({
      message,
      time: new Date()
    });

    // history.push('/mileage/request');
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
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      // another errors from server
      let message: string = '';

      if (formMode === FormMode.New) {
        message = intl.formatMessage(mileageMessage.createFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<MileageRequestEditorProps, OwnState> = (props: MileageRequestEditorProps): OwnState => ({ 
  formMode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<MileageRequestEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, stateUpdate } = this.props;
    // const { loadDetailRequest } = this.props.mileageRequestDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: 'mileage.request.form.newTitle',
      subTitle: 'mileage.request.form.newSubTitle',
    };

    if (!user) {
      return;
    }

    stateUpdate({ 
      companyUid: user.company.uid,
      positionUid: user.position.uid
    });

    layoutDispatch.changeView({
      uid: AppMenu.MileageRequest,
      parentUid: AppMenu.Mileage,
      title: intl.formatMessage({id: view.title}),
      subTitle : intl.formatMessage({id: view.subTitle})
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, mileageRequestDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    mileageRequestDispatch.createDispose();
  }
};

export default compose<MileageRequestEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withMileageRequest,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<MileageRequestEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<MileageRequestEditorProps, {}>(lifecycles),
)(MileageRequestEditorView);