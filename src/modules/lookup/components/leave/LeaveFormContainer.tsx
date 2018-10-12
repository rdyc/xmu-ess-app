
import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps, FormMode } from '@generic/types';
import { IAlert, ILayoutState, IView } from '@layout/interfaces';
import { layoutAlertAdd, layoutChangeView, layoutNavBackHide, layoutNavBackShow } from '@layout/store/actions';
import { ILeaveByIdRequest, ILeavePutRequest } from '@lookup/classes/queries';
// import { ILeavePutPayload } from '@lookup/classes/request';
import { ILeave, ILeaveDetail } from '@lookup/classes/response';
import { LeaveFormComponent } from '@lookup/components/leave';
import { leaveGetByIdDispose, leaveGetByIdRequest, leavePutDispose, leavePutRequest } from '@lookup/store/actions';
import { Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface PropsFromState extends RouteComponentProps<void> {
  layoutState: ILayoutState;
  leaveGetState: IQuerySingleState<ILeaveByIdRequest, ILeaveDetail>;
  leavePutState: IQuerySingleState<ILeavePutRequest, ILeave>;
}

interface PropsFromDispatch {
  layoutDispatch: {
    changeView: typeof layoutChangeView;
    navBackShow: typeof layoutNavBackShow;
    navBackHide: typeof layoutNavBackHide;
    alertAdd: typeof layoutAlertAdd;
  };

  leaveDispatch: {
    getByIdRequest: typeof leaveGetByIdRequest;
    getByIdDispose: typeof leaveGetByIdDispose;
    putRequest: typeof leavePutRequest;
    putDispose: typeof leavePutDispose;
  };
}

interface RouteParams {
  leaveUid: string;
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
  leaveUid: ''
};

type State = Readonly<typeof initialState>;

class LeaveForm extends React.Component<AllProps, State> {
  public state: State = initialState;

  public componentWillMount() {
    const { history } = this.props;
    const { user } = this.props.layoutState;

    if (user) {
      this.setState({ 
        companyUid: user.company.uid,
      });
    }

    if (!isNullOrUndefined(history.location.state)) {
      this.setState({ 
        mode: FormMode.Edit,
        leaveUid: history.location.state.uid
      });

      this.loadData(history.location.state.uid);
    }
  }

  public componentDidMount() {
    const { layoutDispatch, intl } = this.props;

    const view = {
      title: 'leave.form.newTitle',
      subTitle: 'leave.form.newSubTitle',
    };

    if (this.state.mode === FormMode.Edit) {
      view.title = 'leave.form.editTitle';
      view.subTitle = 'leave.form.editSubTitle';
    }

    layoutDispatch.changeView({
      menuUid: 'MNU48',
      title: intl.formatMessage({id: view.title}),
      subTitle : intl.formatMessage({id: view.subTitle})
    });

    layoutDispatch.navBackShow();

    if (this.state.leaveUid !== '') {
      this.loadData(this.state.leaveUid);
    } else {
      //
    }   
  }

  public componentWillUnmount() {
    const { layoutDispatch, leaveDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    
    leaveDispatch.getByIdDispose();
    leaveDispatch.putDispose();
  }

  public render () {
    const { isLoading, response } = this.props.leaveGetState;

    if (isLoading && !response) {
      return (
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      );
    }

    if (!isLoading && response && response.data) {
      return (
        <LeaveFormComponent
          {...this.props}
          {...this.state}
          initialValues={response.data} 
          validate={this.handleValidate}
          // onSubmit={this.handleSubmit} 
          onSubmitSuccess={this.handleSubmitSuccess}
          onSubmitFail={this.handleSubmitFail}
        />
      );
    }
    
    return null;
  }

  private loadData = (uid: string): void => {
    const { user } = this.props.layoutState;
    const { getByIdRequest } = this.props.leaveDispatch;
    
    if (user) {
      getByIdRequest({
        companyUid: user.company.uid,
        leaveUid: uid
      });
    }
  }

  // private transform = (payload: ILeaveDetail): ILeavePutPayload => {

  //   return {
  //     companyUid: payload.companyUid,
  //     year: payload.year,
  //     categoryType: payload.categoryType,
  //     name: payload.name,
  //     allocation: payload.allocation
  //   };
  // };

  private handleValidate = (payload: ILeaveDetail) => {
    const errors = {};
  
    const requiredFields = [
      'company', 'year', 'categoryType', 
      'name', 'allocation'
    ];
  
    requiredFields.forEach(field => {
      if (!payload[field] || isNullOrUndefined(payload[field])) {
        errors[field] = 'Required';
      }
    });
    
    return errors;
  }

  // private handleSubmit = (payload: ILeaveDetail) => { 
  //   const { leaveUid } = this.state;
  //   const { user } = this.props.layoutState;
  //   const { putRequest } = this.props.leaveDispatch;

  //   if (user) {
  //     const promise = new Promise((resolve, reject) => {
  //       putRequest({
  //         // resolve,
  //         reject,
  //         leaveUid,
  //         companyUid: payload.companyUid,
  //         data: this.transform(payload)
  //       });
  //     });

  //     return promise;
  //   }

  //   return Promise.reject('Empty user!');
  // };

  private handleSubmitSuccess = (result: any, dispatch: Dispatch<any>) => {
    console.log(result);
    console.log(dispatch);
    const { alertAdd } = this.props.layoutDispatch;

    alertAdd({
      time: new Date(),
      message: 'Success bro!!!'
    });
  };

  private handleSubmitFail = (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    // console.log(errors);
    // console.log(dispatch);
    // console.log(submitError);

    const { alertAdd } = this.props.layoutDispatch;
    
    if (submitError) {
      alertAdd({
        time: new Date(),
        message: submitError.message
      });
    }
  };
}

const mapStateToProps = ({ layout, leaveGetById, leavePut }: IAppState) => ({
  layoutState: layout,
  leaveGetState: leaveGetById,
  leavePutState: leavePut,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  layoutDispatch: {
    changeView: (page: IView | null) => dispatch(layoutChangeView(page)),
    navBackShow: () => dispatch(layoutNavBackShow()),
    navBackHide: () => dispatch(layoutNavBackHide()),
    alertAdd: (alert: IAlert) => dispatch(layoutAlertAdd(alert)),
  },

  leaveDispatch: {
    getByIdRequest: (request: ILeaveByIdRequest) => dispatch(leaveGetByIdRequest(request)),
    getByIdDispose: () => dispatch(leaveGetByIdDispose()),
    putRequest: (request: ILeavePutRequest) => dispatch(leavePutRequest(request)),
    putDispose: () => dispatch(leavePutDispose()),
  }
});

export const LeaveFormContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  withStyles(styles)(
    injectIntl(LeaveForm)
  )
);