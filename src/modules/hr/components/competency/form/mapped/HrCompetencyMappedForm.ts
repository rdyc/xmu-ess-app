import { FormMode } from '@generic/types';
import { IHrCompetencyClusterGetListFilter } from '@hr/classes/filters';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
import { WithHrCompetencyMapped, withHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { Menus } from '@lookup/classes/types';
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

import { HrCompetencyMappedFormView } from './HrCompetencyMappedFormView';

export interface IMappedFormValue {
  uid: string;
  companyUid: string;
  positionUid: string;

  // clusterUid: string;
  // categoryUid: string;
  categories: Menus[];
}

interface IOwnRouteParams {
  mappedUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IMappedFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IMappedFormValue>>>;
  
  filterCompany?: ILookupCompanyGetListFilter;
  filterCluster?: IHrCompetencyClusterGetListFilter;
  // filterCategory?: IHrCompetencyCategoryGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IMappedFormValue, actions: FormikActions<IMappedFormValue>) => void;
}

export type HrCompetencyMappedFormProps
  = WithHrCompetencyMapped
  & WithHrCompetencyCluster
  & WithMasterPage
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<HrCompetencyMappedFormProps, IOwnState> = (props: HrCompetencyMappedFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    // categoryUid: '',
    // clusterUid: '',
    companyUid: '',
    positionUid: '',
    categories: []
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IMappedFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Company'}))
      .required(),
    positionUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Position'}))
      .required()
  }),

  // filter
  filterCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },

  // filter
  filterCluster: {
    orderBy: 'name',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<HrCompetencyMappedFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<HrCompetencyMappedFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: HrCompetencyMappedFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const mappedUid = props.history.location.state.uid;
      const { isLoading } = props.hrCompetencyMappedState.detail;

      if (user && mappedUid && !isLoading) {
        props.hrCompetencyMappedDispatch.loadDetailRequest({
          mappedUid
        });
      }
    }
  },
  handleOnSubmit: () => () => {
    console.log('Submit');
    // const { user } = props.userState;
    // let promise = new Promise((resolve, reject) => undefined);

    // if (user) {
    //   // New
    //   if (props.formMode === FormMode.New) {
    //     // fill payload
    //     const payload: IHrCompetencyMappedPostPayload = {
    //       positionUid: values.positionUid,
    //       categoryUid: values.categoryUid
    //     };

    //     // set the promise
    //     promise = new Promise((resolve, reject) => {
    //       props.hrCompetencyMappedDispatch.createRequest({
    //         resolve,
    //         reject,
    //         data: payload
    //       });
    //     });
    //   }

    //   // Edit
    //   if (props.formMode === FormMode.Edit) {
    //     const mappedUid = props.history.location.state.uid;

    //     // must have mappedUid
    //     if (mappedUid) {
    //       const payload: IHrCompetencyMappedPutPayload = {
    //         positionUid: values.positionUid,
    //         categoryUid: values.categoryUid
    //       };

    //       // set the promise
    //       promise = new Promise((resolve, reject) => {
    //         props.hrCompetencyMappedDispatch.updateRequest({
    //           mappedUid,
    //           resolve,
    //           reject,
    //           data: payload
    //         });
    //       });
    //     }
    //   }
    // }

    // handling promise
    // promise
    //   .then((response: IHrCompetencyMapped) => {
        
    //     // set submitting status
    //     actions.setSubmitting(false);

    //     // clear form status
    //     actions.setStatus();

    //     // show flash message
    //     props.masterPage.flashMessage({
    //       message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Mapped', uid: response.uid })
    //     });

    //     // redirect to detail
    //     props.history.push(`/lookup/competencymapped/${response.uid}`);
    //   })
    //   .catch((error: IValidationErrorResponse) => {
    //     // set submitting status
    //     actions.setSubmitting(false);
        
    //     // set form status
    //     actions.setStatus(error);
        
    //     // error on form fields
    //     if (error.errors) {
    //       error.errors.forEach(item => 
    //         actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
    //       );
    //     }

    //     // console.log(error.errors);

    //     // show flash message
    //     props.masterPage.flashMessage({
    //       message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createFailure : hrMessage.shared.message.updateFailure)
    //     });
    //   });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<HrCompetencyMappedFormProps, IOwnState> = {
  componentDidMount() {
    const { loadListRequest } = this.props.hrCompetencyClusterDispatch;
    const { response } = this.props.hrCompetencyClusterState.list;

    if (!response) {
      loadListRequest({
        filter: {
          orderBy: 'name',
          direction: 'ascending'
        }
      });
    } else if (response && response.data) {
      const categoriesList: Menus[] = [];
      response.data.map(item => {
        categoriesList.push({
          uid: item.uid,
          parentUid: '',
          name: item.name || '',
          isAccess: false
        });

        if (item.categories.length >= 1) {
          item.categories.map(category => {
            categoriesList.push({
              uid: category.uid,
              parentUid: item.uid,
              name: category.name,
              isAccess: false
            });
          });
        }
      });

      const initialValues: IMappedFormValue = {
        uid: 'Auto generated',
        companyUid: '',
        positionUid: '',
        categories: categoriesList
      };

      this.props.setInitialValues(initialValues);
    }
  },
  componentWillUpdate(nextProps: HrCompetencyMappedFormProps) {
    const { response: thisResponse } = this.props.hrCompetencyClusterState.list;
    const { response: nextResponse } = nextProps.hrCompetencyClusterState.list;

    if (this.props.formMode === FormMode.New) {
      if (thisResponse !== nextResponse) {
        if (nextResponse && nextResponse.data) {
          const categoriesList: Menus[] = [];
          nextResponse.data.map(item => {
            categoriesList.push({
              uid: item.uid,
              parentUid: '',
              name: item.name || '',
              isAccess: false
            });
    
            if (item.categories.length >= 1) {
              item.categories.map(category => {
                categoriesList.push({
                  uid: category.uid,
                  parentUid: item.uid,
                  name: category.name,
                  isAccess: false
                });
              });
            }
          });
    
          const initialValues: IMappedFormValue = {
            uid: 'Auto generated',
            companyUid: '',
            positionUid: '',
            categories: categoriesList
          };
    
          this.props.setInitialValues(initialValues);
        }
      }
    }
  },
  componentDidUpdate(prevProps: HrCompetencyMappedFormProps) {
    const { response: thisResponse } = this.props.hrCompetencyMappedState.detail;
    const { response: prevResponse } = prevProps.hrCompetencyMappedState.detail;
    const { response: clusterList } = this.props.hrCompetencyClusterState.list;
    const { formMode } = this.props;
    
    if (formMode === FormMode.Edit) {
      if (thisResponse !== prevResponse) {
        if (thisResponse && thisResponse.data) {
          const categoriesList: Menus[] = [];
          if (clusterList && clusterList.data) {
            clusterList.data.map(item => {
              categoriesList.push({
                uid: item.uid,
                parentUid: '',
                name: item.name,
                isAccess: false
              });
  
              if (item.categories.length >= 1) {
                item.categories.map(category => {
                  categoriesList.push({
                    uid: category.uid,
                    parentUid: item.uid,
                    name: category.name,
                    isAccess: false
                  });
                });
              }
            });
          }
          // define initial values
          const initialValues: IMappedFormValue = {
            uid: thisResponse.data.uid,
            companyUid: thisResponse.data.position.companyUid,
            positionUid: thisResponse.data.positionUid,
            categories: categoriesList
          };
  
          this.props.setInitialValues(initialValues);
        }
      }
    }
  }
};

export const HrCompetencyMappedForm = compose<HrCompetencyMappedFormProps, IOwnOption>(
  setDisplayName('HrCompetencyMappedForm'),
  withMasterPage,
  withRouter,
  withHrCompetencyMapped,
  withHrCompetencyCluster,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(HrCompetencyMappedFormView);