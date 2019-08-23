import { FormMode } from '@generic/types';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
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

import { CompetencyResponderFormView } from './CompetencyResponderFormView';

export interface ICompetencyResponderFormValue {
  responder: string;
}

interface IOwnRouteParams {
  // 
}

interface IOwnOption {
  //
}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ICompetencyResponderFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICompetencyResponderFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICompetencyResponderFormValue, actions: FormikActions<ICompetencyResponderFormValue>) => void;
}

export type CompetencyResponderFormProps
  = WithMasterPage
  & WithHrCompetencyCluster
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<CompetencyResponderFormProps, IOwnState> = (props: CompetencyResponderFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    responder: '',
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICompetencyResponderFormValue>>({
    responder: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Responder'}))
      .required(),
  }),
});

const stateUpdaters: StateUpdaters<CompetencyResponderFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<CompetencyResponderFormProps, IOwnHandler> = {
  handleOnLoadDetail: () => () => {
    //
  },
  handleOnSubmit: () => () => {
    console.log('Submit Responder');
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CompetencyResponderFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate() {
    // 
  }
};

export const CompetencyResponderForm = compose<CompetencyResponderFormProps, IOwnOption>(
  setDisplayName('CompetencyResponderForm'),
  withHrCompetencyCluster,
  withMasterPage,
  withRouter,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(CompetencyResponderFormView);