import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { layoutMessage } from '@layout/locales/messages';
import { FormikProps } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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

import { SubmissionTriggerView } from './SubmissionTriggerView';

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
  warningMessage?: string;
  className?: string;
  formikProps: FormikProps<any>;
  buttonLabelProps: ISubmissionButtonLabelProps;
  confirmationDialogProps: ISubmissionDialogProps;
  disableButtons?: boolean;
  isOpenDialog: boolean;
  setOpen: () => void;
}

interface IOwnHandler {
  handleOnCanceled: (event: React.MouseEvent) => void;
  handleOnConfirmed: (event: React.MouseEvent) => void;
}

interface IOwnState {
  // isOpenDialog: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // setOpen: StateHandler<IOwnState>;
}

export type SubmissionTriggerProps
  = IOwnProps
  & IOwnProps
  & IOwnHandler
  & IOwnState
  & IOwnStateUpdater
  & WithMasterPage
  & InjectedIntlProps; 

const createProps: mapper<SubmissionTriggerProps, IOwnState> = (props: SubmissionTriggerProps): IOwnState => ({
  // isOpenDialog: false
});

const stateUpdaters: StateUpdaters<SubmissionTriggerProps, IOwnState, IOwnStateUpdater> = {
  // setOpen: (prevState: IOwnState) => () => ({
  //   isOpenDialog: !prevState.isOpenDialog,
  // })
};

const handlerCreators: HandleCreators<SubmissionTriggerProps, IOwnHandler> = {
  handleOnCanceled: (props: SubmissionTriggerProps) => () => {
    props.setOpen();
  },
  handleOnConfirmed: (props: SubmissionTriggerProps) => () => {
    props.setOpen();
    
    if (Object.keys(props.formikProps.errors).length) {
      props.masterPage.flashMessage({
        message: props.warningMessage || props.intl.formatMessage(layoutMessage.text.invalidFormFields)
      });
    }

    props.formikProps.submitForm();
  },
};

const lifeCycleFunctions: ReactLifeCycleFunctions<SubmissionTriggerProps, IOwnState> = {
  componentDidUpdate(prevProps: SubmissionTriggerProps) {
    // const { isOpenDialog } = this.props;

    // console.log(isOpenDialog, 'dialog is open?');
  }
};

export const SubmissionTrigger = compose<SubmissionTriggerProps, IOwnProps>(
  setDisplayName('SubmissionTrigger'),
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
)(SubmissionTriggerView);