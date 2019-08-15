import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { withUser, WithUser } from '@layout/hoc/withUser';
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
  withStateHandlers
} from 'recompose';
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { IMarkdownCategoryPostPayload, IMarkdownCategoryPutPayload } from '../../../classes/request';
import { IMarkdownCategory } from '../../../classes/response';
import { WithMarkdownCategory, withMarkdownCategory } from '../../../hoc/withMarkdownCategory';

import { MarkdownCategoryFormView } from './MarkdownCategoryFormView';

export interface IMarkdownCategoryFormValue {
  name: string;
  isActive: boolean;
  description?: string;
}

interface IOwnOption {
  isOpen: boolean;
  onClose: () => void;
  uid: string | undefined;
}

interface IOwnRouteParams {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IMarkdownCategoryFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IMarkdownCategoryFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IMarkdownCategoryFormValue, actions: FormikActions<IMarkdownCategoryFormValue>) => void;
}

export type MarkdownCategoryFormProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & WithUser
  & WithMasterPage
  & WithMarkdownCategory
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>;

const createProps: mapper<MarkdownCategoryFormProps, IOwnState> = (props: MarkdownCategoryFormProps): IOwnState => ({
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    name: '',
    description: '',
    isActive: false
  },

  validationSchema: Yup.object().shape<Partial<IMarkdownCategoryFormValue>>({
    name: Yup.string()
      .required()
  }),
});

const stateUpdaters: StateUpdaters<MarkdownCategoryFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<MarkdownCategoryFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: MarkdownCategoryFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const { uid } = props;
      const { isLoading } = props.markdownCategoryState.detail;
      const user = props.userState.user;

      if (user && uid && !isLoading) {
        props.markdownCategoryDispatch.loadDetailRequest({
          uid
        });
      }
    }
  },
  handleOnSubmit: (props: MarkdownCategoryFormProps) => (values: IMarkdownCategoryFormValue, actions: FormikActions<IMarkdownCategoryFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {

      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        
        const payload: IMarkdownCategoryPostPayload = {
          name: values.name,
          description: values.description,
          isActive: values.isActive
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.markdownCategoryDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const { uid } = props;

        // must have uid
        if (uid) {
          const payload: IMarkdownCategoryPutPayload = {
            name: values.name,
            description: values.description,
            isActive: values.isActive
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.markdownCategoryDispatch.updateRequest({
              uid,
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
      .then((response: IMarkdownCategory) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: (props.formMode === FormMode.New ? 'SUCCESS CREATE' : 'SUCCESS UPDATE')
        });

        // redirect to detail
        props.onClose();
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
          message: (props.formMode === FormMode.New ? 'CREATE FAILURE' : 'UPDATE FAILURE')
        });
      });
  }
};

const lifeCycles: ReactLifeCycleFunctions<MarkdownCategoryFormProps, IOwnState> = {
  componentDidMount() {
    console.log('component did mount');
  },
  componentWillUpdate() {
    console.log('component will update');
  },
  componentDidUpdate() {
    console.log('component did update');
  }
};

export const MarkdownCategoryForm = compose<MarkdownCategoryFormProps, IOwnOption>(
  setDisplayName('MarkdownCategoryForm'),
  injectIntl,
  withRouter,
  withUser,
  withMasterPage,
  withMarkdownCategory,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycles),
  withStyles(styles)
)(MarkdownCategoryFormView);