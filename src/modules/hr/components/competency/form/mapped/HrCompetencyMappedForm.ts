import { WithCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IHrCompetencyClusterGetListFilter } from '@hr/classes/filters';
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

interface MappedLevel {
  uid?: string;
  employeeLevelUid: string;
  employeeLevelName: string;
  categoryLevelUid: string;
}

export interface CategoryMenus {
  uid: string;
  parentUid?: string;
  name: string;
  isAccess: boolean;
  itemUid?: string;
  mappedLevel: MappedLevel[];
}

export interface IMappedFormValue {
  uid: string;
  companyUid: string;
  positionUid: string;
  categories: CategoryMenus[];
  activeCluster?: string;
  activeCategory?: string;
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

  levelTouched: boolean;
  detailTouched: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setLevelTouched: StateHandler<IOwnState>;
  setDetailTouched: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnLoadCluster: () => void;
  handleOnLoadLevel: () => void;
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
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    companyUid: '',
    positionUid: '',
    categories: [],
    activeCategory: '',
    activeCluster: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IMappedFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Company'}))
      .required(),
    positionUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Position'}))
      .required(),
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
  levelTouched: false,
  detailTouched: false
});

const stateUpdaters: StateUpdaters<HrCompetencyMappedFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setLevelTouched: () => (): Partial<IOwnState> => ({
    levelTouched: true
  }),
  setDetailTouched: () => (): Partial<IOwnState> => ({
    detailTouched: true
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
    }
  },
  handleOnLoadCluster: (props: HrCompetencyMappedFormProps) => () => {
    const { loadListRequest: loadCluster } = props.hrCompetencyClusterDispatch;

    loadCluster({
      filter: {
        orderBy: 'name',
        direction: 'ascending'
      }
    });
  },
  handleOnLoadLevel: (props: HrCompetencyMappedFormProps) => () => {
    const { loadListRequest: loadLevel } = props.employeeLevelDispatch;

    loadLevel({
      filter: {
        orderBy: 'seq',
        direction: 'descending'
      }
    });
  },
  handleOnSubmit: (props: HrCompetencyMappedFormProps) => (values: IMappedFormValue, actions: FormikActions<IMappedFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IHrCompetencyMappedPostPayload = {
          positionUid: values.positionUid,
          categories: []
        };
        
        values.categories.forEach(item => {
          if (item.parentUid && item.isAccess) {
            const itemLevel: IMappedLevelItemPayload[] = [];
            
            item.mappedLevel.forEach(lv =>
              itemLevel.push({
                categoryLevelUid: lv.categoryLevelUid,
                employeeLevelUid: lv.employeeLevelUid
              })  
            );
            payload.categories.push({
              categoryUid: item.uid,
              mappedLevels: itemLevel
            });
          }
        });

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.hrCompetencyMappedDispatch.createRequest({
            resolve,
            reject,
            positionUid: values.positionUid,
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
            positionUid: values.positionUid,
            categories: []
          };

          values.categories.forEach(item => {
            if (item.parentUid && item.isAccess) {
              const itemLevel: IMappedLevelItemPayload[] = [];
              item.mappedLevel.forEach(lv =>
                itemLevel.push({
                  uid: lv.uid,
                  categoryLevelUid: lv.categoryLevelUid,
                  employeeLevelUid: lv.employeeLevelUid
                })  
              );
              payload.categories.push({
                uid: item.itemUid,
                categoryUid: item.uid,
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Mapped', type: 'position', uid: response.position.name })
        });

        // redirect to detail
        props.history.push(`/hr/competency/mapped/${response.uid}`);
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

const lifeCycleFunctions: ReactLifeCycleFunctions<HrCompetencyMappedFormProps, IOwnState> = {
  componentDidMount() {
    const { response: clusterList } = this.props.hrCompetencyClusterState.list;
    const { response: levelList } = this.props.employeeLevelState.list;
    const { formMode } = this.props;

    if (formMode === FormMode.New) {

      // check if cluster list is already exist or no, if there is then fill the initial values
      if (!clusterList) {
        this.props.handleOnLoadCluster();
      } else {
        if (clusterList && clusterList.data) {
          const initialVal: IMappedFormValue  | undefined = this.props.initialValues;
  
          if (initialVal) {
            clusterList.data.map((item, index) => {
              // for Parent
              initialVal.categories.push({
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
                  initialVal.categories.push({
                    uid: category.uid,
                    parentUid: item.uid,
                    name: category.name,
                    isAccess: false,
                    itemUid: '',
                    mappedLevel: initialVal.categories[index].mappedLevel.length > 0 ? initialVal.categories[index].mappedLevel : []
                  });
                });
              }
            });
            this.props.setInitialValues(initialVal);
          }
        }
      }

      // check if level list is already exist or no, if there is then fill the initial values
      if (!levelList) {
        this.props.handleOnLoadLevel();
      } else {
        if (levelList && levelList.data) {
          const initialVal: IMappedFormValue  | undefined = this.props.initialValues;
    
          if (initialVal && initialVal.categories.length !== 0) {
            initialVal.categories.map((item, index) => {
              if (item.mappedLevel.length < 1 && levelList.data) {
                if (item.parentUid) {
                  levelList.data.map(lv => {
                    item.mappedLevel.push({
                      employeeLevelUid: lv.uid,
                      employeeLevelName: lv.value,
                      categoryLevelUid: '',
                    });
                  });
                }
              }
            });
            this.props.setInitialValues(initialVal);
          } 
        }
      }
    }
  },
  componentWillUpdate(nextProps: HrCompetencyMappedFormProps) {
    // 
  },
  componentDidUpdate(prevProps: HrCompetencyMappedFormProps) {
    const { response: thisResponse, request, isLoading } = this.props.hrCompetencyMappedState.detail;
    // const { response: prevResponse } = prevProps.hrCompetencyMappedState.detail;
    const { response: thisCluster } = this.props.hrCompetencyClusterState.list;
    const { response: prevCluster } = prevProps.hrCompetencyClusterState.list;
    const { response: thisLevel } = this.props.employeeLevelState.list;

    if (thisCluster !== prevCluster) {
      if (thisCluster && thisCluster.data) {
        const initialVal: IMappedFormValue  | undefined = this.props.initialValues;

        if (initialVal) {
          thisCluster.data.map((item, index) => {
            // for Parent
            initialVal.categories.push({
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
                initialVal.categories.push({
                  uid: category.uid,
                  parentUid: item.uid,
                  name: category.name,
                  isAccess: false,
                  itemUid: '',
                  mappedLevel: initialVal.categories[index].mappedLevel.length > 0 ? initialVal.categories[index].mappedLevel : []
                });
              });
            }
          });
          this.props.setInitialValues(initialVal);
        }
      }
    }

    if (thisCluster && thisLevel && thisLevel.data && !this.props.levelTouched) {
      const initialVal: IMappedFormValue  | undefined = this.props.initialValues;

      if (initialVal && initialVal.categories.length !== 0) {
        initialVal.categories.map((item, index) => {
          if (item.mappedLevel.length < 1 && thisLevel.data) {
            if (item.parentUid) {
              thisLevel.data.map(lv => {
                item.mappedLevel.push({
                  employeeLevelUid: lv.uid,
                  employeeLevelName: lv.value,
                  categoryLevelUid: '',
                });
              });
            }
          }
        });
        this.props.setLevelTouched();
        this.props.setInitialValues(initialVal);
      } 
    }

    if (this.props.formMode === FormMode.Edit && this.props.location.state) {
      if (!isLoading && thisResponse && thisResponse.data && (request && request.mappedUid === this.props.location.state.uid) && !this.props.detailTouched) {
        const initialVal: IMappedFormValue  | undefined = this.props.initialValues;
  
        if (initialVal && initialVal.categories.length !== 0) {
          initialVal.categories.map((item, index) => {
            if (item.parentUid) {
              const categoryId: MappedItem | undefined = thisResponse.data.categories.find(data => data.category.uid === item.uid);
  
              if (categoryId) {
                // if there is child that are sync then check the parent to true
                const parent: CategoryMenus | undefined = initialVal.categories.find(find => find.uid === item.parentUid && !find.isAccess);
  
                if (parent) {
                  parent.isAccess = true;
                  // this one is for filling the mappedlevel for everychild if the parent is checked
                }
                item.isAccess = true;
  
                if (categoryId.mappedLevels.length > 0) {
                  const levelItem: MappedLevel[] = [];
                  categoryId.mappedLevels.map((lv, lvIdx) => {
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
  
          initialVal.companyUid = thisResponse.data.position.companyUid;
          initialVal.positionUid = thisResponse.data.positionUid;
  
          this.props.setDetailTouched();
          this.props.setInitialValues(initialVal);
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
  withEmployeeLevel,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(HrCompetencyMappedFormView);