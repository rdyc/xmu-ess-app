import AppMenu from '@constants/AppMenu';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { IAchievementPatchPayload } from '@lookup/classes/request/achievement';
import { WithAchievement, withAchievement } from '@lookup/hoc/withAchievement';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import * as Yup from 'yup';
import { LookupAchievementFormView } from './LookupAchievementFormView';

export interface IAchievementFormValue {
  file: FileList | null;
  fileName: string;
  fileType: string;
  fileSize: string;
}

interface IOwnOption {
}

interface IOwnState {
  initialValues?: IAchievementFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IAchievementFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
}

interface IOwnHandler {
  handleOnSubmit: (values: IAchievementFormValue, actions: FormikActions<IAchievementFormValue>) => void;
}

export type AchievementFormProps
  = WithAchievement
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<AchievementFormProps, IOwnState> = (props: AchievementFormProps): IOwnState => ({
  // form values
  initialValues: {
    file: null,
    fileName: '',
    fileSize: '',
    fileType: '',
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IAchievementFormValue>>({
    file: Yup.mixed()
      .label(props.intl.formatMessage(lookupMessage.achievement.field.file))
      .required(),
  })
});

const stateUpdaters: StateUpdaters<AchievementFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<AchievementFormProps, IOwnHandler> = {
  handleOnSubmit: (props: AchievementFormProps) => (values: IAchievementFormValue, actions: FormikActions<IAchievementFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user && values.file) {
      // fill payload
      const payload: IAchievementPatchPayload = {
        file: values.file
      };

      // set the promise
      promise = new Promise((resolve, reject) => {
        props.achievementDispatch.patchRequest({
          resolve,
          reject,
          data: payload
        });
      });
    }

    // handling promise
    promise
      .then(() => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(lookupMessage.achievement.message.createSuccess)
        });

        // redirect to detail
        props.history.push(`/lookup/achievementchart`);
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
          message: props.intl.formatMessage(lookupMessage.achievement.message.createFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<AchievementFormProps, IOwnState> = {
  componentDidMount() {
    // configure view
    this.props.masterPage.changePage({
      uid: AppMenu.AchievementChart,
      parentUid: AppMenu.Lookup,
      title: this.props.intl.formatMessage(lookupMessage.achievement.page.newTitle),
      description: this.props.intl.formatMessage(lookupMessage.achievement.page.newSubHeader)
    });
  },
};

export const LookupAchievementForm = compose<AchievementFormProps, IOwnOption>(
  setDisplayName('LookupAchievementForm'),
  withUser,
  withMasterPage,
  withRouter,
  withAchievement,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LookupAchievementFormView);