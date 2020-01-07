import { WithCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IHrCompetencyClusterGetListFilter, IHrCompetencyMappedGetListFilter } from '@hr/classes/filters';
import { IHrCompetencyMappedPostPayload, IHrCompetencyMappedPutPayload } from '@hr/classes/request';
import { IMappedLevelItemPayload } from '@hr/classes/request/competency/mapped/IMappedLevelItemPayload';
import { IHrCompetencyMapped, MappedItem } from '@hr/classes/response';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
import { WithHrCompetencyMapped, withHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { WithEmployeeLevel, withEmployeeLevel } from '@lookup/hoc/withEmployeeLevel';
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

export interface MappedLevel {
  uid?: string;
  isRequired?: boolean;
  employeeLevelUid?: string;
  employeeLevelName?: string;
  categoryLevelUid?: string;
}

export interface CategoryMenus {
  uid?: string;
  parentUid?: string;
  name?: string;
  isAccess?: boolean;
  itemUid?: string;
  mappedLevel: MappedLevel[];
}

export interface IMappedFormValue {
  uid: string;
  companyUid: string;
  positionUid: string;
  activeCluster?: string;
  activeCategory?: string;
  categories: CategoryMenus[];
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

  isLoad: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setLoad: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IMappedFormValue, actions: FormikActions<IMappedFormValue>) => void;
}

export type HrCompetencyMappedFormProps
  = WithHrCompetencyMapped
  & WithHrCompetencyCluster
  & WithEmployeeLevel
  & WithCommonSystem
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
  
  isLoad: false,
  // form values
  initialValues: {
    uid: 'Auto Generated',
    companyUid: '',
    positionUid: '',
    activeCategory: '',
    activeCluster: '',
    categories: [],
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IMappedFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.company))
      .required(),
    positionUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.position))
      .required(),
    categories: Yup.array()
      .of(
        Yup.object().shape({
          mappedLevel: Yup.array()
            .when('isAccess', {
              is: true,
              then: Yup.array().of(
                Yup.object().shape({
                  categoryLevelUid: Yup.string().required()
                })
              )
            })
            .of(
              Yup.object().shape({
                categoryLevelUid: Yup.string()
              })
            )
        })
      )

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
  },
});

const stateUpdaters: StateUpdaters<HrCompetencyMappedFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setLoad: () => (values: any): Partial<IOwnState> => ({
    isLoad: values
  }),
};

