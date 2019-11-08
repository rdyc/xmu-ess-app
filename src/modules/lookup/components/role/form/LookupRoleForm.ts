import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { ILookupRolePostPayload, ILookupRolePutPayload, RoleMenuPayload } from '@lookup/classes/request/role';
import { IRole } from '@lookup/classes/response';
import { Menus } from '@lookup/classes/types';
import { WithLookupMenu, withLookupMenu } from '@lookup/hoc/withLookupMenu';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { FormikActions } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
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
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { LookupRoleFormView } from './LookupRoleFormView';

export interface IRoleFormValue {
  uid: string;
  companyUid: string;
  name: string;
  gradeType?: string;
  description?: string;
  isActive: boolean;
  menus: Menus[];
}

interface IOwnRouteParams {
  roleUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IRoleFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IRoleFormValue>>>;

  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterCommonSystem?: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IRoleFormValue, actions: FormikActions<IRoleFormValue>) => void;
}

export type RoleFormProps
  = WithLookupRole
  & WithLookupMenu
  & WithCommonSystem
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<RoleFormProps, IOwnState> = (props: RoleFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    companyUid: '',
    name: '',
    gradeType: '',
    description: '',
    isActive: false,
    menus: []
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IRoleFormValue>>({
    name: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.role.field.name))
      .required(),

    companyUid: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.role.field.companyUid))
      .required(),

    gradeType: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.role.field.gradeType)),

    description: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.role.field.description)),

    isActive: Yup.boolean()
      .label(props.intl.formatMessage(lookupMessage.role.field.isActive))
      .required(),
  }),

  // filter props
  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },

  filterCommonSystem: {
    orderBy: 'uid',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<RoleFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<RoleFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: RoleFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const roleUid = props.history.location.state.uid;
      const companyUid = props.history.location.state.companyUid;
      const { isLoading } = props.lookupRoleState.detail;

      if (user && companyUid && roleUid && !isLoading) {
        props.lookupRoleDispatch.loadDetailRequest({
          companyUid,
          roleUid
        });
      }
    }
  },
  handleOnSubmit: (props: RoleFormProps) => (values: IRoleFormValue, actions: FormikActions<IRoleFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // fill menu for payload
      const menuPayload: RoleMenuPayload[] = [];
      values.menus.map(item => 
        menuPayload.push({menuUid: item.uid, isAccess: item.isAccess})  
      );

      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        
        const payload: ILookupRolePostPayload = {
          name: values.name,
          gradeType: values.gradeType,  
          description: values.description,
          isActive: values.isActive,
          menus: menuPayload
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.lookupRoleDispatch.createRequest({
            resolve,
            reject,
            companyUid: values.companyUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const roleUid = props.history.location.state.uid;

        // must have roleUid
        if (roleUid) {
          const payload: ILookupRolePutPayload = {
            name: values.name,
            gradeType: values.gradeType,  
            description: values.description,
            isActive: values.isActive,
            menus: menuPayload
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.lookupRoleDispatch.updateRequest({
              roleUid,
              resolve,
              reject,
              companyUid: values.companyUid,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IRole) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.role.message.createSuccess : lookupMessage.role.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/lookup/roles/${response.uid}`, { companyUid: response.companyUid });
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (error.errors) {
          error.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.role.message.createFailure : lookupMessage.role.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<RoleFormProps, IOwnState> = {
  componentDidMount() {
    const { lookupMenuState, lookupMenuDispatch } = this.props;
    
    if (!lookupMenuState.list.response) {
      lookupMenuDispatch.loadListRequest({
        filter: {
          orderBy: 'uid',
          direction: 'ascending'
        }
      });
    } else if (lookupMenuState.list.response && lookupMenuState.list.response.data) {
      const menuList: Menus[] = [];
      lookupMenuState.list.response.data.map(item => 
        menuList.push({
          uid: item.uid,
          parentUid: item.parentUid,
          name: item.name || '',
          isAccess: false
        })  
      );

      const initialValues: IRoleFormValue = {
        uid: 'Auto Generated',
        companyUid: '',
        name: '',
        gradeType: '',  
        description: '',
        isActive: false,
        menus: menuList
      };

      this.props.setInitialValues(initialValues);
    }
  },
  componentWillUpdate(nextProps: RoleFormProps) {
    const { response: thisResponse } = this.props.lookupMenuState.list;
    const { response: nextResponse} = nextProps.lookupMenuState.list;

    if (this.props.formMode === FormMode.New) {
      if (thisResponse !== nextResponse) {
        if (nextResponse && nextResponse.data) {
          const menuList: Menus[] = [];
          nextResponse.data.map(item => 
            menuList.push({
              uid: item.uid,
              parentUid: item.parentUid,
              name: item.name || '',
              isAccess: false
            })  
          );
  
          const initialValues: IRoleFormValue = {
            uid: 'Auto Generated',
            companyUid: '',
            name: '',
            gradeType: '',  
            description: '',
            isActive: false,
            menus: menuList
          };
  
          this.props.setInitialValues(initialValues);
        }
      }
    }
  },
  componentDidUpdate(prevProps: RoleFormProps) {
    const { response: thisResponse } = this.props.lookupRoleState.detail;
    const { response: prevResponse } = prevProps.lookupRoleState.detail;
    const { response: menuResponse } = this.props.lookupMenuState.list;
    const { formMode } = this.props;

    if (formMode === FormMode.Edit) {
      if (thisResponse !== prevResponse) {
        if (thisResponse && thisResponse.data) {
          const menuList: Menus[] = [];
          if (menuResponse && menuResponse.data) {
            menuResponse.data.map(item => {

              menuList.push({
                uid: item.uid,
                parentUid: item.parentUid,
                name: item.name || '',
                isAccess: Boolean(thisResponse.data.menus && thisResponse.data.menus.find(menu => item.uid === menu.menuUid && menu.isAccess)) || false
              });
            });
          }
          const initialValues: IRoleFormValue = {
            uid: thisResponse.data.uid,
            companyUid: thisResponse.data.companyUid,
            name: thisResponse.data.name,
            gradeType: thisResponse.data.gradeType || '',  
            description: thisResponse.data.description || '',
            isActive: thisResponse.data.isActive,
            menus: menuList
          };
  
          this.props.setInitialValues(initialValues);
        }
      }
    }
  }
};

export const LookupRoleForm = compose<RoleFormProps, IOwnOption>(
  setDisplayName('LookupRoleForm'),
  withUser,
  withMasterPage,
  withRouter,
  withLookupRole,
  withLookupMenu,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LookupRoleFormView);