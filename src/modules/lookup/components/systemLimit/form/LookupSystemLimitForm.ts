import { ISystemListFilter } from '@common/classes/filters';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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
import { SystemLimitFormView } from './LookupSystemLimitFormView';

export interface ISystemLimitFormValue {
  uid?: string;
  companyUid?: string;
  categoryType?: string;
  days?: number;
}

interface IOwnRouteParams {
  systemLimitUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  initialValues?: ISystemLimitFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ISystemLimitFormValue>>>;

  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterCommonSystem?: ISystemListFilter;

  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setValidationSchema: StateHandler<IOwnState>;
  setFilterLookupCompany: StateHandler<IOwnState>;
  setFilterCommonSystem: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleOnSubmit: (values: ISystemLimitFormValue, actions: FormikActions<ISystemLimitFormValue>) => void;
}

export type SystemLimitFormProps
  = WithLookupSystemLimit
  & WithUser
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  dialogFullScreen: false,
  dialogOpen: false
});

const stateUpdaters: StateUpdaters<SystemLimitFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setValidationSchema: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    validationSchema: values
  }),
  setFilterLookupCompany: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    filterLookupCompany: values
  }),
  setFilterCommonSystem: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    filterCommonSystem: values
  })
};

const handlerCreators: HandleCreators<SystemLimitFormProps, IOwnHandler> = {
  handleOnLoadApi: (props: SystemLimitFormProps) => () => {
    //
  },
  handleOnCloseDialog: (props: SystemLimitFormProps) => () => {
    //
  },
  handleOnConfirm: (props: SystemLimitFormProps) => () => {
    //
  },
  handleOnSubmit: (props: SystemLimitFormProps) => (values: ISystemLimitFormValue, actions: FormikActions<ISystemLimitFormValue>) => {
    //
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<SystemLimitFormProps, IOwnState> = {
  componentDidMount() {
    // 1. define initial values
    const initialValues: ISystemLimitFormValue = {
      companyUid: '',
      categoryType: '',
      days: 0
    };

    this.props.setInitialValues(initialValues);

    // 2. define validation schema
    const validationSchema = Yup.object().shape<Partial<ISystemLimitFormValue>>({
      companyUid: Yup.string()
        .required(this.props.intl.formatMessage(lookupMessage.systemLimit.fieldFor('companyUid', 'fieldRequired'))),

      categoryType: Yup.string()
        .required(this.props.intl.formatMessage(lookupMessage.systemLimit.fieldFor('categoryType', 'fieldRequired'))),

      days: Yup.number()
        .min(0)
        .required(this.props.intl.formatMessage(lookupMessage.systemLimit.fieldFor('days', 'fieldRequired')))
    });

    this.props.setValidationSchema(validationSchema);

    // 3. define company filter
    const filterCompany: ILookupCompanyGetListFilter = {
      orderBy: 'name',
      direction: 'ascending'
    };

    this.props.setFilterLookupCompany(filterCompany);

    // 4. define common project filter
    const filterCommonSystem: ISystemListFilter = {
      orderBy: 'value',
      direction: 'ascending'
    };

    this.props.setFilterCommonSystem(filterCommonSystem);
  },
  // componentDidUpdate(prevProps: SystemLimitFormProps) {
  //   console.log('component did update');
  // }
};

export const SystemLimitForm = compose<SystemLimitFormProps, IOwnOption>(
  setDisplayName('SystemLimitForm'),
  withUser,
  withRouter,
  withLookupSystemLimit,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(SystemLimitFormView);