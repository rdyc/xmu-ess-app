import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps, FormMode } from '@generic/types';
import { IAlert, ILayoutState, IView } from '@layout/interfaces';
import { layoutAlertAdd, layoutChangeView, layoutNavBackHide, layoutNavBackShow } from '@layout/store/actions';
import { ILeaveRequestGetByIdRequest, ILeaveRequestPutRequest } from '@leave/classes/queries';
import { ILeaveRequestPutPayload } from '@leave/classes/request';
import { ILeaveRequest, ILeaveRequestDetail } from '@leave/classes/response';
import LeaveRequestFormComponent from '@leave/components/request/LeaveRequestFormComponent';
import { leaveRequestGetByIdDispose, leaveRequestGetByIdRequest, leaveRequestPutDispose, leaveRequestPutRequest } from '@leave/store/actions';
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
  leaveRequestGetState: IQuerySingleState<ILeaveRequestGetByIdRequest, ILeaveRequestDetail>;
  leaveRequestPutState: IQuerySingleState<ILeaveRequestPutRequest, ILeaveRequest>;
}

interface PropsFromDispatch {
  layoutDispatch: {
    changeView: typeof layoutChangeView;
    navBackShow: typeof layoutNavBackShow;
    navBackHide: typeof layoutNavBackHide;
    alertAdd: typeof layoutAlertAdd;
  };

  leaveRequestDispatch: {
    getByIdRequest: typeof leaveRequestGetByIdRequest;
    getByIdDispose: typeof leaveRequestGetByIdDispose;
    putRequest: typeof leaveRequestPutRequest;
    putDispose: typeof leaveRequestPutDispose;
  };
}

interface RouteParams {
  leaveRequestUid: string;
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
  leaveRequestUid: ''
};

type State = Readonly<typeof initialState>;

class LeaveRequestFormContainer extends React.Component<AllProps, State> {
  state: State = initialState;

  componentWillMount() {
    const { history } = this.props;
    const { user } = this.props.layoutState;

    if (user) {
      this.setState({ 
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }

    if (!isNullOrUndefined(history.location.state)) {
      this.setState({ 
        mode: FormMode.Edit,
        leaveRequestUid: history.location.state.uid
      });

      this.loadData(history.location.state.uid);
    }
  }

  componentDidMount() {
    const { layoutDispatch, intl } = this.props;

    const view = {
      title: 'leaveRequest.form.newTitle',
      subTitle: 'leaveRequest.form.newSubTitle',
    };

    if (this.state.mode === FormMode.Edit) {
      view.title = 'leaveRequest.form.editTitle';
      view.subTitle = 'leaveRequest.form.editSubTitle';
    }

    layoutDispatch.changeView({
      menuUid: 'MNU16',
      title: intl.formatMessage({id: view.title}),
      subTitle : intl.formatMessage({id: view.subTitle})
    });

    layoutDispatch.navBackShow();

    if (this.state.leaveRequestUid !== '') {
      this.loadData(this.state.leaveRequestUid);
    } else {
      //
    }   
  }

  componentWillUnmount() {
    const { layoutDispatch, leaveRequestDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    
    leaveRequestDispatch.getByIdDispose();
    leaveRequestDispatch.putDispose();
  }

  loadData = (uid: string): void => {
    const { user } = this.props.layoutState;
    const { getByIdRequest } = this.props.leaveRequestDispatch;
    
    if (user) {
      getByIdRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        leaveRequestUid: uid
      });
    }
  }

  transform = (payload: ILeaveRequestDetail): ILeaveRequestPutPayload => {
    return {
      leaveType: payload.leaveType,
      regularType: payload.regularType,
      start: payload.start,
      end: payload.end,
      address: payload.address,
      contactNumber: payload.contactNumber,
      reason: payload.reason,
    };
  };

  handleValidate = (payload: ILeaveRequestDetail) => {
    const errors = {};
  
    const requiredFields = [
      'leaveType', 'start', 'end', 
      'address', 'contactNumber', 'reason', 
    ];
  
    requiredFields.forEach(field => {
      if (!payload[field] || isNullOrUndefined(payload[field])) {
        errors[field] = 'Required';
      }
    });
    
    return errors;
  }

  handleSubmit = (payload: ILeaveRequestDetail) => { 
    const { leaveRequestUid } = this.state;
    const { user } = this.props.layoutState;
    const { putRequest } = this.props.leaveRequestDispatch;

    if (user) {
      return Promise.resolve(
        putRequest({
          leaveRequestUid,
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
    const { isLoading, response } = this.props.leaveRequestGetState;

    if (isLoading && !response) {
      return (
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      );
    }

    if (!isLoading && response && response.data) {
      return (
        <LeaveRequestFormComponent
          {...this.props}
          {...this.state}
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

const mapStateToProps = ({ layout, leaveRequestGetById, leaveRequestPut }: IAppState) => ({
  layoutState: layout,
  leaveRequestGetState: leaveRequestGetById,
  leaveRequestPutState: leaveRequestPut,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  layoutDispatch: {
    changeView: (page: IView | null) => dispatch(layoutChangeView(page)),
    navBackShow: () => dispatch(layoutNavBackShow()),
    navBackHide: () => dispatch(layoutNavBackHide()),
    alertAdd: (alert: IAlert) => dispatch(layoutAlertAdd(alert)),
  },

  leaveRequestDispatch: {
    getByIdRequest: (request: ILeaveRequestGetByIdRequest) => dispatch(leaveRequestGetByIdRequest(request)),
    getByIdDispose: () => dispatch(leaveRequestGetByIdDispose()),
    putRequest: (request: ILeaveRequestPutRequest) => dispatch(leaveRequestPutRequest(request)),
    putDispose: () => dispatch(leaveRequestPutDispose()),
  }
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  withStyles(styles)(
    injectIntl(LeaveRequestFormContainer)
  )
);
