import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupHolidayPostPayload, ILookupHolidayPutPayload } from '@lookup/classes/request/';
import { ILookupHoliday } from '@lookup/classes/response';
import { LookupHolidayFormData } from '@lookup/components/holiday/editor/forms/LookupHolidayForm';
import { WithLookupHoliday, withLookupHoliday } from '@lookup/hoc/withLookupHoliday';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
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
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

import { LookupHolidayEditorView } from './LookupHolidayEditorView';

interface OwnHandlers {
  handleValidate: (payload: LookupHolidayFormData) => FormErrors;
  handleSubmit: (payload: LookupHolidayFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  holidayUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  holidayUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type RequestEditorProps
  = WithLookupHoliday
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<RequestEditorProps, OwnHandlers> = {
  handleValidate: (props: RequestEditorProps) => (formData: LookupHolidayFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'company', 'description', 'date',
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(lookupMessage.holiday.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: RequestEditorProps) => (formData: LookupHolidayFormData) => { 
    const { formMode, holidayUid, intl } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.lookupHolidayDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.information,
    };

    const company = payload.companyUid;

    // creating
    if (formMode === FormMode.New && !isNullOrUndefined(company)) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          companyUid: company,
          data: payload as ILookupHolidayPostPayload
        });
      });
    }

    // update checking
    if (!holidayUid) {
      const message = intl.formatMessage(lookupMessage.holiday.message.emptyHolidayUid);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit && !isNullOrUndefined(company)) {
      return new Promise((resolve, reject) => {
        updateRequest({
          holidayUid, 
          resolve, 
          reject,
          companyUid: company,
          data: payload as ILookupHolidayPutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: RequestEditorProps) => (response: ILookupHoliday) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(lookupMessage.holiday.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(lookupMessage.holiday.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/lookup/holidays/${response.uid}`);
  },
  handleSubmitFail: (props: RequestEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(lookupMessage.holiday.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(lookupMessage.holiday.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<RequestEditorProps, OwnState> = (props: RequestEditorProps): OwnState => ({ 
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(lookupMessage.holiday.dialog.createTitle),
  submitDialogContentText: props.intl.formatMessage(lookupMessage.holiday.dialog.createDescription),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<RequestEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.lookupHolidayDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: lookupMessage.holiday.page.newTitle,
      subTitle: lookupMessage.holiday.page.newSubHeader,
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = lookupMessage.holiday.page.modifyTitle;
      view.subTitle = lookupMessage.holiday.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        holidayUid: history.location.state.uid,
        companyUid: history.location.state.companyUid
      });

      loadDetailRequest({
        companyUid: user.company.uid,
        holidayUid: history.location.state.uid,
      });
    }

    layoutDispatch.changeView({
      uid: AppMenu.LookupHoliday,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage(view.title),
      subTitle : intl.formatMessage(view.subTitle)
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, lookupHolidayDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    lookupHolidayDispatch.createDispose();
    lookupHolidayDispatch.updateDispose();
  }
};

export default compose<RequestEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withLookupHoliday,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<RequestEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<RequestEditorProps, {}>(lifecycles),
)(LookupHolidayEditorView);