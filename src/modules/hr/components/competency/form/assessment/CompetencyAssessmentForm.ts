import { IEmployeeListFilter } from '@account/classes/filters';
// import { ICommonSystem } from '@common/classes';
import { ISystemListFilter } from '@common/classes/filters';
import { FormMode } from '@generic/types';
import { IHrCompetencyAssessmentPostPayload, IHrCompetencyAssessmentPutPayload } from '@hr/classes/request';
import { IHrCompetencyAssessment } from '@hr/classes/response';
import { withHrCompetencyAssessment, WithHrCompetencyAssessment } from '@hr/hoc/withHrCompetencyAssessment';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
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

import { CompetencyAssessmentFormView } from './CompetencyAssessmentFormView';

export interface StatusProps {
  type: string;
  color: string;
}

export interface IResponderEmployee {
  uid?: string;
  assessorType: string;
  assessorName?: string;
  employeeUid: string;
  employeeName?: string;
  status?: StatusProps;
  dueDate?: string;
}

export interface ICompetencyAssessmentFormValue {
  uid: string;
  year: string;
  companyUid: string;
  positionUid: string;
  employeeUid: string;
  employeeName?: string;
  responder: IResponderEmployee[];
}

interface IOwnRouteParams {
  employeeUid: string;
}

interface IOwnOption {
  //
}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ICompetencyAssessmentFormValue;

  filterCompany?: ILookupCompanyGetListFilter;
  filterAccountEmployee?: IEmployeeListFilter;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICompetencyAssessmentFormValue>>>;
  
  filterCommonSystem?: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICompetencyAssessmentFormValue, actions: FormikActions<ICompetencyAssessmentFormValue>) => void;
}

export type CompetencyAssessmentFormProps
  = WithMasterPage
  & WithHrCompetencyAssessment
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<CompetencyAssessmentFormProps, IOwnState> = (props: CompetencyAssessmentFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
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
});

const stateUpdaters: StateUpdaters<CompetencyAssessmentFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<CompetencyAssessmentFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: CompetencyAssessmentFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const assessmentUid = props.history.location.state.uid;
      const { isLoading } = props.hrCompetencyAssessmentState.detail;

      if (user && assessmentUid && !isLoading) {
        props.hrCompetencyAssessmentDispatch.loadDetailRequest({
          assessmentUid
        });
      }
    }
  },
  handleOnSubmit: (props: CompetencyAssessmentFormProps) => (values: ICompetencyAssessmentFormValue, actions: FormikActions<ICompetencyAssessmentFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IHrCompetencyAssessmentPostPayload = {
          companyUid: values.companyUid,
          positionUid: values.positionUid,
          employeeUid: values.employeeUid,
          assessmentYear: Number(values.year),
          responders: []
        };

        // fill responder
        values.responder.forEach(item => payload.responders.push({
          employeeUid: item.employeeUid,
          assessorType: item.assessorType
        }));

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.hrCompetencyAssessmentDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const assessmentUid = props.history.location.state.uid;

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

        // redirect to detail
        props.history.push(`/hr/assessment/${response.employeeUid}/${response.uid}`, { companyUid: response.companyUid, positionUid: response.positionUid, assessmentYear: response.assessmentYear });
      })
      .catch((error: any) => {
        let err: IValidationErrorResponse | undefined = undefined;
        
        if (error.id) {
          err = error;
        }
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (err && err.errors) {
          err.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createFailure : hrMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CompetencyAssessmentFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: CompetencyAssessmentFormProps) {
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

        // fill categories
        thisResponse.data.responders.forEach(item => initialValues.responder.push({
          uid: item.uid,
          employeeUid: item.employeeUid,
          employeeName: item.employee.fullName,
          assessorType: item.assessorType,
          assessorName: item.assessor && item.assessor.value || '',
          dueDate: item.dueDate
        }));

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const CompetencyAssessmentForm = compose<CompetencyAssessmentFormProps, IOwnOption>(
  setDisplayName('CompetencyAssessmentForm'),
  withHrCompetencyAssessment,
  withMasterPage,
  withRouter,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(CompetencyAssessmentFormView);