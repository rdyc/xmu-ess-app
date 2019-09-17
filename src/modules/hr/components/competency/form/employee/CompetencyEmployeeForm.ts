import { FormMode } from '@generic/types';
import { IHrCompetencyEmployeePatchPayload } from '@hr/classes/request';
import { IHrCompetencyEmployee } from '@hr/classes/response';
import { WithHrCompetencyEmployee, withHrCompetencyEmployee } from '@hr/hoc/withHrCompetencyEmployee';
import { WithHrCompetencyMapped, withHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { DraftType } from '@layout/components/submission/DraftType';
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

import { CompetencyEmployeeFormView } from './CompetencyEmployeeFormView';

export interface ILevelOption {
  // [key: string]: string;
  uid?: string;
  categoryUid: string;
  levelUid: string;
  note?: string;
}

export interface ICompetencyEmployeeFormValue {
  respondenUid: string;
  companyUid: string;
  positionUid: string;
  levelRespond: ILevelOption[];
}

interface IOwnRouteParams {
  // 
}

interface IOwnOption {
  //
}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ICompetencyEmployeeFormValue;
  // validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICompetencyEmployeeFormValue>>>;

  filterCompany?: ILookupCompanyGetListFilter;

  saveType: DraftType;
  isUpdatedValue: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICompetencyEmployeeFormValue, actions: FormikActions<ICompetencyEmployeeFormValue>) => void;
  handleSaveType: (saveType: DraftType) => void;
  handleIsUpdatedValue: () => void;
}

export type CompetencyEmployeeFormProps
  = WithMasterPage
  & WithHrCompetencyEmployee
  & WithHrCompetencyMapped
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<CompetencyEmployeeFormProps, IOwnState> = (props: CompetencyEmployeeFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    respondenUid: '',
    companyUid: '',
    positionUid: '',
    levelRespond: []
  },
  saveType: DraftType.draft,
  isUpdatedValue: false,

  // filter
  filterCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<CompetencyEmployeeFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<CompetencyEmployeeFormProps, IOwnHandler> = {
  handleSaveType: (props: CompetencyEmployeeFormProps) => (saveType: DraftType) => {
    const { stateUpdate } = props;

    stateUpdate({
      saveType
    });
  },
  handleIsUpdatedValue: (props: CompetencyEmployeeFormProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      isUpdatedValue: true
    });
  },
  handleOnLoadDetail: (props: CompetencyEmployeeFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const competencyEmployeeUid = props.history.location.state.uid;
      const { isLoading } = props.hrCompetencyEmployeeState.detail;

      if (user && competencyEmployeeUid && !isLoading) {
        props.hrCompetencyEmployeeDispatch.loadDetailRequest({
          competencyEmployeeUid
        });
      }
    }
  },
  handleOnSubmit: (props: CompetencyEmployeeFormProps) => (values: ICompetencyEmployeeFormValue, actions: FormikActions<ICompetencyEmployeeFormValue>) => {
    console.log('save type', props.saveType);
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // Edit
      if (props.formMode === FormMode.Edit) {
        const competencyEmployeeUid = props.history.location.state.uid;
        
        // must have competencyEmployeeUid
        if (competencyEmployeeUid) {
          const respondenUid = values.respondenUid;
          const positionUid = values.positionUid;

          const payload: IHrCompetencyEmployeePatchPayload = {
            items: [],
            isDraft: props.saveType === DraftType.draft ? true : false
          };

          // fill responder
          values.levelRespond.forEach(item =>
            item.levelUid &&
            payload.items.push({
              uid: item.uid,
              categoryUid: item.categoryUid,
              levelUid: item.levelUid
            })
          );

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.hrCompetencyEmployeeDispatch.patchRequest({
              competencyEmployeeUid,
              respondenUid,
              positionUid,
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
      .then((response: IHrCompetencyEmployee) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Assessment Input', uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/hr/assessmentinput/${response.uid}`);
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
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CompetencyEmployeeFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentWillUpdate(nextProps: CompetencyEmployeeFormProps) {
    const { response: thisResponse } = this.props.hrCompetencyEmployeeState.detail; 
    const { response: nextResponse } = nextProps.hrCompetencyEmployeeState.detail;
    const { response } = this.props.hrCompetencyMappedState.list;

    if (!response) {
      if (thisResponse !== nextResponse) {
        if (nextResponse && nextResponse.data) {
          this.props.hrCompetencyMappedDispatch.loadListRequest({
            filter: {
              positionUid: nextResponse.data.positionUid
            }
          });
        }
      }
    }
  },
  componentDidUpdate(prevProps: CompetencyEmployeeFormProps) {
    const { response: thisResponse } = this.props.hrCompetencyEmployeeState.detail;
    // const { response: prevResponse } = prevProps.hrCompetencyEmployeeState.detail;
    const { response: thisMapped } = this.props.hrCompetencyMappedState.list;
    // const { response: prevMapped } = prevProps.hrCompetencyMappedState.list;

    // if (thisResponse !== prevResponse) {
    if (thisResponse && thisResponse.data && 
        thisMapped && thisMapped.data 
        && !this.props.isUpdatedValue) {

        console.log('thisMapped', thisMapped);
        
        // define initial values
        const initialValues: ICompetencyEmployeeFormValue = {
          respondenUid: thisResponse.data.respondenUid,
          companyUid: thisResponse.data.position && thisResponse.data.position.companyUid || 'N/A',
          positionUid: thisResponse.data.positionUid,
          levelRespond: []
        };

        // fill 
        thisMapped.data[0].categories.forEach(item => {
          const find = thisResponse.data.items.find(findData => findData.categoryUid === item.category.uid);

          initialValues.levelRespond.push({
            uid: find && find.uid || '',
            categoryUid: item.category.uid,
            levelUid: find && find.levelUid || ''
          });  
        });
        this.props.setInitialValues(initialValues);
        this.props.handleIsUpdatedValue();
    }
    // }
  }
};

export const CompetencyEmployeeForm = compose<CompetencyEmployeeFormProps, IOwnOption>(
  setDisplayName('CompetencyEmployeeForm'),
  withHrCompetencyEmployee,
  withHrCompetencyMapped,
  withMasterPage,
  withRouter,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(CompetencyEmployeeFormView);