import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupRolePostPayload, ILookupRolePutPayload } from '@lookup/classes/request/role';
import { IRole } from '@lookup/classes/response';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { LookupRoleFormData, LookupRoleMenuFormData } from './forms/LookupRoleForm';
import { LookupRoleEditorView } from './LookupRoleEditorView';

interface OwnHandlers {
  handleValidate: (payload: LookupRoleFormData) => FormErrors;
  handleSubmit: (payload: LookupRoleFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  roleUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  roleUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type RoleEditorProps
  = WithLookupRole
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<RoleEditorProps, OwnHandlers> = {
  handleValidate: (props: RoleEditorProps) => (formData: LookupRoleFormData) => {
    const errors = {
      information: {}
    };

    const requiredFields = [
      'companyUid', 'name',
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(lookupMessage.role.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: RoleEditorProps) => (formData: LookupRoleFormData) => {
    const { formMode, roleUid, intl } = props;
    const { user } = props.userState;
    const { response } = props.lookupRoleState.detail;
    const { createRequest, updateRequest } = props.lookupRoleDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const parsedRoleMenu = () => {
      const menus: any[] = [];
      const fillMenus = (item: LookupRoleMenuFormData) => {
        const _uid = Object.keys(item)[0];

        let uid: string | null = null;

        if (response && response.data) {
          const source = [
            ...response.data.menus
          ];

          const menu = source.find(mn => mn.menuUid === _uid);

          if (!isNullOrUndefined(menu)) {
            uid = menu.menuUid;
          }
        }

        menus.push({
          uid,
          _uid,
          isChecked: item[_uid]
        });
      };

      formData.menu.menus.forEach(fillMenus);

      return menus;
    };

    const payload = {
      ...formData.information,
      menus: parsedRoleMenu()
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          companyUid: payload.companyUid ? payload.companyUid : '',
          data: payload as ILookupRolePostPayload
        });
      });
    }

    // update checking
    if (!roleUid) {
      const message = intl.formatMessage(lookupMessage.role.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          roleUid,
          resolve,
          reject,
          companyUid: payload.companyUid ? payload.companyUid : '',
          data: payload as ILookupRolePutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: RoleEditorProps) => (response: IRole) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(lookupMessage.role.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(lookupMessage.role.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/lookup/roles/${response.uid}`);
  },
  handleSubmitFail: (props: RoleEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(lookupMessage.role.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(lookupMessage.role.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<RoleEditorProps, OwnState> = (props: RoleEditorProps): OwnState => ({ 
  formMode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<RoleEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.lookupRoleDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: lookupMessage.role.page.newTitle,
      subTitle: lookupMessage.role.page.newSubHeader,
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = lookupMessage.role.page.modifyTitle;
      view.subTitle = lookupMessage.role.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        roleUid: history.location.state.uid
      });

      loadDetailRequest({
        companyUid: history.location.state.companyUid,
        roleUid: history.location.state.uid
      });
    }

    layoutDispatch.changeView({
      uid: AppMenu.LookupRole,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage(view.title),
      subTitle : intl.formatMessage(view.subTitle)
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, lookupRoleDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    lookupRoleDispatch.createDispose();
    lookupRoleDispatch.updateDispose();
  }
};

export default compose<RoleEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withLookupRole,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<RoleEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<RoleEditorProps, {}>(lifecycles),
)(LookupRoleEditorView);