const handlerCreators: HandleCreators<HrCompetencyMappedFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: HrCompetencyMappedFormProps) => () => {
    const { loadListRequest: loadCluster } = props.hrCompetencyClusterDispatch;

    loadCluster({
      filter: {
        orderBy: 'name',
        direction: 'ascending'
      }
    });

    const { loadListRequest: loadLevel } = props.employeeLevelDispatch;

    loadLevel({
      filter: {
        orderBy: 'seq',
        direction: 'descending'
      }
    });
    
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
  handleOnSubmit: (props: HrCompetencyMappedFormProps) => (values: IMappedFormValue, actions: FormikActions<IMappedFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IHrCompetencyMappedPostPayload = {
          companyUid: values.companyUid,
          positionUid: values.positionUid,
          categories: []
        };
        
        values.categories.forEach(item => {
          if (item.parentUid && item.isAccess) {
            const itemLevel: IMappedLevelItemPayload[] = [];
            
            item.mappedLevel.forEach(lv =>
              itemLevel.push({
                categoryLevelUid: lv.categoryLevelUid || '',
                employeeLevelUid: lv.employeeLevelUid || ''
              })  
            );
            payload.categories.push({
              categoryUid: item.uid || '',
              mappedLevels: itemLevel
            });
          }
        });

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.hrCompetencyMappedDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const mappedUid = props.history.location.state.uid;

        // must have mappedUid
        if (mappedUid) {
          const payload: IHrCompetencyMappedPutPayload = {
            companyUid: values.companyUid,
            positionUid: values.positionUid,
            categories: []
          };

          values.categories.forEach(item => {
            if (item.parentUid && item.isAccess) {
              const itemLevel: IMappedLevelItemPayload[] = [];
              item.mappedLevel.forEach(lv =>
                itemLevel.push({
                  uid: lv.uid,
                  categoryLevelUid: lv.categoryLevelUid || '',
                  employeeLevelUid: lv.employeeLevelUid || ''
                })  
              );
              payload.categories.push({
                uid: item.itemUid,
                categoryUid: item.uid || '',
                mappedLevels: itemLevel
              });
            }
          });

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.hrCompetencyMappedDispatch.updateRequest({
              mappedUid,
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
      .then((response: IHrCompetencyMapped) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Mapping', type: 'position', uid: response.position && response.position.name })
        });

        // Reload mappedlist if the list is exist and companyuid is the same
        const { isLoading, request } = props.hrCompetencyMappedState.list;
        const { loadListRequest } = props.hrCompetencyMappedDispatch;
        const companyUid: string = response.companyUid;
        
        const filter: IHrCompetencyMappedGetListFilter = {
          companyUid,
          orderBy: 'uid',
          direction: 'ascending'
        };

        if (!isLoading || request && request.filter && request.filter.companyUid === companyUid) {
          loadListRequest({ 
            filter
          });
        }
        
        // redirect to detail
        props.history.push(`/hr/competency/mapped/${response.uid}`);
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

const lifeCycleFunctions: ReactLifeCycleFunctions<HrCompetencyMappedFormProps, IOwnState> = {
  componentDidMount() {
    // 
  },
  componentWillUpdate(nextProps: HrCompetencyMappedFormProps) {
    const { response: clusterList } = nextProps.hrCompetencyClusterState.list;
    const { response: levelList } = nextProps.employeeLevelState.list;
    const { isLoad, setLoad, formMode } = this.props;

    if (formMode === FormMode.New && !isLoad) {
      if (clusterList && clusterList.data && levelList && levelList.data) {
        const categoriesData: CategoryMenus[] = [];

        clusterList.data.map((item, index) => {
          // Parent
          categoriesData.push({
            uid: item.uid,
            parentUid: '',
            name: item.name || '',
            isAccess: false,
            itemUid: '',
            mappedLevel: []
          });

          if (item.categories.length >= 1) {
            // for child
            item.categories.map(category => {
              categoriesData.push({
                uid: category.uid,
                parentUid: item.uid,
                name: category.name,
                isAccess: false,
                itemUid: '',
                mappedLevel: []
              });
            });
          }
        });

        categoriesData.map(item => 
          item.parentUid &&
          levelList.data &&
          levelList.data.map(lv => 
            item.mappedLevel.push({
              employeeLevelUid: lv.uid,
              employeeLevelName: lv.value,
              categoryLevelUid: '',
            })  
          )
        );

        const initialValues: IMappedFormValue = {
          uid: 'Auto Generated',
          companyUid: '',
          positionUid: '',
          categories: categoriesData,
        };

        setLoad(true);
        this.props.setInitialValues(initialValues);
      }
    }    
  },
  componentDidUpdate(prevProps: HrCompetencyMappedFormProps) {
    const { response: thisResponse } = this.props.hrCompetencyMappedState.detail;
    const { response: clusterList } = this.props.hrCompetencyClusterState.list;
    const { response: levelList } = this.props.employeeLevelState.list;
    const { isLoad, setLoad, formMode } = this.props;

    if (formMode === FormMode.Edit && !isLoad) {
      if (thisResponse && thisResponse.data && clusterList && clusterList.data && levelList && levelList.data) {
        const categoriesData: CategoryMenus[] = [];

        clusterList.data.map((item, index) => {
          // Parent
          categoriesData.push({
            uid: item.uid,
            parentUid: '',
            name: item.name || '',
            isAccess: false,
            itemUid: '',
            mappedLevel: []
          });

          if (item.categories.length >= 1) {
            // for child
            item.categories.map(category => {
              categoriesData.push({
                uid: category.uid,
                parentUid: item.uid,
                name: category.name,
                isAccess: false,
                itemUid: '',
                mappedLevel: [],
              });
            });
          }
        });

        categoriesData.map(item => 
          item.parentUid &&
          levelList.data &&
          levelList.data.map(lv => 
            item.mappedLevel.push({
              employeeLevelUid: lv.uid,
              employeeLevelName: lv.value,
              categoryLevelUid: '',
            })  
          )
        );
        
        categoriesData.map(item => {
          if (item.parentUid) {
            const category: MappedItem | undefined = thisResponse.data.categories.find(data => data.category.uid === item.uid);

            if (category) {
              const parent: CategoryMenus | undefined = categoriesData.find(find => find.uid === item.parentUid && !find.isAccess);

              if (parent) {
                parent.isAccess = true;
              }
              item.isAccess = true;

              if (category.mappedLevels.length > 0) {
                const levelItem: MappedLevel[] = [];
                category.mappedLevels.map((lv, lvIdx) => {
                  levelItem.push({
                    uid: lv.uid,
                    categoryLevelUid: lv.categoryLevelUid,
                    employeeLevelUid: lv.employeeLevelUid,
                    employeeLevelName: lv.employeeLevel.value
                  });
                });

                if (item.parentUid) {
                  item.mappedLevel = levelItem;
                }
              } 
            }
          }
        });

        const initialValues: IMappedFormValue = {
          uid: thisResponse.data.uid,
          companyUid: thisResponse.data.companyUid,
          positionUid: thisResponse.data.positionUid,
          categories: categoriesData,
        };

        setLoad(true);
        this.props.setInitialValues(initialValues);
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
  withEmployeeLevel,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(HrCompetencyMappedFormView);