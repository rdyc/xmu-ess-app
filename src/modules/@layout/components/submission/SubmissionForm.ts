import { FormikProps } from 'formik';
import {
  compose,
  HandleCreators,
  mapper,
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
  & IOwnStateUpdater; 

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
    props.formikProps.submitForm();
  },
};

export const SubmissionForm = compose<SubmissionFormProps, IOwnProps>(
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators)
)(SubmissionFormView);