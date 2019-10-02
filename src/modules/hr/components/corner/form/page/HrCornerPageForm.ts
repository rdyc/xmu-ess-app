import { FormMode } from '@generic/types';
import { IHrCornerCategoryGetListFilter } from '@hr/classes/filters';
import { IHrCornerPagePostPayload, IHrCornerPagePutPayload } from '@hr/classes/request';
import { IHrCornerPage } from '@hr/classes/response';
import { WithHrCornerPage, withHrCornerPage } from '@hr/hoc/withHrCornerPage';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
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

import { HrCornerPageFormView } from './HrCornerPageFormView';

export interface ICornerPageFormValue {
  title: string;
  headline: string;
  category: string;
  content: string;
  start: string;
  end: string;
}

interface IOwnRouteParams {
  pageUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ICornerPageFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICornerPageFormValue>>>;

  filterCategory?: IHrCornerCategoryGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICornerPageFormValue, actions: FormikActions<ICornerPageFormValue>) => void;
}

export type HrCornerPageFormProps
  = WithHrCornerPage
  & WithMasterPage
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<HrCornerPageFormProps, IOwnState> = (props: HrCornerPageFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    title: '',
    category: '',
    headline: '',
    content: '# Click here to edit',
    start: '',
    end: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICornerPageFormValue>>({
    title: Yup.string()
      .label(props.intl.formatMessage(hrMessage.corner.field.title))
      .max(150)
      .required(),
    category: Yup.string()
      .label(props.intl.formatMessage(hrMessage.corner.field.category))
      .required(),
    headline: Yup.string()
      .label(props.intl.formatMessage(hrMessage.corner.field.headline))
      .max(250)
      .required(),
    content: Yup.string()
      .label(props.intl.formatMessage(hrMessage.corner.field.content))
      .required(),
    start: Yup.string()
      .label(props.intl.formatMessage(hrMessage.corner.field.start))
      .required(),
    end: Yup.string()
      .label(props.intl.formatMessage(hrMessage.corner.field.end))
      .required(),
  }),

  filterCategory: {
    orderBy: 'name',
    direction: 'ascending',
  },
});

const stateUpdaters: StateUpdaters<HrCornerPageFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<HrCornerPageFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: HrCornerPageFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const pageUid = props.history.location.state.uid;
      const { isLoading } = props.hrCornerPageState.detail;

      if (user && pageUid && !isLoading) {
        props.hrCornerPageDispatch.loadDetailRequest({
          pageUid
        });
      }
    }
  },
  handleOnSubmit: (props: HrCornerPageFormProps) => (values: ICornerPageFormValue, actions: FormikActions<ICornerPageFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IHrCornerPagePostPayload = {
          title: values.title,
          categoryUid: values.category,
          headline: values.headline,
          content: values.content,
          start: values.start,
          end: values.end
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.hrCornerPageDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const pageUid = props.history.location.state.uid;

        // must have pageUid
        if (pageUid) {
          const payload: IHrCornerPagePutPayload = {
            title: values.title,
            categoryUid: values.category,
            headline: values.headline,
            content: values.content,
            start: values.start,
            end: values.end
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.hrCornerPageDispatch.updateRequest({
              resolve,
              reject,
              pageUid,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IHrCornerPage) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Corner Page', type: 'title', uid: response.title })
        });

        // redirect to detail
        props.history.push(`/hr/corner/page/${response.uid}`);
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
  },
};

const lifeCycleFunctions: ReactLifeCycleFunctions<HrCornerPageFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: HrCornerPageFormProps) {
    const { response: thisResponse } = this.props.hrCornerPageState.detail;
    const { response: prevResponse } = prevProps.hrCornerPageState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: ICornerPageFormValue = {
          title: thisResponse.data.title,
          category: thisResponse.data.categoryUid,
          headline: thisResponse.data.headline,
          content: thisResponse.data.content,
          start: thisResponse.data.start,
          end: thisResponse.data.end
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const HrCornerPageForm = compose<HrCornerPageFormProps, IOwnOption>(
  setDisplayName('HrCornerPageForm'),
  withMasterPage,
  withRouter,
  withHrCornerPage,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(HrCornerPageFormView);