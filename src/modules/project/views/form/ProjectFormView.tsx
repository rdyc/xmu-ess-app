import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps, FormMode } from '@generic/types';
import { ILayoutState, IView, IAlert } from '@layout/interfaces';
import { layoutChangeView, layoutNavBackHide, layoutNavBackShow, layoutAlertAdd } from '@layout/store/actions';
import { Typography, WithStyles, withStyles } from '@material-ui/core';
import ProjectForm from '@project/components/list/ProjectForm';
import { IProjectGetByIdRequest } from '@project/interfaces/queries';
import { IProjectDetail } from '@project/interfaces/response';
import { projectGetByIdDispose, projectGetByIdRequest } from '@project/store/actions';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { isNullOrUndefined } from 'util';
import { FormErrors } from 'redux-form';

interface PropsFromState extends RouteComponentProps<void> {
  layoutState: ILayoutState;
  projectState: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
}

interface PropsFromDispatch {
  layoutDispatch: {
    changeView: typeof layoutChangeView;
    navBackShow: typeof layoutNavBackShow;
    navBackHide: typeof layoutNavBackHide;
    alertAdd: typeof layoutAlertAdd;
  };

  projectDispatch: {
    getByIdRequest: typeof projectGetByIdRequest;
    getByIdDispose: typeof projectGetByIdDispose;
  };
}

interface RouteParams {
  projectUid: string;
}

type AllProps = PropsFromState & 
                PropsFromDispatch & 
                RouteComponentProps<RouteParams> & 
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithStyles<typeof styles>;

const initialState = {
  mode: FormMode.New,
  projectUid: ''
};

type State = Readonly<typeof initialState>;
  
class ProjectFormView extends React.Component<AllProps, State> {
  state: State = initialState;

  componentWillUnmount() {
    const { layoutDispatch, projectDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    
    projectDispatch.getByIdDispose();
  }

  componentWillMount() {
    const { history } = this.props;

    if (!isNullOrUndefined(history.location.state)) {
      this.setState({ 
        mode: FormMode.Edit,
        projectUid: history.location.state.uid
      });

      this.loadData(history.location.state.uid);
    }
  }

  componentDidMount() {
    const { layoutDispatch, intl } = this.props;

    const view = {
      title: 'project.form.newTitle',
      subTitle: 'project.form.newSubTitle',
    };

    if (this.state.mode === FormMode.Edit) {
      view.title = 'project.form.editTitle';
      view.subTitle = 'project.form.editSubTitle';
    }

    layoutDispatch.changeView({
      menuUid: 'MNU19',
      title: intl.formatMessage({id: view.title}),
      subTitle : intl.formatMessage({id: view.subTitle})
    });

    layoutDispatch.navBackShow();

    if (this.state.projectUid !== '') {
      this.loadData(this.state.projectUid);
    } else {
      //
    }   
  }

  loadData = (uid: string): void => {
    const { layoutState, projectDispatch,  } = this.props;
    
    if (layoutState.user) {
      projectDispatch.getByIdRequest({
        companyUid: layoutState.user.company.uid,
        positionUid: layoutState.user.position.uid,
        projectUid: uid
      });
    }
  }

  handleValidate = (payload: IProjectDetail) => {
    const errors = {};
  
    const requiredFields = [
      'name',
    ];
  
    requiredFields.forEach(field => {
      if (!payload[field]) {
        errors[field] = 'Required';
      }
    });
    
    return errors;
  }

  handleSubmit = (payload: IProjectDetail) => { 
    // this.props.commandRequest({
    //   uid: this.props.user.uid,
    //   method: Command.PUT,
    //   data: this.transform(payload)
    // });
    
    return this.sleep(1000).then(() => { 
      console.log(payload); 

      return Promise.reject('test reject');
      return Promise.resolve('ok');
    });
  };

  handleSubmitSuccess = (result: any, dispatch: Dispatch<any>) => {
    const { alertAdd } = this.props.layoutDispatch;

    alertAdd({
      time: new Date(),
      message: result
    });
  };

  handleSubmitFail = (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { alertAdd } = this.props.layoutDispatch;

    alertAdd({
      time: new Date(),
      message: 'Failed when trying to update data!',
    });

    alertAdd({
      time: new Date(),
      message: 'Wakakak kaskdka',
      details: submitError
    });
  };

  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  render () {
    const { isLoading, response } = this.props.projectState;

    if (isLoading && !response) {
      return (
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      );
    }

    if (!isLoading && response && response.data) {
      return (
        <ProjectForm 
          {...this.props}
          form="projectForm" 
          initialValues={response.data}
          validate={this.handleValidate}
          onSubmit={this.handleSubmit} 
          onSubmitSuccess={this.handleSubmitSuccess}
          onSubmitFail={this.handleSubmitFail}
        />
      );
    }
    
    return null;
  }
}

const mapStateToProps = ({ layout, projectGetById }: IAppState) => ({
  layoutState: layout,
  projectState: projectGetById
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  layoutDispatch: {
    changeView: (page: IView | null) => dispatch(layoutChangeView(page)),
    navBackShow: () => dispatch(layoutNavBackShow()),
    navBackHide: () => dispatch(layoutNavBackHide()),
    alertAdd: (alert: IAlert) => dispatch(layoutAlertAdd(alert)),
  },

  projectDispatch: {
    getByIdRequest: (request: IProjectGetByIdRequest) => dispatch(projectGetByIdRequest(request)),
    getByIdDispose: () => dispatch(projectGetByIdDispose()),
  }
});

const redux = connect(mapStateToProps, mapDispatchToProps)(ProjectFormView);

export default injectIntl(withStyles(styles)(redux));