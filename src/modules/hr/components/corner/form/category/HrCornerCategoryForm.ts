import { IBasePagingFilter } from '@generic/interfaces';
import { IHrCornerCategoryPostPayload, IHrCornerCategoryPutPayload } from '@hr/classes/request';
import { IHrCornerCategory } from '@hr/classes/response';
import { WithHrCornerCategory, withHrCornerCategory } from '@hr/hoc/withHrCornerCategory';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
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

import { HrCornerCategoryFormView } from './HrCornerCategoryFormView';

export interface ICornerCategoryFormValue {
  name: string;
  description: string;
}

interface IOwnRouteParams {
  // pageUid: string;
}

interface IOwnOption {
  isFormOpen: boolean;
  onClose: () => void;
  category?: IHrCornerCategory;
  handleOnLoadList: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
}

interface IOwnState {
  initialValues?: ICornerCategoryFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICornerCategoryFormValue>>>;

  dialogTitle: string;
  dialogMessage: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICornerCategoryFormValue, actions: FormikActions<ICornerCategoryFormValue>) => void;
}

export type HrCornerCategoryFormProps
  = WithHrCornerCategory
  & WithMasterPage
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<HrCornerCategoryFormProps, IOwnState> = (props: HrCornerCategoryFormProps): IOwnState => ({
// form values
  initialValues: {
    name: '',
    description: '',
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICornerCategoryFormValue>>({
    name: Yup.string()
      .label(props.intl.formatMessage(hrMessage.corner.field.name))
      .max(50)
      .required(),
    description: Yup.string()
      .label(props.intl.formatMessage(hrMessage.corner.field.description))
      .required()
  }),

  dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.createTitle, {state: 'Corner Category'}),
  dialogMessage: props.intl.formatMessage(hrMessage.shared.confirm.createDescription, {state: 'Corner Category'})
});

const stateUpdaters: StateUpdaters<HrCornerCategoryFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<HrCornerCategoryFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: HrCornerCategoryFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const { category } = props;
      const { isLoading } = props.hrCornerCategoryState.detail;

      if (user && category && !isLoading) {
        props.hrCornerCategoryDispatch.loadDetailRequest({
          categoryUid: category.uid
        });
      }
    }
  },
  handleOnSubmit: (props: HrCornerCategoryFormProps) => (values: ICornerCategoryFormValue, actions: FormikActions<ICornerCategoryFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    const { category } = props;

    if (user) {
      // New
      if (!category) {
        // fill payload
        const payload: IHrCornerCategoryPostPayload = {
          name: values.name,
          description: values.description,
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.hrCornerCategoryDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // Edit
      if (category) {
        const payload: IHrCornerCategoryPutPayload = {
          name: values.name,
         description: values.description
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.hrCornerCategoryDispatch.updateRequest({
            resolve,
            reject,
            categoryUid: category.uid,
            data: payload
          });
        });
      }
    }

    // handling promise
    promise
      .then((response: IHrCornerCategory) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(!category ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Corner category', type: 'name', uid: response.name })
        });

        // redirect to detail
        props.handleOnLoadList(undefined, true, true);
        props.onClose();
        props.hrCornerCategoryDispatch.loadListRequest({
          filter: {
            orderBy: 'name',
            direction: 'ascending',
          }
        });
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
          message: props.intl.formatMessage(!category ? hrMessage.shared.message.createFailure : hrMessage.shared.message.updateFailure)
        });
      });
  },
};

const lifeCycleFunctions: ReactLifeCycleFunctions<HrCornerCategoryFormProps, IOwnState> = {
  componentDidMount() {
    // this.props.handleOnLoadDetail();
  },
  componentDidUpdate(prevProps: HrCornerCategoryFormProps) {
    const { category: thisCategory, stateUpdate } = this.props;
    const { category: prevCategory } = prevProps;

    if (thisCategory !== prevCategory) {
      if (thisCategory) {
        const initialValues: ICornerCategoryFormValue = {
          name: thisCategory.name,
          description: thisCategory.description,
        };
  
        this.props.setInitialValues(initialValues);

        stateUpdate({
          dialogTitle: this.props.intl.formatMessage(hrMessage.shared.confirm.modifyTitle, {state: 'corner category'}),
          dialogMessage: this.props.intl.formatMessage(hrMessage.shared.confirm.modifyDescription, {state: 'corner category'})
        });
      }
    }
  }
};

export const HrCornerCategoryForm = compose<HrCornerCategoryFormProps, IOwnOption>(
  setDisplayName('HrCornerCategoryForm'),
  withMasterPage,
  withRouter,
  withHrCornerCategory,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(HrCornerCategoryFormView);