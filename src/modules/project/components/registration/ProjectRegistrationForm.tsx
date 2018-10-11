import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import withAppbar, { WithAppBar } from '@layout/hoc/withAppBar';
import withLayout, { WithLayout } from '@layout/hoc/withLayout';
import withUser, { WithUser } from '@layout/hoc/withUser';
import { Typography } from '@material-ui/core';
import loadDetailRegistration, { LoadDetailRegistrationHandler } from '@project/enhancers/registration/loadDetailRegistration';
import withDetailRegistration, { WithDetailRegistration } from '@project/enhancers/registration/withDetailRegistration';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import {
  compose,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withStateHandlers,
} from 'recompose';
import { isNullOrUndefined } from 'util';

interface RouteParams {
  projectUid: string;
}

interface State {
  mode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  projectUid?: string | undefined;
}

interface Updaters extends StateHandlerMap<State> {
  stateUpdate: StateHandler<State>;
}

type AllProps
  = WithDetailRegistration
  & LoadDetailRegistrationHandler
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<RouteParams>
  & InjectedIntlProps
  & State
  & Updaters;

const registrationForm: React.SFC<AllProps> = props => {
  const { isLoading, response } = props.projectDetailState;

  if (isLoading && !response) {
    return (
      <Typography variant="body2">
        <FormattedMessage id="global.loading"/>
      </Typography>
    );
  }
  
  if (!isLoading && response && response.data) {
    return (
      // <ProjectFormComponent
      //   {...props}
      //   initialValues={response.data} 
      //   validate={this.handleValidate}
      //   onSubmit={this.handleSubmit} 
      //   onSubmitSuccess={this.handleSubmitSuccess}
      //   onSubmitFail={this.handleSubmitFail}
      // />
      <React.Fragment>{response.data.name}</React.Fragment>
    );
  }

  return null;
};

const createProps: mapper<AllProps, State> = (props: AllProps): State => ({ 
  mode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, State, Updaters> = {
  stateUpdate: (prevState: State) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, mode, history, stateUpdate, handleReload } = this.props;
    const { user } = this.props.userState;

    const view = {
      title: 'project.form.newTitle',
      subTitle: 'project.form.newSubTitle',
    };

    if (mode === FormMode.Edit) {
      view.title = 'project.form.editTitle';
      view.subTitle = 'project.form.editSubTitle';
    }

    layoutDispatch.changeView({
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      title: intl.formatMessage({id: view.title}),
      subTitle : intl.formatMessage({id: view.subTitle})
    });

    layoutDispatch.navBackShow(); 
    
    if (user) {
      stateUpdate({ 
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }

    if (!isNullOrUndefined(history.location.state)) {
      stateUpdate({ 
        mode: FormMode.Edit,
        projectUid: history.location.state.uid
      });

      handleReload(history.location.state.uid);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

export default compose<AllProps, {}>(
  setDisplayName('ProjectRegistrationForm'),
  
  withUser,
  withLayout,
  withAppbar,
  withDetailRegistration,
  loadDetailRegistration,
  injectIntl,

  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters),
  lifecycle<AllProps, {}>(lifecycles),
)(registrationForm);