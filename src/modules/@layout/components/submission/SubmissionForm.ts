import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { layoutMessage } from '@layout/locales/messages';
import { FormikProps } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  mapper,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { SubmissionFormView } from './SubmissionFormView';

interface ISubmissionButtonLabelProps {
  submit: string;
  reset: string;
  processing: string;
}

interface ISubmissionDialogProps {
  fullScreen?: boolean;
  title: string;
  message: string;
  labelCancel: string;
  labelConfirm: string;
}

interface IOwnProps {
  title: string;
  subheader?: string;
  warningMessage?: string;
  className: string;
  formikProps: FormikProps<any>;
  buttonLabelProps: ISubmissionButtonLabelProps;
  confirmationDialogProps: ISubmissionDialogProps;
}

interface IOwnHandler {
  handleOnCanceled: (event: React.MouseEvent) => void;
  handleOnConfirmed: (event: React.MouseEvent) => void;
}

interface IOwnState {
  isOpenDialog: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOpen: StateHandler<IOwnState>;
}

export type SubmissionFormProps
  = IOwnProps
  & IOwnProps
  & IOwnHandler
  & IOwnState
  & IOwnStateUpdater
  & WithMasterPage
  & InjectedIntlProps; 

const createProps: mapper<SubmissionFormProps, IOwnState> = (props: SubmissionFormProps): IOwnState => ({
  isOpenDialog: false
});

const stateUpdaters: StateUpdaters<SubmissionFormProps, IOwnState, IOwnStateUpdater> = {
  setOpen: (prevState: IOwnState) => () => ({
    isOpenDialog: !prevState.isOpenDialog,
  })
};

const handlerCreators: HandleCreators<SubmissionFormProps, IOwnHandler> = {
  handleOnCanceled: (props: SubmissionFormProps) => () => {
    props.setOpen();
  },
  handleOnConfirmed: (props: SubmissionFormProps) => () => {
    props.setOpen();
    
    if (Object.keys(props.formikProps.errors).length) {
      props.masterPage.flashMessage({
        message: props.warningMessage || props.intl.formatMessage(layoutMessage.text.invalidFormFields)
      });
    }

    props.formikProps.submitForm();
  },
};

export const SubmissionForm = compose<SubmissionFormProps, IOwnProps>(
  setDisplayName('SubmissionForm'),
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators)
)(SubmissionFormView);