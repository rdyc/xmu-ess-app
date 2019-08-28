import { FormMode } from '@generic/types';
import { WithHrCompetencyCategory, withHrCompetencyCategory } from '@hr/hoc/withHrCompetencyCategory';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
  [key: string]: string;
}

export interface ICompetencyEmployeeFormValue {
  responder: string;
  levelRespond: ILevelOption;
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
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICompetencyEmployeeFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICompetencyEmployeeFormValue, actions: FormikActions<ICompetencyEmployeeFormValue>) => void;
}

export type CompetencyEmployeeFormProps
  = WithMasterPage
  & WithHrCompetencyCategory
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
    responder: '',
    levelRespond: {}
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICompetencyEmployeeFormValue>>({
    responder: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Employee'}))
      .required(),
  }),
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
  handleOnLoadDetail: () => () => {
    //
  },
  handleOnSubmit: () => () => {
    console.log('Submit Employee');
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CompetencyEmployeeFormProps, IOwnState> = {
  componentDidMount() {
    const { hrCompetencyCategoryDispatch, hrCompetencyCategoryState} = this.props;

    if (!hrCompetencyCategoryState.all.response) {
      hrCompetencyCategoryDispatch.loadAllRequest({
        clusterUid: 'CLS002',
        filter: {
          clusterUid: 'CLS002',
          orderBy: 'name',
          direction: 'ascending'
        }
      });
    }
  },
  componentWillUpdate(nextProps: CompetencyEmployeeFormProps) {
    const { response: nextResponse } = nextProps.hrCompetencyCategoryState.all;
    const { response: thisResponse } = this.props.hrCompetencyCategoryState.all;
    const { setInitialValues } = this.props;

    if (thisResponse !== nextResponse) {
      if (nextResponse && nextResponse.data) {
        const initialValues: ICompetencyEmployeeFormValue = {
          responder: '',
          levelRespond: {}
        };
  
        nextResponse.data.map(item =>
          initialValues.levelRespond[item.uid] = ''  
        );
        
        setInitialValues(initialValues);
      }
    }
  },
  componentDidUpdate() {
    console.log(this.props.initialValues);
  }
};

export const CompetencyEmployeeForm = compose<CompetencyEmployeeFormProps, IOwnOption>(
  setDisplayName('CompetencyEmployeeForm'),
  withHrCompetencyCategory,
  withMasterPage,
  withRouter,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(CompetencyEmployeeFormView);