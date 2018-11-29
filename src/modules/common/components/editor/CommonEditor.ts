import { ISystemPostPayload, ISystemPutPayload } from '@common/classes/request';
import { ISystem } from '@common/classes/response';
import { categoryTypeTranslator } from '@common/helper';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { commonMessage } from '@common/locales/messages/commonMessage';
import AppMenu from '@constants/AppMenu';
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
import { CommonEditorView } from './CommonEditorView';
import { CommonFormData } from './forms/CommonForm';

interface OwnHandlers {
  handleValidate: (payload: CommonFormData) => FormErrors;
  handleSubmit: (payload: CommonFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  category: string;
}

interface OwnState {
  formMode: FormMode;
  id?: string | null;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type CommonEditorProps
  = WithCommonSystem
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<CommonEditorProps, OwnHandlers> = {
  handleValidate: (props: CommonEditorProps) => (formData: CommonFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'name', 'description',
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(commonMessage.system.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: CommonEditorProps) => (formData: CommonFormData) => { 
    const { formMode, id, intl } = props;
    const { user } = props.userState;
    const { systemCreateRequest, systemUpdateRequest } = props.commonDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.information,
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        systemCreateRequest({
          resolve, 
          reject,
          category: categoryTypeTranslator(props.match.params.category),
          data: payload as ISystemPostPayload
        });
      });
    }

    // update checking
    if (!id) {
      const message = intl.formatMessage(commonMessage.system.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        systemUpdateRequest({
          resolve, 
          reject,
          id,
          category: categoryTypeTranslator(props.match.params.category),
          data: payload as ISystemPutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: CommonEditorProps) => (response: ISystem) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    const { systemDetailDispose } = props.commonDispatch;
    
    let message: string = '';
    systemDetailDispose();

    if (formMode === FormMode.New) {
      message = intl.formatMessage(commonMessage.system.message.createSuccess, { uid: response.type });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(commonMessage.system.message.updateSuccess, { uid: response.type });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/common/system/${props.match.params.category}/${response.id}`);
  },
  handleSubmitFail: (props: CommonEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(commonMessage.system.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(commonMessage.system.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<CommonEditorProps, OwnState> = (props: CommonEditorProps): OwnState => {
  const { location } = props;

  return {
    formMode: FormMode.New,
    id: location.state && location.state.id || '',
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<CommonEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { systemDetailRequest } = this.props.commonDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: intl.formatMessage(commonMessage.system.page.createTitle),
      subTitle: intl.formatMessage(commonMessage.system.page.createSubTitle),
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = intl.formatMessage(commonMessage.system.page.editTitle);
      view.subTitle = intl.formatMessage(commonMessage.system.page.editSubTitle);

      stateUpdate({ 
        formMode: FormMode.Edit,
      });

      systemDetailRequest({
        category: categoryTypeTranslator(this.props.match.params.category),
        id: this.props.location.state.id
      });
    }

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.Common,
        parentUid: AppMenu.Lookup,
        title: intl.formatMessage({id: view.title}),
        subTitle : intl.formatMessage({id: view.subTitle})
      },
      parentUrl: '/common/system',
      status: {
        isNavBackVisible: true,
        isSearchVisible: false,
        isActionCentreVisible: false,
        isMoreVisible: false,
        isModeSearch: false
      }
    }); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, commonDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    commonDispatch.systemCreateDispose();
    commonDispatch.systemUpdateDispose();
  }
};

export default compose<CommonEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withCommonSystem,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<CommonEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<CommonEditorProps, {}>(lifecycles),
)(CommonEditorView);