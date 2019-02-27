import { SystemLimitType } from '@common/classes/types/SystemLimitType';
import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import {
  IExpenseRequestPostPayload,
  IExpenseRequestPutPayload,
} from '@expense/classes/request/request';
import { IExpense } from '@expense/classes/response';
import { ExpenseRequestEditorView } from '@expense/components/request/editor/ExpenseRequestEditorView';
import {
  ExpenseRequestFormData,
} from '@expense/components/request/editor/forms/RequestForm';
import { WithExpenseRequest, withExpenseRequest } from '@expense/hoc/withExpenseRequest';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { withOidc, WithOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
import * as moment from 'moment';
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

interface OwnHandlers {
  handleSetMinDate: (days: number, fromDate?: Date | null) => void;
  handleValidate: (payload: ExpenseRequestFormData) => FormErrors;
  handleSubmit: (payload: ExpenseRequestFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  expenseUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  expenseUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
  minDate: Date;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type ExpenseRequestEditorProps
  = WithExpenseRequest
  & WithLookupSystemLimit
  & WithOidc
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<ExpenseRequestEditorProps, OwnHandlers> = {
  handleSetMinDate: (props: ExpenseRequestEditorProps) => (days: number, fromDate?: Date | null) => {
    let today = moment(); // create date today

    if (!isNullOrUndefined(fromDate)) { // is fromDate exist, use from date instead
      today = moment(fromDate);
    }

    const minDate = today.subtract(days, 'days'); // substract date using momentjs, because using native date in js sucks

    if (moment(props.minDate).format('DD/MM/YYYY') !== minDate.format('DD/MM/YYYY')) { // only update minDate state once
      props.stateUpdate({
        minDate: minDate.toDate()
      });
    }
  },
  handleValidate: (props: ExpenseRequestEditorProps) => (formData: ExpenseRequestFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'customerUid', 'projectUid', 'date',  
      'expenseType', 'value', 'location', 
      'address', 'name', 'title', 'notes',
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(expenseMessage.request.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: ExpenseRequestEditorProps) => (formData: ExpenseRequestFormData) => { 
    const { formMode, expenseUid, intl } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.expenseRequestDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const parsedClient = () => {
      
      const _client: any = ({
      name: formData.information.name,
      title: formData.information.title,
      });

      return _client;
    };

    const payload = {
      ...formData.information,
      client: parsedClient(),
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as IExpenseRequestPostPayload
        });
      });
    }

    // update checking
    if (!expenseUid) {
      const message = intl.formatMessage(expenseMessage.request.message.emptyExpenseUid);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          expenseUid, 
          resolve, 
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as IExpenseRequestPutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: ExpenseRequestEditorProps) => (response: IExpense) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadDetailDispose } = props.expenseRequestDispatch;
    
    let message: string = '';
    loadDetailDispose();

    if (formMode === FormMode.New) {
      message = intl.formatMessage(expenseMessage.request.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(expenseMessage.request.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/expense/requests/${response.uid}`);
  },
  handleSubmitFail: (props: ExpenseRequestEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(expenseMessage.request.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(expenseMessage.request.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<ExpenseRequestEditorProps, OwnState> = (props: ExpenseRequestEditorProps): OwnState => ({ 
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(expenseMessage.request.dialog.createTitle),
  submitDialogContentText: props.intl.formatMessage(expenseMessage.request.dialog.createDescription),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
  minDate: new Date(),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<ExpenseRequestEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.expenseRequestDispatch;
    const { loadAmountRequest } = this.props.systemLimitDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: expenseMessage.request.page.createTitle,
      subTitle: expenseMessage.request.page.createSubTitle,
    };

    if (!user) {
      return;
    }

    loadAmountRequest({
      companyUid: user.company.uid,
      categoryType: SystemLimitType.Expense
    });

    stateUpdate({ 
      companyUid: user.company.uid,
      positionUid: user.position.uid
    });

    // checking admin status
    const { user: oidc } = this.props.oidcState;
    let result: boolean = false;
    if (oidc) {
      const role: string | string[] | undefined = oidc.profile.role;

      if (role) {
        if (Array.isArray(role)) {
          result = role.indexOf(AppRole.Admin) !== -1;
        } else {
          result = role === AppRole.Admin;
        }
      }

      if (result) {
        stateUpdate({ 
          isAdmin: true
        });
      }
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = expenseMessage.request.page.editTitle;
      view.subTitle = expenseMessage.request.page.editSubTitle;

      stateUpdate({ 
        formMode: FormMode.Edit,
        expenseUid: history.location.state.uid,
        submitDialogTitle: this.props.intl.formatMessage(expenseMessage.request.dialog.editTitle),
        submitDialogContentText: this.props.intl.formatMessage(expenseMessage.request.dialog.editDescription),
      });

      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        expenseUid: history.location.state.uid
      });
    }

    this.props.masterPage.changePage({
      uid: AppMenu.ExpenseRequest,
      parentUid: AppMenu.Expense,
      parentUrl: '/project/request',
      title: intl.formatMessage(view.title),
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, expenseRequestDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    expenseRequestDispatch.createDispose();
    expenseRequestDispatch.updateDispose();
  }
};

export default compose<ExpenseRequestEditorProps, {}>(
  withOidc,
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withExpenseRequest,
  withLookupSystemLimit,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<ExpenseRequestEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<ExpenseRequestEditorProps, {}>(lifecycles),
)(ExpenseRequestEditorView);