import AppMenu from '@constants/AppMenu';
import {
  IExpenseRequestPostPayload,
  IExpenseRequestPutPayload,
} from '@expense/classes/request/request';
import { IExpense } from '@expense/classes/response';
import {
  ExpenseRequestFormData,
} from '@expense/components/request/editor/forms/RequestForm';
import { RequestEditorView } from '@expense/components/request/editor/RequestEditorView';
import { WithExpenseRequest, withExpenseRequest } from '@expense/hoc/withExpenseRequest';
import { expenseRequestMessage } from '@expense/locales/messages/expenseRequestMessage';
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

interface OwnHandlers {
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
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type RequestEditorProps
  = WithExpenseRequest
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

interface OwnHandlers {
  handleValidate: (payload: ExpenseRequestFormData) => FormErrors;
  handleSubmit: (payload: ExpenseRequestFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

const handlerCreators: HandleCreators<RequestEditorProps, OwnHandlers> = {
  handleValidate: (props: RequestEditorProps) => (formData: ExpenseRequestFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'customerUid', 'projectUid', 'date',  
      'expenseType', 'value', 'location', 
      'address', 'name', 'title',
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage({id: `expense.field.information.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: RequestEditorProps) => (formData: ExpenseRequestFormData) => { 
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
      const message = intl.formatMessage(expenseRequestMessage.emptyExpenseUid);

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
  handleSubmitSuccess: (props: RequestEditorProps) => (response: IExpense) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(expenseRequestMessage.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(expenseRequestMessage.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push('/expense/request/list');
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
        message = intl.formatMessage(expenseRequestMessage.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(expenseRequestMessage.updateFailure);
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
  formMode: FormMode.New
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
    const { loadDetailRequest } = this.props.expenseRequestDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: 'expense.form.newTitle',
      subTitle: 'expense.form.newSubTitle',
    };

    if (!user) {
      return;
    }

    stateUpdate({ 
      companyUid: user.company.uid,
      positionUid: user.position.uid
    });

    if (!isNullOrUndefined(history.location.state)) {
      view.title = 'expense.form.editTitle';
      view.subTitle = 'expense.form.editSubTitle';

      stateUpdate({ 
        mode: FormMode.Edit,
        expenseUid: history.location.state.uid
      });

      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        expenseUid: history.location.state.uid
      });
    }

    layoutDispatch.changeView({
      uid: AppMenu.ExpenseRequest,
      parentUid: AppMenu.Expense,
      title: intl.formatMessage({id: view.title}),
      subTitle : intl.formatMessage({id: view.subTitle})
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, expenseRequestDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    expenseRequestDispatch.createDispose();
    expenseRequestDispatch.updateDispose();
  }
};

export default compose<RequestEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withExpenseRequest,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<RequestEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<RequestEditorProps, {}>(lifecycles),
)(RequestEditorView);