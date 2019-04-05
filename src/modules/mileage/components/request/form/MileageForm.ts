import AppMenu from '@constants/AppMenu';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import { IMileageRequestPostPayload } from '@mileage/classes/request';
import { IMileageRequest } from '@mileage/classes/response';
import { WithMileageRequest, withMileageRequest } from '@mileage/hoc/withMileageRequest';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
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
import * as Yup from 'yup';
import { MileageFormView } from './MileageFormView';

interface IItemValue {
  itemUid: string;
  value?: number;
}
export interface IMileageFormValue {
  year: string;
  month: string;
  items: IItemValue[];
}

interface IOwnRouteParams {
  mileageUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  initialValues?: IMileageFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IMileageFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetInitialValue: (values: any) => void;
  handleOnSubmit: (values: IMileageFormValue, actions: FormikActions<IMileageFormValue>) => void;
}

export type MileageFormProps
  = WithMileageRequest
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<MileageFormProps, IOwnState> = (props: MileageFormProps): IOwnState => ({
  // form values
  initialValues: {
    year: '',
    month: '',
    items: []
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IMileageFormValue>>({
    year: Yup.string()
      .label(props.intl.formatMessage(mileageMessage.request.field.year))
      .required(),

    month: Yup.string()
      .label(props.intl.formatMessage(mileageMessage.request.field.month))
      .required(),

    items: Yup.array()
      .of(
        Yup.object().shape({
          itemUid: Yup.string()
            .required(props.intl.formatMessage(mileageMessage.request.fieldFor('itemUid', 'fieldRequired')))
        })
      )    
      .min(1, props.intl.formatMessage(mileageMessage.request.fieldFor('items', 'fieldRequired')))
  })
});

const stateUpdaters: StateUpdaters<MileageFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<MileageFormProps, IOwnHandler> = {
  handleSetInitialValue: (props: MileageFormProps) => (values: any) => {
    props.setInitialValues(values);
  },
  handleOnSubmit: (props: MileageFormProps) => (values: IMileageFormValue, actions: FormikActions<IMileageFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // fill payload
      const payload: IMileageRequestPostPayload = {
        year: Number(values.year),
        month: Number(values.month)
      };

      // set the promise
      promise = new Promise((resolve, reject) => {
        props.mileageRequestDispatch.createRequest({
          resolve,
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload
        });
      });
    }

    // handling promise
    promise
      .then((response: IMileageRequest) => {
        console.log(response);

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(mileageMessage.request.message.createSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/mileage/requests/${response.uid}`);        
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

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(mileageMessage.request.message.createFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<MileageFormProps, IOwnState> = {
  componentDidMount() {
    const view = {
      title: mileageMessage.request.page.newTitle,
      subTitle: mileageMessage.request.page.newSubHeader,
    };
    
    this.props.masterPage.changePage({
      uid: AppMenu.MileageRequest,
      parentUid: AppMenu.Mileage,
      parentUrl: '/mileage/requests',
      title: this.props.intl.formatMessage(view.title),
      description : this.props.intl.formatMessage(view.subTitle)
    });
  },
  componentDidUpdate(prevProps: MileageFormProps) {
    //
  }
};

export const MileageForm = compose<MileageFormProps, IOwnOption>(
  setDisplayName('MileageForm'),
  withUser,
  withMasterPage,
  withRouter,
  withMileageRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(MileageFormView);