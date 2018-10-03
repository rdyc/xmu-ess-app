import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps, FormMode } from '@generic/types';
import { IAlert, ILayoutState, IView } from '@layout/interfaces';
import { layoutAlertAdd, layoutChangeView, layoutNavBackHide, layoutNavBackShow } from '@layout/store/actions';
import { Typography, WithStyles, withStyles } from '@material-ui/core';
import { IProjectGetByIdRequest, IProjectPutRequest } from '@project/classes/queries';
import { IProjectPutDocument, IProjectPutPayload, IProjectPutSales } from '@project/classes/request';
import { IProject, IProjectDetail } from '@project/classes/response';
import ProjectForm from '@project/components/list/ProjectForm';
import { projectGetByIdDispose, projectGetByIdRequest, projectPutDispose, projectPutRequest } from '@project/store/actions';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined } from 'util';
import { ProjectType } from '@common/types';

interface PropsFromState extends RouteComponentProps<void> {
  layoutState: ILayoutState;
  projectGetState: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
  projectPutState: IQuerySingleState<IProjectPutRequest, IProject>;
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
    putRequest: typeof projectPutRequest;
    putDispose: typeof projectPutDispose;
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
  companyUid: '',
  positionUid: '',
  projectUid: ''
};

type State = Readonly<typeof initialState>;
  
class ProjectFormView extends React.Component<AllProps, State> {
  state: State = initialState;

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

  componentWillUnmount() {
    const { layoutDispatch, projectDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    
    projectDispatch.getByIdDispose();
    projectDispatch.putDispose();
  }

  loadData = (uid: string): void => {
    const { user } = this.props.layoutState;
    const { getByIdRequest } = this.props.projectDispatch;
    
    if (user) {
      getByIdRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        projectUid: uid
      });
    }
  }

  transform = (payload: IProjectDetail): IProjectPutPayload => {
    const parseDocuments = () => {
      if (
        payload.projectType === ProjectType.ExtraMiles || 
        payload.projectType === ProjectType.NonProject
      ) {
        return null;
      }

      const _documents: IProjectPutDocument[] = [];
  
      if (payload.projectType === ProjectType.Project) {
        payload.documents.forEach(item => 
          _documents.push({
            uid: item.uid,
            documentType: item.documentType,
            isChecked: item.isAvailable
          })
        );
      }
      
      if (payload.projectType === ProjectType.PreSales) {
        payload.documentPreSales.forEach(item => 
          _documents.push({
            uid: item.uid,
            documentType: item.documentType,
            isChecked: item.isAvailable
          })
        );
      }
      
      return _documents;
    };

    const parseSales = () => {
      if (!payload.sales) {
        return undefined;
      }
  
      const _sales: IProjectPutSales[] = [];
  
      payload.sales.forEach(item => 
        _sales.push({
          uid: item.uid,
          employeeUid: item.employeeUid
        })
      );
      
      return _sales;
    };

    return {
      customerUid: payload.customerUid,
      projectType: payload.projectType,
      currencyType: payload.currencyType,
      contractNumber: payload.contractNumber,
      name: payload.name,
      description: payload.description,
      start: payload.start,
      end: payload.end,
      rate: payload.rate,
      valueUsd: payload.valueUsd,
      valueIdr: payload.valueIdr,
      documents: parseDocuments(),
      sales: parseSales()
    };
  };

  handleValidate = (payload: IProjectDetail) => {
    const errors = {};
  
    const requiredFields = [
      'customerUid', 'name', 'description', 
      'start', 'end', 'currency', 'valueUsd'
    ];
  
    requiredFields.forEach(field => {
      if (!payload[field] || isNullOrUndefined(payload[field])) {
        errors[field] = 'Required';
      }
    });
    
    return errors;
  }

  handleSubmit = (payload: IProjectDetail) => { 
    const { projectUid } = this.state;
    const { user } = this.props.layoutState;
    const { putRequest } = this.props.projectDispatch;

    if (user) {
      return Promise.resolve(
        putRequest({
          projectUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: this.transform(payload)
        })
      );
    }

    return Promise.reject('Empty user!');
  };

  handleSubmitSuccess = (result: any, dispatch: Dispatch<any>) => {
    console.log(result);
    console.log(dispatch);
    const { alertAdd } = this.props.layoutDispatch;

    alertAdd({
      time: new Date(),
      message: 'Success bro!!!'
    });
  };

  handleSubmitFail = (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    console.log(errors);
    console.log(dispatch);
    console.log(submitError);

    // const { alertAdd } = this.props.layoutDispatch;

    // alertAdd({
    //   time: new Date(),
    //   message: 'Failed when trying to update data!',
    // });

    // alertAdd({
    //   time: new Date(),
    //   message: 'Wakakak kaskdka',
    //   details: submitError
    // });
  };

  render () {
    const { isLoading, response } = this.props.projectGetState;

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

const mapStateToProps = ({ layout, projectGetById, projectPut }: IAppState) => ({
  layoutState: layout,
  projectGetState: projectGetById,
  projectPutState: projectPut,
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
    putRequest: (request: IProjectPutRequest) => dispatch(projectPutRequest(request)),
    putDispose: () => dispatch(projectPutDispose()),
  }
});

const redux = connect(mapStateToProps, mapDispatchToProps)(ProjectFormView);

export default injectIntl(withStyles(styles)(redux));