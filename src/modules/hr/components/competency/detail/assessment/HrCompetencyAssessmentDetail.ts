import { IEmployeeListFilter } from '@account/classes/filters';
import { ISystemListFilter } from '@common/classes/filters';
import { WorkflowStatusType } from '@common/classes/types';
import { AppRole } from '@constants/AppRole';
import { FormMode } from '@generic/types';
import { IHrCompetencyAssessmentPutPayload } from '@hr/classes/request';
import { IHrCompetencyAssessment } from '@hr/classes/response';
import { IHrCompetencyAssessmentUserAction } from '@hr/classes/types';
import { WithHrCompetencyAssessment, withHrCompetencyAssessment } from '@hr/hoc/withHrCompetencyAssessment';
import { WithHrCompetencyEmployee, withHrCompetencyEmployee } from '@hr/hoc/withHrCompetencyEmployee';
import { WithHrCompetencyMapped, withHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
import { WithHrCompetencyResult, withHrCompetencyResult } from '@hr/hoc/withHrCompetencyResult';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { withStyles, WithStyles } from '@material-ui/core';
import { lightBlue, orange, red } from '@material-ui/core/colors';
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

import { ICompetencyAssessmentFormValue, StatusProps } from '../../form/assessment/CompetencyAssessmentForm';
import { HrCompetencyAssessmentDetailView } from './HrCompetencyAssessmentDetailView';

interface IOwnRouteParams {
  employeeUid: string;
  assessmentUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleOnModify: (value: FormMode) => void;
  handleOnSubmit: (values: ICompetencyAssessmentFormValue, actions: FormikActions<ICompetencyAssessmentFormValue>) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  isAdmin: boolean;
  action?: IHrCompetencyAssessmentUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;

  // Form
  formMode: FormMode;

  initialValues?: ICompetencyAssessmentFormValue;

  filterCompany?: ILookupCompanyGetListFilter;
  filterAccountEmployee?: IEmployeeListFilter;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICompetencyAssessmentFormValue>>>;
  
  filterCommonSystem?: ISystemListFilter;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

export type HrCompetencyAssessmentDetailProps
  = WithOidc
  & WithUser
  & WithMasterPage
  & WithHrCompetencyEmployee
  & WithHrCompetencyAssessment
  & WithHrCompetencyResult
  & WithHrCompetencyMapped
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<HrCompetencyAssessmentDetailProps, IOwnState> = (props: HrCompetencyAssessmentDetailProps): IOwnState => { 
    // checking admin status
    const { user } = props.oidcState;
    let isAdmin: boolean = false;
  
    if (user) {
      const role: string | string[] | undefined = user.profile.role;
  
      if (role) {
        if (Array.isArray(role)) {
          isAdmin = role.indexOf(AppRole.Admin) !== -1;
        } else {
          isAdmin = role === AppRole.Admin;
        }
      }
    }
    
    return { 
      isAdmin,
      shouldLoad: false,
      dialogFullScreen: false,
      dialogOpen: false,

      formMode: FormMode.View,

      // Form
      initialValues: {
        uid: 'Auto Generated',
        employeeUid: '',
        year: '',
        companyUid: '',
        positionUid: '',
        responder: []
      },
      filterAccountEmployee: {
        useAccess: true,
        orderBy: 'fullName',
        direction: 'ascending'
      },
      filterCompany: {
        orderBy: 'name',
        direction: 'ascending'
      },
    
      // validation props	
      validationSchema: Yup.object().shape<Partial<ICompetencyAssessmentFormValue>>({	
        year: Yup.string()	
          .label(props.intl.formatMessage(hrMessage.competency.field.year))	
          .required(),	
        companyUid: Yup.string()	
          .label(props.intl.formatMessage(hrMessage.competency.field.company))	
          .required(),	
        positionUid: Yup.string()	
          .label(props.intl.formatMessage(hrMessage.competency.field.position))	
          .required(),	
        employeeUid: Yup.string()	
          .label(props.intl.formatMessage(hrMessage.competency.field.employee))	
          .required(),	
        responder: Yup.array()	
          .of(	
            Yup.object().shape({	
              employeeUid: Yup.string()	
                .label(props.intl.formatMessage(hrMessage.competency.field.employee))	
                .required(),
                assessorType: Yup.string()	
                .label(props.intl.formatMessage(hrMessage.competency.field.assessorType))	
                .required()	
            })	
          )	
          .min(1, props.intl.formatMessage(hrMessage.competency.field.minResponder)),	
      }),
    
      filterCommonSystem: {
        orderBy: 'value',
        direction: 'ascending'
      }
  };
};

const stateUpdaters: StateUpdaters<HrCompetencyAssessmentDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: HrCompetencyAssessmentDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: HrCompetencyAssessmentDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: HrCompetencyAssessmentDetailProps) => (): Partial<IOwnState> => ({
    action: IHrCompetencyAssessmentUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.modifyTitle, {state: 'Assessment'}),
    dialogContent: props.intl.formatMessage(hrMessage.shared.confirm.modifyDescription, {state: 'assessment'}),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  }),

  // Form
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<HrCompetencyAssessmentDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyAssessmentDetailProps) => () => { 
    const { user } = props.userState;
    const assessmentUid = props.match.params.assessmentUid;
    const { isLoading } = props.hrCompetencyAssessmentState.detail;

    if (user && !isNullOrUndefined(props.history.location.state)) {
      if (assessmentUid && !isLoading) {
        props.hrCompetencyAssessmentDispatch.loadDetailRequest({
          assessmentUid
        });
  
        props.hrCompetencyEmployeeDispatch.loadResultRequest({
          filter: {
            assessmentUid,
            isHr: true
          }
        });
  
        const respondenUid = props.match.params.employeeUid;
        const companyUid = props.history.location.state.companyUid;
        const positionUid = props.history.location.state.positionUid;
        const assessmentYear = props.history.location.state.assessmentYear;
      
        if (positionUid && respondenUid && assessmentYear) {
          props.hrCompetencyResultDispatch.loadDetailListRequest({
            filter: {
              companyUid,
              positionUid,
              respondenUid,
              assessmentYear
            }
          });
          
          props.hrCompetencyMappedDispatch.loadListRequest({
            filter: {
              companyUid,
              positionUid
            }
          });
        }
  
      }
    }
  },
  handleOnSelectedMenu: (props: HrCompetencyAssessmentDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case IHrCompetencyAssessmentUserAction.Refresh:
        props.setShouldLoad();
        break;

      case IHrCompetencyAssessmentUserAction.Modify:
        props.setModify();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: HrCompetencyAssessmentDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: HrCompetencyAssessmentDetailProps) => () => {
    const { response } = props.hrCompetencyAssessmentState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let assessmentUid: string | undefined;

    // get project uid
    if (response.data) {
      assessmentUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      IHrCompetencyAssessmentUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1 && props.history.location.state) {
      let next: string = '404';

      switch (props.action) {
        case IHrCompetencyAssessmentUserAction.Modify:
          next = `/hr/assessment/result`;
          break;

        default:
          break;
      }

      props.setDefault();

      const respondenUid = props.match.params.employeeUid;
      const companyUid = props.history.location.state.companyUid;
      const positionUid = props.history.location.state.positionUid;
      const assessmentYear = props.history.location.state.assessmentYear;

      props.history.push(next, { 
        assessmentUid,
        respondenUid,
        companyUid,
        positionUid,
        assessmentYear,
      });
    }
  },
  handleOnSubmit: (props: HrCompetencyAssessmentDetailProps) => (values: ICompetencyAssessmentFormValue, actions: FormikActions<ICompetencyAssessmentFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {

      // Edit
      if (props.formMode === FormMode.Edit) {
        const assessmentUid = props.match.params.assessmentUid;

        // must have assessmentUid
        if (assessmentUid) {
          const payload: IHrCompetencyAssessmentPutPayload = {
            companyUid: values.companyUid,
            positionUid: values.positionUid,
            employeeUid: values.employeeUid,
            assessmentYear: Number(values.year),
            responders: []
          };

          // fill responder
          values.responder.forEach(item => payload.responders.push({
            uid: item.uid,
            employeeUid: item.employeeUid,
            assessorType: item.assessorType
          }));

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.hrCompetencyAssessmentDispatch.updateRequest({
              assessmentUid,
              resolve,
              reject,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IHrCompetencyAssessment) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Assessment', type: 'responden', uid: response.employee.fullName })
        });

        props.stateUpdate({
          formMode: FormMode.View
        });
        
        // Reload
        props.setShouldLoad();

        // redirect to detail
        // props.history.push(`/hr/assessment/${response.employeeUid}/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createFailure : hrMessage.shared.message.updateFailure)
        });
      });
  },
  handleOnModify: (props: HrCompetencyAssessmentDetailProps) => (value: FormMode) => {
    props.stateUpdate({
      formMode: value
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyAssessmentDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: HrCompetencyAssessmentDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.assessmentUid !== prevProps.match.params.assessmentUid) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.hrCompetencyAssessmentState.detail.response !== prevProps.hrCompetencyAssessmentState.detail.response) {
      const { isLoading, response } = this.props.hrCompetencyAssessmentState.detail;

      let isClosed: boolean = false;

      if (response && response.data) {
        isClosed = response.data.statusType === WorkflowStatusType.Closed;
      }
      const options: IPopupMenuOption[] = [
        {
          id: IHrCompetencyAssessmentUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: IHrCompetencyAssessmentUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.result),
          enabled: true,
          visible: !isClosed
        }
      ];

      this.props.setOptions(options);
    }

    // Form
    const { response: thisResponse } = this.props.hrCompetencyAssessmentState.detail;
    const { response: prevResponse } = prevProps.hrCompetencyAssessmentState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: ICompetencyAssessmentFormValue = {
            uid: thisResponse.data.uid,
            companyUid: thisResponse.data.companyUid,
            positionUid: thisResponse.data.positionUid,
            employeeUid: thisResponse.data.employeeUid,
            employeeName: thisResponse.data.employee.fullName,
            year: thisResponse.data.assessmentYear.toString(),
            responder: [],
        };
        
        const getStatus = (isRespond: boolean, isComplete: boolean, isExpired: boolean) => {
          let status: StatusProps | undefined = undefined;

          if (!isExpired && !isRespond && !isComplete) {
            return status = {
              color: orange[500],
              type: this.props.intl.formatMessage(hrMessage.competency.field.assigned)
            };
          }

          if (isExpired && !isRespond && !isComplete) {
            return status = {
              color: red[500],
              type: this.props.intl.formatMessage(hrMessage.competency.field.expired)
            };
          }

          if (isComplete || isRespond) {
            if (isComplete) {
              return status = {
                color: lightBlue[500],
                type: this.props.intl.formatMessage(hrMessage.competency.field.complete)
              };
            }

            return status = {
              color: lightBlue[500],
              type: this.props.intl.formatMessage(hrMessage.competency.field.respond)
            };
          }
          return status;
        };

        // fill categories
        thisResponse.data.responders.forEach(item => initialValues.responder.push({
          uid: item.uid,
          employeeUid: item.employeeUid,
          employeeName: item.employee.fullName,
          assessorType: item.assessorType,
          assessorName: item.assessor && item.assessor.value || '',
          status: getStatus(item.isRespond, item.isComplete, item.isExpired)
        }));

        this.props.setInitialValues(initialValues);
      }
    }
  }
}; 

export const HrCompetencyAssessmentDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withMasterPage,
  withHrCompetencyEmployee,
  withHrCompetencyAssessment,
  withHrCompetencyResult,
  withHrCompetencyMapped,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles),
  lifecycle(lifecycles),
  setDisplayName('HrCompetencyAssessmentDetail')
)(HrCompetencyAssessmentDetailView);