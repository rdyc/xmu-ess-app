import { FormMode } from '@generic/types';
import { IHrCompetencyEmployeePatchPayload } from '@hr/classes/request';
import { IHrCompetencyEmployee } from '@hr/classes/response';
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
}

export interface ICompetencyResultFormValue {
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
  isUpdatedValue: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnLoadResult: () => void;
  handleOnSubmit: (values: ICompetencyResultFormValue, actions: FormikActions<ICompetencyResultFormValue>) => void;
  handleSaveType: (saveType: DraftType) => void;
  handleIsUpdatedValue: () => void;
}

export type CompetencyResultFormProps
  = WithMasterPage
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
  
  // form values
  initialValues: {
    respondenUid: '',
    companyUid: '',
    positionUid: '',
    year: '',
    levelRespond: []
  },
  saveType: DraftType.draft,
  isUpdatedValue: false,

  // filter
  filterCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICompetencyResultFormValue>>({
    // levelRespond: Yup.array()
    //   .of(
    //     Yup.object().shape({
    //       note: Yup.string()
    //         .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Note'}))
    //         .required(),
    //     })
    //   )
  })
});

const stateUpdaters: StateUpdaters<CompetencyResultFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<CompetencyResultFormProps, IOwnHandler> = {
  handleSaveType: (props: CompetencyResultFormProps) => (saveType: DraftType) => {
    const { stateUpdate } = props;

    stateUpdate({
      saveType
    });
  },
  handleIsUpdatedValue: (props: CompetencyResultFormProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      isUpdatedValue: true
    });
  },
  handleOnLoadDetail: (props: CompetencyResultFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const competencyEmployeeUid = props.history.location.state.uid;
      const { isLoading } = props.hrCompetencyResultState.detail;

      if (user && competencyEmployeeUid && !isLoading) {
        props.hrCompetencyResultDispatch.loadDetailRequest({
          competencyEmployeeUid
        });
      }
      const positionUid = props.history.location.state.positionUid;
      const respondenUid = props.history.location.state.respondenUid;
      const { isLoading: resultLoading } = props.hrCompetencyResultState.detailList;
    
      if (user && positionUid && respondenUid && !resultLoading) {
        props.hrCompetencyResultDispatch.loadDetailListRequest({
          positionUid,
          respondenUid
        });
      }

      props.hrCompetencyMappedDispatch.loadListRequest({
        filter: {
          positionUid
        }
      });
    }
  },
  handleOnLoadResult: (props: CompetencyResultFormProps) => () => { 
    // const { user } = props.userState;
    if (!isNullOrUndefined(props.history.location.state)) {
      // 
    }
  },
  handleOnSubmit: (props: CompetencyResultFormProps) => (values: ICompetencyResultFormValue, actions: FormikActions<ICompetencyResultFormValue>) => {
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

        let positionUid: string | undefined;
        let respondenUid: string | undefined;

        if (props.history.location.state) {
          positionUid = props.history.location.state.positionUid;
          respondenUid = props.history.location.state.respondenUid;
        }

        // redirect to detail
        props.history.push(`/hr/assessmentresult/${response.uid}`, {positionUid, respondenUid});
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

const lifeCycleFunctions: ReactLifeCycleFunctions<CompetencyResultFormProps, IOwnState> = {
  componentDidMount() {
    // const { response, request } = this.props.hrCompetencyMappedState.list;
    // const { history, handleOnLoadDetail } = this.props;
    
    // if (history.location.state) {
    //   const positionUid = history.location.state.positionUid;

    //   if (!response || request && request.filter && request.filter.positionUid !== positionUid) {
    //     handleOnLoadDetail();
    //   }
    // }
  },
  componentWillUpdate(nextProps: CompetencyResultFormProps) {
    // const { response: thisResponse } = this.props.hrCompetencyResultState.detail; 
    // const { response: nextResponse } = nextProps.hrCompetencyResultState.detail;
    // const { response, request } = this.props.hrCompetencyMappedState.list;

    // if (!response || (request && request.filter && request.filter.positionUid) !== (nextResponse && nextResponse.data && nextResponse.data.positionUid)) {
    //   if (thisResponse !== nextResponse) {
    //     if (nextResponse && nextResponse.data) {
    //       this.props.hrCompetencyMappedDispatch.loadListRequest({
    //         filter: {
    //           positionUid: nextResponse.data.positionUid
    //         }
    //       });
    //     }
    //   }
    // }
  },
  componentDidUpdate(prevProps: CompetencyResultFormProps) {
    const { response: thisResponse } = this.props.hrCompetencyResultState.detail;
    // const { response: prevResponse } = prevProps.hrCompetencyResultState.detail;
    const { response: thisMapped } = this.props.hrCompetencyMappedState.list;
    // const { response: prevMapped } = prevProps.hrCompetencyMappedState.list;

    // if (thisResponse !== prevResponse) {
    if (thisResponse && thisResponse.data && 
        thisMapped && thisMapped.data 
        && !this.props.isUpdatedValue) {
        
        // define initial values
        const initialValues: ICompetencyResultFormValue = {
          respondenUid: thisResponse.data.respondenUid,
          companyUid: thisResponse.data.position && thisResponse.data.position.companyUid || 'N/A',
          positionUid: thisResponse.data.positionUid,
          year: thisResponse.data.assessmentYear.toString(),
          levelRespond: []
        };

        // fill 
        thisMapped.data[0].categories.forEach(item => {
          const find = thisResponse.data.items.find(findData => findData.categoryUid === item.category.uid);

          initialValues.levelRespond.push({
            uid: find && find.uid || '',
            categoryUid: item.category.uid,
            levelUid: find && find.levelUid || '',
            note: find && find.note
          });  
        });
        this.props.setInitialValues(initialValues);
        this.props.handleIsUpdatedValue();
    }
    // }
  }
};

export const CompetencyResultForm = compose<CompetencyResultFormProps, IOwnOption>(
  setDisplayName('CompetencyResultForm'),
  withHrCompetencyResult,
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