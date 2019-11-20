import { FormMode } from '@generic/types';
import { IHrCompetencyEmployeePatchPayload } from '@hr/classes/request';
import { IHrCompetencyEmployee } from '@hr/classes/response';
import { WithHrCompetencyAssessment, withHrCompetencyAssessment } from '@hr/hoc/withHrCompetencyAssessment';
import { WithHrCompetencyEmployee, withHrCompetencyEmployee } from '@hr/hoc/withHrCompetencyEmployee';
import { WithHrCompetencyMapped, withHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
import { WithHrCompetencyResult, withHrCompetencyResult } from '@hr/hoc/withHrCompetencyResult';
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
import * as Yup from 'yup';

import { CompetencyResultFormView } from './CompetencyResultFormView';

export interface ILevelOption {
  uid?: string;
  categoryUid?: string;
  levelUid?: string;
  note?: string;
  noteHistory?: string;
}

export interface ICompetencyResultFormValue {
  uid: string;
  respondenUid: string;
  companyUid: string;
  positionUid: string;
  year: string;
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

  initialValues?: ICompetencyResultFormValue;

  filterCompany?: ILookupCompanyGetListFilter;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICompetencyResultFormValue>>>;

  saveType: DraftType;
  isLoad: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  setLoad: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICompetencyResultFormValue, actions: FormikActions<ICompetencyResultFormValue>) => void;
  handleSaveType: (saveType: DraftType) => void;
}

export type CompetencyResultFormProps
  = WithMasterPage
  & WithHrCompetencyEmployee
  & WithHrCompetencyAssessment
  & WithHrCompetencyResult
  & WithHrCompetencyMapped
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<CompetencyResultFormProps, IOwnState> = (props: CompetencyResultFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  isLoad: false,

  // form values
  initialValues: {
    uid: '',
    respondenUid: '',
    companyUid: '',
    positionUid: '',
    year: '',
    levelRespond: []
  },
  saveType: DraftType.draft,

  // filter
  filterCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICompetencyResultFormValue>>({
    levelRespond: Yup.array()
      .of(
        Yup.object().shape({
          note: Yup.string()
            .label(props.intl.formatMessage(hrMessage.competency.field.note))
            .max(300)
            .when('levelUid', ({
              is: (lvl: any) => lvl !== '',
              then: Yup.string().required()
            }))
            .test('5 words minimum', props.intl.formatMessage(hrMessage.competency.field.minNote), (val) => {
              if (val !== undefined) {
                if (val.match(/[\w]+/ig) && val.match(/[\w]+/ig).length >= 5) {
                  return true;
                }
              } else {
                return true;
              }

              return false;
            })
        })
      )
  })
});

const stateUpdaters: StateUpdaters<CompetencyResultFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setLoad: () => (values: any): Partial<IOwnState> => ({
    isLoad: values
  }),
};

