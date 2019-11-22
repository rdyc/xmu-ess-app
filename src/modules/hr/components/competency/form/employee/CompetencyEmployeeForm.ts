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
import * as Yup from 'yup';

import { CompetencyEmployeeFormView } from './CompetencyEmployeeFormView';

export interface ILevelOption {
  uid?: string;
  categoryUid?: string;
  levelUid?: string;
  note?: string;
}

export interface ICompetencyEmployeeFormValue {
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

  initialValues?: ICompetencyEmployeeFormValue;
  filterCompany?: ILookupCompanyGetListFilter;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICompetencyEmployeeFormValue>>>;

  saveType: DraftType;
  isLoad: boolean;
  isMappedLoad: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  setLoad: StateHandler<IOwnState>;
  setMappedLoad: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICompetencyEmployeeFormValue, actions: FormikActions<ICompetencyEmployeeFormValue>) => void;
  handleSaveType: (saveType: DraftType) => void;
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
  
  isLoad: false,
  isMappedLoad: false,
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
  validationSchema: Yup.object().shape<Partial<ICompetencyEmployeeFormValue>>({
    levelRespond: Yup.array()
      .of(
        Yup.object().shape({
          note: Yup.string()
            .max(300)
            .label(props.intl.formatMessage(hrMessage.competency.field.note))
            .when('levelUid', ({
              is: (lvl: any) => lvl !== '',
              then: Yup.string().required()
            }))
            .test('5 words minimum', props.intl.formatMessage(hrMessage.competency.field.minNote), (val) => {
              if (val !== undefined) {
                // With symboll
                // val.replace(/\s{2,}/g, ' ').replace(/^\s/, '').split(' ').length >= 5
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

const stateUpdaters: StateUpdaters<CompetencyEmployeeFormProps, IOwnState, IOwnStateUpdater> = {
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
  setMappedLoad: () => (values: any): Partial<IOwnState> => ({
    isMappedLoad: values
  }),
};

const handlerCreators: HandleCreators<CompetencyEmployeeFormProps, IOwnHandler> = {
  handleSaveType: (props: CompetencyEmployeeFormProps) => (saveType: DraftType) => {
    const { stateUpdate } = props;

    stateUpdate({
      saveType
    });
  },
  handleOnLoadDetail: (props: CompetencyEmployeeFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const competencyEmployeeUid = props.history.location.state.uid;
      const { isLoading } = props.hrCompetencyEmployeeState.detail;
      const companyUid = props.history.location.state.companyUid;
      const positionUid = props.history.location.state.positionUid;

      if (user && competencyEmployeeUid && !isLoading) {
        props.hrCompetencyEmployeeDispatch.loadDetailRequest({
          competencyEmployeeUid
        });
      }

      if (companyUid && positionUid) {
        props.hrCompetencyMappedDispatch.loadListRequest({
          filter: {
            companyUid,
            positionUid
          }
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
            props.hrCompetencyEmployeeDispatch.patchRequest({
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
          message: props.intl.formatMessage(
            hrMessage.shared.message.updateSuccess, {state: 'Assessment Input', type: 'responden', uid: (response.responden && response.responden.fullName) })
        });

        // redirect to detail
        props.history.push(`/hr/assessmentinput/${response.uid}`, { companyUid: response.companyUid,  positionUid: response.positionUid });
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

const lifeCycleFunctions: ReactLifeCycleFunctions<CompetencyEmployeeFormProps, IOwnState> = {
  componentDidMount() {
    // 
  },
  componentWillUpdate(nextProps: CompetencyEmployeeFormProps) {
    const { response: empResponse } = nextProps.hrCompetencyEmployeeState.detail;
    // const { response: mapResponse } = nextProps.hrCompetencyMappedState.list; 
    const { setMappedLoad, history } = this.props;

    if (this.props.history.location.state && !nextProps.isMappedLoad) {
      if (
        !history.location.state.companyUid && !history.location.state.positionUid &&
        empResponse && empResponse.data && empResponse.data.uid === history.location.state.uid
        // (!mapResponse || mapResponse.data && mapResponse.data[0].companyUid !== empResponse.data.companyUid && mapResponse.data[0].positionUid !== empResponse.data.positionUid)
        ) {
        this.props.hrCompetencyMappedDispatch.loadListRequest({
          filter: {
            companyUid: empResponse.data.companyUid,
            positionUid: empResponse.data.positionUid
          }
        });
        setMappedLoad(true);
      }
    }
  },
  componentDidUpdate(prevProps: CompetencyEmployeeFormProps) {
    const { response: thisResponse } = this.props.hrCompetencyEmployeeState.detail;
    const { response: thisMapped } = this.props.hrCompetencyMappedState.list;
    const { isLoad, setLoad, history } = this.props;

    if (history.location.state) {
      if (thisResponse && thisResponse.data.uid === history.location.state.uid) {  
        if (thisResponse && thisResponse.data && thisMapped && thisMapped.data && !isLoad) {
          // define initial values
          const initialValues: ICompetencyEmployeeFormValue = {
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
              note: find && find.note && find.note.split(' - ')[2]
            });  
          });
    
          setLoad(true);
          this.props.setInitialValues(initialValues);
        }
      }
    }
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