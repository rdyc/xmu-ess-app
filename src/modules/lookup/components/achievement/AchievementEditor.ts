import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { IAchievementPatchPayload } from '@lookup/classes/request/achievement';
import { IAchievementResult } from '@lookup/classes/response/achievement';
import { WithAchievement, withAchievement } from '@lookup/hoc/withAchievement';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { AchievementEditorView } from './AchievementEditorView';
import { UploadFormData } from './AchievementForm';

interface OwnHandlers {
  handleValidate: (values: UploadFormData) => any;
  handleSubmit: (values: UploadFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

export type AchievementEditorProps 
  = OwnHandlers
  & WithLayout
  & WithMasterPage
  & InjectedIntlProps
  & RouteComponentProps
  & WithAchievement;

const handlerCreators: HandleCreators<AchievementEditorProps, OwnHandlers> = {
  handleValidate: (props: AchievementEditorProps) => (values: UploadFormData) => { 
    const errors = {};
  
    const requiredFields = ['file'];
  
    requiredFields.forEach(field => {
      if (!values[field] || isNullOrUndefined(values[field])) {
        Object.assign(errors, {[field]: 'Required'});
      }
    });

    console.log('form error', errors);
    
    return errors;
  },
  handleSubmit: (props: AchievementEditorProps) => (formData: UploadFormData) => { 
    if (!formData.file) {  
      return Promise.reject('empty file');
    } 
    
    const payload = {
      ...formData
    };
    
    console.log(payload);

    return new Promise((resolve, reject) => {
      props.achievementDispatch.patchRequest({
        resolve, 
        reject,
        data: payload as IAchievementPatchPayload
      });
    });
  },
  handleSubmitSuccess: (props: AchievementEditorProps) => (response: IAchievementResult) => {
    const { alertAdd } = props.layoutDispatch;
    
    const message = props.intl.formatMessage(lookupMessage.achievement.message.createSuccess);

    alertAdd({
      message,
      time: new Date()
    });

    props.history.push('/lookup/achievementchart');
  },
  handleSubmitFail: (props: AchievementEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      const message = props.intl.formatMessage(lookupMessage.achievement.message.createFailure);

      // another errors from server
      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<AchievementEditorProps, {}> = {
  componentDidMount() {
    const { intl } = this.props;
    
    const view = {
      title: lookupMessage.achievement.page.newTitle,
      subTitle: lookupMessage.achievement.page.newSubHeader,
    };

    this.props.masterPage.changePage({
      uid: AppMenu.AchievementChart,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage(view.title),
      description : intl.formatMessage(view.subTitle)
    });
  },
  componentWillUnmount() {
    const { masterPage } = this.props;

    masterPage.resetPage();
  }
};

export const AchievementEditor = compose<AchievementEditorProps, {}>(
  withLayout,
  withMasterPage,
  withRouter,
  withAchievement,
  injectIntl,
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(AchievementEditorView);