const handlerCreators: HandleCreators<CompetencyResultFormProps, IOwnHandler> = {
  handleSaveType: (props: CompetencyResultFormProps) => (saveType: DraftType) => {
    const { stateUpdate } = props;

    stateUpdate({
      saveType
    });
  },
  handleOnLoadDetail: (props: CompetencyResultFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      // const competencyEmployeeUid = props.history.location.state.uid;
      const assessmentUid = props.history.location.state.assessmentUid;
      // const { isLoading, response } = props.hrCompetencyEmployeeState.detail;

      // if (user && competencyEmployeeUid && !isLoading && (!response || response && response.data.uid !== competencyEmployeeUid)) {
      //   props.hrCompetencyEmployeeDispatch.loadDetailRequest({
      //     competencyEmployeeUid
      //   });
      // }

      if (user) {
        props.hrCompetencyAssessmentDispatch.loadDetailRequest({
          assessmentUid
        });
  
        props.hrCompetencyEmployeeDispatch.loadResultRequest({
          filter: {
            assessmentUid,
            isHr: true
          }
        });
  
        const companyUid = props.history.location.state.companyUid;
        const positionUid = props.history.location.state.positionUid;
        const respondenUid = props.history.location.state.respondenUid;
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
  handleOnSubmit: (props: CompetencyResultFormProps) => (values: ICompetencyResultFormValue, actions: FormikActions<ICompetencyResultFormValue>) => {
    const { user } = props.userState;
    const { response: resultResponse } = props.hrCompetencyEmployeeState.result;

    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // Edit
      if (props.formMode === FormMode.Edit && resultResponse) {
        const competencyEmployeeUid = resultResponse.data.uid;
        
        // must have competencyEmployeeUid
        if (competencyEmployeeUid) {

          const payload: IHrCompetencyEmployeePatchPayload = {
            respondenUid: values.respondenUid,
            companyUid: values.companyUid,
            positionUid: values.positionUid,
            items: [],
            isDraft: props.saveType === DraftType.draft ? true : false
          };

          // fill responder
          values.levelRespond.forEach(item =>
            item.categoryUid &&
            item.levelUid &&
            payload.items.push({
              uid: item.uid,
              categoryUid: item.categoryUid,
              levelUid: item.levelUid,
              note: item.note
            })
          );

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.hrCompetencyResultDispatch.patchRequest({
              competencyEmployeeUid,
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
          message: props.intl.formatMessage(hrMessage.shared.message.updateSuccess, {state: 'Assessment Result', type: 'name', uid: (response.responden && response.responden.fullName) })
        });

        let companyUid: string | undefined;
        let positionUid: string | undefined;
        let assessmentYear: string | undefined;
        let assessmentUid: string | undefined;

        if (props.history.location.state) {
          companyUid = props.history.location.state.companyUid;
          positionUid = props.history.location.state.positionUid;
          assessmentYear = props.history.location.state.assessmentYear;
          assessmentUid = props.history.location.state.assessmentUid;
        }

        // redirect to detail
        props.history.push(`/hr/assessment/${response.respondenUid}/${assessmentUid}`, {companyUid, positionUid, assessmentYear});
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
          message: props.intl.formatMessage(hrMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CompetencyResultFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentWillUpdate(nextProps: CompetencyResultFormProps) {
    // 
  },
  componentDidUpdate(prevProps: CompetencyResultFormProps) {
    const { response: thisResponse, } = this.props.hrCompetencyEmployeeState.result;
    const { response: thisMapped } = this.props.hrCompetencyMappedState.list;
    const { isLoad, setLoad, history } = this.props;

    if (history.location.state) {
      if (thisResponse && thisResponse.data.assessmentUid === history.location.state.assessmentUid) {
        if (thisResponse && thisResponse.data && thisMapped && thisMapped.data && !isLoad) {
            
            // define initial values
            const initialValues: ICompetencyResultFormValue = {
              uid: thisResponse.data.uid,
              respondenUid: thisResponse.data.respondenUid,
              companyUid: thisResponse.data.companyUid,
              positionUid: thisResponse.data.positionUid,
              year: thisResponse.data.assessmentYear.toString(),
              levelRespond: []
            };
    
            thisMapped.data[0].categories.forEach(item => {
              const find = thisResponse.data.items.find(findData => findData.categoryUid === item.category.uid);
    
              initialValues.levelRespond.push({
                uid: find && find.uid || '',
                categoryUid: item.category.uid,
                levelUid: find && find.levelUid || '',
                noteHistory: find && find.note || '',
                note: find && find.latestNote
              });  
            });
    
            setLoad(true);
            this.props.setInitialValues(initialValues);
        }
      }
    }
  }
};

export const CompetencyResultForm = compose<CompetencyResultFormProps, IOwnOption>(
  setDisplayName('CompetencyResultForm'),
  withHrCompetencyEmployee,
  withHrCompetencyResult,
  withHrCompetencyAssessment,
  withHrCompetencyMapped,
  withMasterPage,
  withRouter,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(CompetencyResultFormView);