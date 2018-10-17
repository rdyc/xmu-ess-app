import AppMenu from '@constants/AppMenu';
import { IExpenseClientPutPayload, IExpensePutPayload } from '@expense/classes/request';
import {
  ExpenseFormData,
  RequestFormContainer,
} from '@expense/components/request/forms/RequestFormContainer';
import withApiExpenseDetail, {
  WithApiExpenseDetailHandler,
} from '@expense/enhancers/request/withApiExpenseDetail';
import withExpenseDetail, {
  WithExpenseDetail,
} from '@expense/enhancers/request/withExpenseDetail';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
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
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

interface RouteParams {
  expenseUid: string;
}

interface State {
  mode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  expenseUid?: string | undefined;
}

interface Updaters extends StateHandlerMap<State> {
  stateUpdate: StateHandler<State>;
}

type AllProps
  = WithExpenseDetail
  & WithApiExpenseDetailHandler
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<RouteParams>
  & InjectedIntlProps
  & Handler
  & State
  & Updaters;

interface Handler {
  handleValidate: (payload: ExpenseFormData) => FormErrors;
  handleSubmit: (payload: ExpenseFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

const requestEditor: React.SFC<AllProps> = props => {
  const { mode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.expenseDetailState;

  const renderForm = (formData: ExpenseFormData) => (
    <RequestFormContainer 
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: ExpenseFormData = {
    information: {
      customerUid: undefined,
      projectUid: undefined,
      date: undefined,
      expenseType: undefined,
      value: undefined,
      location: undefined,
      address: undefined,
      name: undefined,
      title: undefined,
      notes: undefined,
    },
  };

  // New
  if (mode === FormMode.New) {
    return renderForm(initialValues);
  }

  // Modify
  if (mode === FormMode.Edit) {
    if (isLoading && !response) {
      return (
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      );
    }
    
    if (!isLoading && response && response.data) {
      // todo: replace values with response data

      return renderForm(initialValues);
    }
  }

  return null;
};

const handlerCreators: HandleCreators<AllProps, Handler> = {
  handleValidate: (props: AllProps) => (payload: ExpenseFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'customerUid', 'projectUid', 'date',  
      'expenseType', 'value', 'location', 
      'address', 'name', 'title',
    ];
  
    requiredFields.forEach(field => {
      if (!payload.information[field] || isNullOrUndefined(payload.information[field])) {
        errors.information[field] = props.intl.formatMessage({id: `expense.field.information.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: AllProps) => (payload: ExpenseFormData) => { 
    const { mode, expenseUid, apiRequestDetailPost, apiRequestDetailPut } = props;
    const { user } = props.userState;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const parsedClient: IExpenseClientPutPayload = ({
      name: payload.information.name || 'n/a',
      title: payload.information.title || 'n/a',
    });

    const putPayload: IExpensePutPayload = ({
      customerUid: payload.information.customerUid || 'n/a',
      projectUid: payload.information.projectUid || 'n/a',
      date: payload.information.date || 'n/a',
      expenseType: payload.information.expenseType || 'n/a',
      value: payload.information.value || 0,
      location: payload.information.location || 'n/a',
      address: payload.information.address || 'n/a',
      client: parsedClient,
      notes: payload.information.notes || 'n/a',
    });

    console.log(putPayload);

    if (mode === FormMode.New) {
      return new Promise((resolve, reject) => {
        apiRequestDetailPost(expenseUid, putPayload, resolve, reject);
      });
    }

    if (!expenseUid) {
      return Promise.reject('expense uid was not found');
    }

    if (mode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        apiRequestDetailPut(expenseUid, putPayload, resolve, reject);
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AllProps) => (result: any, dispatch: Dispatch<any>) => {
    // console.log(result);
    // console.log(dispatch);
    const { alertAdd } = props.layoutDispatch;

    alertAdd({
      time: new Date(),
      message: 'Success bro!!!'
    });
  },
  handleSubmitFail: (props: AllProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { alertAdd } = props.layoutDispatch;
    
    if (submitError) {
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<AllProps, State> = (props: AllProps): State => ({ 
  mode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, State, Updaters> = {
  stateUpdate: (prevState: State) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate, apiRequestDetailGet } = this.props;
    const { user } = this.props.userState;
    
    const view = {
      title: 'expense.form.newTitle',
      subTitle: 'expense.form.newSubTitle',
    };

    if (user) {
      stateUpdate({ 
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = 'expense.form.editTitle';
      view.subTitle = 'expense.form.editSubTitle';

      stateUpdate({ 
        mode: FormMode.Edit,
        projectUid: history.location.state.uid
      });

      apiRequestDetailGet(history.location.state.uid);
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
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

export default compose<AllProps, {}>(
  setDisplayName('ExpenseEditor'),
  
  withUser,
  withLayout,
  withAppBar,
  withExpenseDetail,
  withApiExpenseDetail,
  injectIntl,

  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters),
  withHandlers<AllProps, Handler>(handlerCreators),

  lifecycle<AllProps, {}>(lifecycles),
)(requestEditor);