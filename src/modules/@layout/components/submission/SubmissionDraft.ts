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
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { DraftType } from './DraftType';

import { SubmissionDraftView } from './SubmissionDraftView';

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
  confirmationDialogDraftProps: ISubmissionDialogProps;
  confirmationDialogFinalProps: ISubmissionDialogProps;
  disableButtons?: boolean;
  saveAs: (type: DraftType) => void;
  isFinal: boolean;
}

interface IOwnHandler {
  handleOnCanceled: (event: React.MouseEvent) => void;
  handleOnConfirmed: (event: React.MouseEvent) => void;
  handleSaveOption: (event: any) => void;
  handleSaveType: (saveType: DraftType) => void;
}

interface IOwnState {
  isOpenDialog: boolean;
  anchor: any;
  saveOptionOpen: boolean;
  saveType: DraftType;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOpen: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

export type SubmissionDraftProps
  = IOwnProps
  & IOwnProps
  & IOwnHandler
  & IOwnState
  & IOwnStateUpdater
  & WithMasterPage
  & InjectedIntlProps; 

const createProps: mapper<SubmissionDraftProps, IOwnState> = (props: SubmissionDraftProps): IOwnState => ({
  isOpenDialog: false,
  saveOptionOpen: false,
  anchor: '',
  saveType: DraftType.draft
});

const stateUpdaters: StateUpdaters<SubmissionDraftProps, IOwnState, IOwnStateUpdater> = {
  setOpen: (prevState: IOwnState) => () => ({
    isOpenDialog: !prevState.isOpenDialog,
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<SubmissionDraftProps, IOwnHandler> = {
  handleOnCanceled: (props: SubmissionDraftProps) => () => {
    props.setOpen();
  },
  handleOnConfirmed: (props: SubmissionDraftProps) => () => {
    props.setOpen();
    
    if (Object.keys(props.formikProps.errors).length) {
      props.masterPage.flashMessage({
        message: props.warningMessage || props.intl.formatMessage(layoutMessage.text.invalidFormFields)
      });
    }

    props.formikProps.submitForm();
  },
  handleSaveOption: (props: SubmissionDraftProps) => (event: any) => {
    props.stateUpdate({
      saveOptionOpen: !props.saveOptionOpen,
    });
    if (event) {
      props.stateUpdate({
        anchor: event.currentTarget
      });
    } else {
      props.stateUpdate({
        anchor: undefined
      });
    }
  },
  handleSaveType: (props: SubmissionDraftProps) => (saveType: DraftType) => {
    const { stateUpdate, saveAs, saveOptionOpen } = props;

    saveAs(saveType);
    stateUpdate({
      saveType,
      saveOptionOpen: !saveOptionOpen,
    });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<SubmissionDraftProps, IOwnState> = {
  componentWillUpdate(nextProps: SubmissionDraftProps) {
    // 
  },
  componentDidUpdate(prevProps: SubmissionDraftProps) {
    // 
  }
};

export const SubmissionDraft = compose<SubmissionDraftProps, IOwnProps>(
  setDisplayName('SubmissionDraft'),
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
)(SubmissionDraftView);