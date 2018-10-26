import AppMenu from '@constants/AppMenu';
import { IExpenseApprovalPostPayload } from '@expense/classes/request/approval';
import { WithExpenseApproval, withExpenseApproval } from '@expense/hoc/withExpenseApproval';
import { expenseApprovalMessage } from '@expense/locales/messages/expenseApprovalMessage';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
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

import { ApprovalOptions } from '@generic/types/ApprovalOptions';
import { ApprovalEditorView } from './ApprovalEditorView';
import { ExpenseApprovalFormData } from './forms/ApprovalForm';

interface OwnHandlers {
  handleValidate: (payload: ExpenseApprovalFormData) => FormErrors;
  handleSubmit: (payload: ExpenseApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
  handleDialogOpen: (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => void;
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
}

interface OwnRouteParams {
  expenseUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  expenseUid?: string | undefined;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string | undefined;
  dialogDescription?: string | undefined;
  dialogCancelText: string;
  dialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type ApprovalEditorProps
  = WithExpenseApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<ApprovalEditorProps, OwnHandlers> = {
  handleValidate: (props: ApprovalEditorProps) => (formData: ExpenseApprovalFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = 
      formData.information.isApproved === ApprovalOptions.reject ?
        ['isApproved', 'remark'] : ['isApproved'];    
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage({id: `global.form.approval.field.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: ApprovalEditorProps) => (formData: ExpenseApprovalFormData) => { 
    const { expenseUid, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.expenseApprovalDispatch;
    const { information } = formData;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!expenseUid || !information.isApproved) {
      const message = intl.formatMessage(expenseApprovalMessage.emptyProps);

      return Promise.reject(message);
    }

    // generate payload
    const payload: IExpenseApprovalPostPayload = {
      isApproved: information.isApproved === ApprovalOptions.approve ? true : false,
      remark: information.isApproved === ApprovalOptions.approve ? null : information.remark
    };

    // dispatch create request
    return new Promise((resolve, reject) => {
      createRequest({
        expenseUid, 
        resolve, 
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: ApprovalEditorProps) => (response: boolean) => {
    const { formMode, intl, history, expenseUid } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(expenseApprovalMessage.createSuccess, {uid: expenseUid});
    }

    alertAdd({
      message,
      time: new Date()
    });

    if (expenseUid) {
      history.push(`/approval/expense/list`);
    }
  },
  handleSubmitFail: (props: ApprovalEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      alertAdd({
        time: new Date(),
        message: intl.formatMessage(expenseApprovalMessage.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },
  handleDialogOpen: (props: ApprovalEditorProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
    const { intl, stateUpdate, dialogCancelText, dialogConfirmedText } = props;

    stateUpdate({ 
      dialogFullScreen: fullScreen || false,
      dialogOpen: true,
      dialogTitle: title,
      dialogDescription: description,
      dialogCancelText: cancelText || intl.formatMessage({id: dialogCancelText}),
      dialogConfirmedText: confirmText || intl.formatMessage({id: dialogConfirmedText})
    });
  },
  handleDialogClose: (props: ApprovalEditorProps) => () => { 
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: ApprovalEditorProps) => () => { 
    const { match, history, stateReset } = props;
    const expenseUid = match.params.expenseUid;

    stateReset();

    history.push('/expense/form/', { uid: expenseUid });
  },
};

const createProps: mapper<ApprovalEditorProps, OwnState> = (props: ApprovalEditorProps): OwnState => {
  const { match } = props;
  
  return { 
    formMode: FormMode.New,
    expenseUid: match.params.expenseUid,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogCancelText: 'global.action.cancel',
    dialogConfirmedText: 'global.action.ok',
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  stateReset: (prevState: OwnState) => () => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogDescription: undefined,
    dialogCancelText: 'global.action.cancel',
    dialogConfirmedText: 'global.action.ok',
  })
};

const lifecycles: ReactLifeCycleFunctions<ApprovalEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, match } = this.props;
    const { user } = this.props.userState;
    const { response } = this.props.expenseApprovalState.detail;
    const { loadDetailRequest } = this.props.expenseApprovalDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.ExpenseApproval,
      parentUid: AppMenu.Expense,
      title: intl.formatMessage({id: 'expense.form.approval.newTitle'}),
      subTitle : intl.formatMessage({id: 'expense.form.approval.newSubTitle'})
    });
    
    layoutDispatch.navBackShow(); 

    if (!isNullOrUndefined(match.params.expenseUid) && !response && user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        expenseUid: match.params.expenseUid
      });
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, expenseApprovalDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    expenseApprovalDispatch.createDispose();
    expenseApprovalDispatch.loadDetailDispose();
  }
};

export const ApprovalEditor = compose<ApprovalEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withExpenseApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<ApprovalEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<ApprovalEditorProps, {}>(lifecycles),
)(ApprovalEditorView);