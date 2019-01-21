import { IEmployeeEducationDeletePayload, IEmployeeEducationPostPayload, IEmployeeEducationPutPayload } from '@account/classes/request/employeeEducation';
import { IEmployee } from '@account/classes/response';
import { WithAccountEmployeeEducation, withAccountEmployeeEducation } from '@account/hoc/withAccountEmployeeEducation';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
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
import { AccountEmployeeEducationEditorView } from './AccountEmployeeEducationEditorView';
import { AccountEmployeeEducationFormData } from './form/education/AccountEmployeeEducationContainer';

type EditAction = 'update' | 'delete';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeEducationFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeEducationFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnOption {
  formMode: FormMode | undefined;
  educationUid?: string;
  employeeUid: string;
  isOpenDialog: boolean;
  editAction?: EditAction | undefined;
  initialValues?: AccountEmployeeEducationFormData;
  handleDialogClose: () => void;
}

interface OwnRouteParams {
  employeeUid: string;
  educationUid: string;  
}

interface OwnState {

}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeEducationEditorProps
  = WithAccountEmployeeEducation
  & WithUser
  & WithLayout
  & WithWidth
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnOption
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<AccountEmployeeEducationEditorProps, OwnHandlers> = {
  handleValidate: (props: AccountEmployeeEducationEditorProps) => (formData: AccountEmployeeEducationFormData) => { 
    const errors = {
      education: {}
    };
  
    const requiredFields = [
      'degreeType', 'institution', 'major', 'start'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.education[field] || isNullOrUndefined(formData.education[field])) {
        errors.education[field] = props.intl.formatMessage(accountMessage.education.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: AccountEmployeeEducationEditorProps) => (formData: AccountEmployeeEducationFormData) => { 
    const { formMode, employeeUid, intl, editAction, educationUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest, deleteRequest } = props.accountEmployeeEducationDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.education
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          employeeUid,
          resolve, 
          reject,
          data: payload as IEmployeeEducationPostPayload
        });
      });
    }

    // update checking
    if (!employeeUid) {
      const message = intl.formatMessage(accountMessage.education.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      if (educationUid) {
        if (editAction === 'update') {
          return new Promise((resolve, reject) => {
            updateRequest({
              employeeUid,
              resolve, 
              reject,
              data: payload as IEmployeeEducationPutPayload, 
            });
          });
        }

        if (editAction === 'delete') {
          return new Promise((resolve, reject) => {
            deleteRequest({
              employeeUid,
              resolve, 
              reject,
              data: payload as IEmployeeEducationDeletePayload, 
            });
          });
        }
      }
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeEducationEditorProps) => (response: IEmployee) => {
    const { formMode, intl, history, editAction, stateUpdate } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadListRequest } = props.accountEmployeeEducationDispatch; 
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.education.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      if (editAction && editAction === 'update') {
        message = intl.formatMessage(accountMessage.education.message.updateSuccess, { uid: response.uid });
      } else {
        message = intl.formatMessage(accountMessage.education.message.deleteSuccess, { uid: response.uid });
      }
    }

    stateUpdate({
      isOpenDialog: false,
      formMode: undefined,
      editAction: undefined
    });

    alertAdd({
      message,
      time: new Date()
    });

    loadListRequest({
      employeeUid: props.employeeUid,
      filter: {
        direction: 'ascending'
      }
    });
    
    history.push(`/account/employee/${props.employeeUid}/education`);
  },
  handleSubmitFail: (props: AccountEmployeeEducationEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(accountMessage.education.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(accountMessage.education.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<AccountEmployeeEducationEditorProps, OwnState> = (): OwnState => ({ 

});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeEducationEditorProps, {}> = {
  componentDidMount() {
    const { history, stateUpdate, educationUid, employeeUid } = this.props;
    const { user } = this.props.userState;
    
    if (!user) {
      return;
    }
    
    if (!isNullOrUndefined(history.location.state) && !isNullOrUndefined(educationUid)) {
      stateUpdate({ 
        employeeUid,
        submitDialogTitle: this.props.intl.formatMessage(accountMessage.education.confirm.modifyTitle),
        submitDialogContentText : this.props.intl.formatMessage(accountMessage.education.confirm.modifyDescription)
      });
    }

    // layoutDispatch.setupView({
    //   view: {
    //     uid: AppMenu.Account,
    //     parentUid: AppMenu.Lookup,
    //     title: intl.formatMessage(view.title),
    //     subTitle : intl.formatMessage(view.subTitle)
    //   },
    //   parentUrl: `/account/employee/${this.props.employeeUid}`,
    //   status: {
    //     isNavBackVisible: true,
    //     isSearchVisible: false,
    //     isActionCentreVisible: false,
    //     isMoreVisible: false,
    //     isModeSearch: false
    //   }
    // });
  },
  componentWillUnmount() {
    const { accountEmployeeEducationDispatch } = this.props;

    // layoutDispatch.changeView(null);
    // layoutDispatch.navBackHide();
    // layoutDispatch.moreHide();

    // appBarDispatch.dispose();

    accountEmployeeEducationDispatch.createDispose();
    accountEmployeeEducationDispatch.updateDispose();
  }
};

export default compose<AccountEmployeeEducationEditorProps, OwnOption>(
  withUser,
  withLayout,
  withRouter,
  withWidth(),
  withAccountEmployeeEducation,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeEducationEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeEducationEditorProps, {}>(lifecycles),
)(AccountEmployeeEducationEditorView);