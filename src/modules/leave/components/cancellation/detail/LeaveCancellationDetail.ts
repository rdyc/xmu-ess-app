import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILeaveCancellationPostPayload } from '@leave/classes/request';
import { WithLeaveCancellation, withLeaveCancellation } from '@leave/hoc/withLeaveCancellation';
import { leaveCancellationMessage } from '@leave/locales/messages/leaveCancellationMessage';
import { lookupMessage } from '@leave/locales/messages/leaveMessage';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { LeaveCancellationFormData } from '../form/LeaveCancellationForm';
import { LeaveCancellationDetailView } from './LeaveCancellationDetailView';

interface OwnHandler {
  handleValidate: (payload: LeaveCancellationFormData) => FormErrors;
  handleSubmit: (payload: LeaveCancellationFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  leaveUid: string;
}

interface OwnState {
  cancellationTitle: string;
  cancellationSubHeader: string;
  cancellationDialogTitle: string;
  cancellationDialogContentText: string;
  cancellationDialogCancelText: string;
  cancellationDialogConfirmedText: string;
}

export type LeaveCancellationDetailProps
  = WithLeaveCancellation
  & WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnHandler
  & OwnState;

const createProps: mapper<LeaveCancellationDetailProps, OwnState> = (props: LeaveCancellationDetailProps): OwnState => {
  const { intl } = props;

  return {
    cancellationTitle: intl.formatMessage(lookupMessage.request.section.cancellationTitle),
    cancellationSubHeader: intl.formatMessage(lookupMessage.request.section.cancellationSubHeader),
    cancellationDialogTitle: intl.formatMessage(lookupMessage.cancellation.confirm.submissionTitle),
    cancellationDialogContentText: intl.formatMessage(lookupMessage.cancellation.confirm.submissionContent),
    cancellationDialogCancelText: intl.formatMessage(layoutMessage.action.cancel),
    cancellationDialogConfirmedText: intl.formatMessage(layoutMessage.action.continue),
  };
};

const handlerCreators: HandleCreators<LeaveCancellationDetailProps, OwnHandler> = {
  handleValidate: (props: LeaveCancellationDetailProps) => (formData: LeaveCancellationFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: LeaveCancellationDetailProps) => (formData: LeaveCancellationFormData) => { 
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.leaveCancellationDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.leaveUid) {
      const message = intl.formatMessage(leaveCancellationMessage.emptyProps);

      return Promise.reject(message);
    }

    // generate payload
    const payload: ILeaveCancellationPostPayload = {
      cancelDate: formData.cancelDate
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      createRequest({
        resolve, 
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        leaveUid: match.params.leaveUid, 
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: LeaveCancellationDetailProps) => (response: boolean) => {
    const { intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    alertAdd({
      time: new Date(),
      message: intl.formatMessage(leaveCancellationMessage.submitSuccess),
    });

    history.push('/Leave/Cancellations');
  },
  handleSubmitFail: (props: LeaveCancellationDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      alertAdd({
        time: new Date(),
        message: intl.formatMessage(leaveCancellationMessage.submitFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

export const LeaveCancellationDetail = compose<LeaveCancellationDetailProps, {}>(
  withRouter,
  withUser,
  withLayout,
  withLeaveCancellation,
  injectIntl,
  withStateHandlers(createProps, {}),
  withHandlers(handlerCreators),
)(LeaveCancellationDetailView);