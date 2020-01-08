import { IEmployeeExperiencePostPayload, IEmployeeExperiencePutPayload } from '@account/classes/request/employeeExperience';
import { IEmployeeExperience } from '@account/classes/response/employeeExperience';
import { WithAccountEmployeeExperience, withAccountEmployeeExperience } from '@account/hoc/withAccountEmployeeExperience';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
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
import * as Yup from 'yup';
import { ExperienceFormView } from './ExperienceFormView';

interface IExperienceCompetency {
  uid?: string;
  label: string;
  value: string;
  isChecked: boolean;
}

export interface IExperienceFormValue {
  uid: string;
  employeeUid: string;
  company: string;
  position: string;
  professionType: string;
  competencies: IExperienceCompetency[];
  start: string;
  end: string;
}

interface IOwnRouteParams {
  employeeUid: string;
  experienceUid: string;  
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  filterCommonSystem: ISystemListFilter;
  initialValues?: IExperienceFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IExperienceFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setInitialCompetenciesValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnLoadCompetencies: () => void;
  handleOnSubmit: (values: IExperienceFormValue, actions: FormikActions<IExperienceFormValue>) => void;
}

export type ExperienceFormProps
  = WithAccountEmployeeExperience
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

const createProps: mapper<ExperienceFormProps, IOwnState> = (props: ExperienceFormProps): IOwnState => ({
  // form props
  formMode: (props.history.location.state === undefined || props.history.location.state === null) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    // information
    employeeUid: props.match.params.employeeUid,
    uid: 'Auto Generated',
    company: '',
    position: '',
    professionType: '',
    competencies: [],
    start: '',
    end: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IExperienceFormValue>>({
    // information
    company: Yup.string()
      .label(props.intl.formatMessage(accountMessage.experience.field.company))
      .required(),

    position: Yup.string()
      .label(props.intl.formatMessage(accountMessage.experience.field.position))
      .required(),

    professionType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.experience.field.profession))
      .required(),

    start: Yup.string()
      .label(props.intl.formatMessage(accountMessage.experience.field.start))
      .required(),

    end: Yup.string()
      .label(props.intl.formatMessage(accountMessage.experience.field.end))
      .required(),
  }),

  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<ExperienceFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setInitialCompetenciesValues: (state: IOwnState) => (values: any): Partial<IOwnState> => {
    const initialValues = state.initialValues;

    if (initialValues) {
      initialValues.competencies = values;
    }

    return {
      initialValues
    };
  }
};

const handlerCreators: HandleCreators<ExperienceFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: ExperienceFormProps) => () => {
    const { history } = props;

    if (!(history.location.state === undefined || history.location.state === null)) {
      const user = props.userState.user;
      const employeeUid = props.match.params.employeeUid;
      const experienceUid = props.history.location.state.experienceUid;
      const { isLoading } = props.accountEmployeeExperienceState.detail;

      if (user && employeeUid && experienceUid && !isLoading) {
        props.accountEmployeeExperienceDispatch.loadDetailRequest({
          employeeUid,
          experienceUid
        });
      }
    }
  },
  handleOnLoadCompetencies: (props: ExperienceFormProps) => () => {
    const { isLoading } = props.commonCompetencyListState;

    if (!isLoading) {
      props.commonDispatch.competencyListRequest({
        filter: props.filterCommonSystem,
        category: 'competency'
      });
    }
  },
  handleOnSubmit: (props: ExperienceFormProps) => (values: IExperienceFormValue, actions: FormikActions<IExperienceFormValue>) => {
    const { user } = props.userState;
    const employeeUid = props.match.params.employeeUid;
    let promise = new Promise((resolve, reject) => undefined);

    if (user && employeeUid) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IEmployeeExperiencePostPayload = {
          company: values.company,
          position: values.position,
          professionType: values.professionType,
          start: Number(values.start),
          end: Number(values.end),
          competencies: []
        };

        // fill payload competencies
        values.competencies.forEach(item => payload.competencies.push({
          competencyType: item.value,
          isChecked: item.isChecked
        }));

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.accountEmployeeExperienceDispatch.createRequest({
            resolve,
            reject,
            employeeUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const experienceUid = props.history.location.state.experienceUid;

        // must have experienceUid
        if (experienceUid) {
          const payload: IEmployeeExperiencePutPayload = {
            experienceUid: values.uid,
            company: values.company,
            position: values.position,
            professionType: values.professionType,
            start: Number(values.start),
            end: Number(values.end),
            competencies: []
          };

          // fill payload competencies
          values.competencies.forEach(item => payload.competencies.push({
            uid: item.uid,
            competencyType: item.value,
            isChecked: item.isChecked
          }));

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.accountEmployeeExperienceDispatch.updateRequest({
              resolve,
              reject,
              employeeUid,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IEmployeeExperience) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createSuccess : accountMessage.shared.message.updateSuccess, { uid: response.uid, state: 'Experience' })
        });

        // redirect to detail
        props.history.push(`/account/employee/${employeeUid}/experience/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createFailure : accountMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ExperienceFormProps, IOwnState> = {
  componentDidMount() {
    this.props.handleOnLoadCompetencies();
    // if (!this.props.commonCompetencyListState.response) {
    // }
    // // new mode
    // if ((this.props.history.location.state)) {
    //   // load common system
    //   this.props.handleOnLoadCompetencies();
    // }
  },
  componentDidUpdate(prevProps: ExperienceFormProps) {
    const { response: thisResponse } = this.props.accountEmployeeExperienceState.detail;
    const { response: prevResponse } = prevProps.accountEmployeeExperienceState.detail;
    const { response: thisCompetency } = this.props.commonCompetencyListState;
    const { initialValues: initVal } = this.props;

    // handle competency response
    if (initVal && initVal.competencies.length === 0) {
      if (thisCompetency && thisCompetency.data) {
        const checklist: IExperienceCompetency[] = [];

        thisCompetency.data.forEach(item => checklist.push({
          label: item.name,
          value: item.type,
          isChecked: false
        }));

        this.props.setInitialCompetenciesValues(checklist);
      }
    }

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IExperienceFormValue = {
            uid: thisResponse.data.uid,
            employeeUid: this.props.match.params.employeeUid,
            company: thisResponse.data.company,
            position: thisResponse.data.position,
            professionType: thisResponse.data.professionType,
            start: (thisResponse.data.start).toString(),
            end: (thisResponse.data.end).toString(),
            competencies: []
        };

        // fill competencies
        thisResponse.data.competencies.forEach(item => initialValues.competencies.push({
          uid: item.uid,
          label: item.competency && item.competency.value || item.competencyType,
          value: item.competencyType,
          isChecked: item.isAvailable
        }));

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const ExperienceForm = compose<ExperienceFormProps, IOwnOption>(
  setDisplayName('ExperienceForm'),
  withUser,
  withMasterPage,
  withRouter,
  withAccountEmployeeExperience,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(ExperienceFormView);