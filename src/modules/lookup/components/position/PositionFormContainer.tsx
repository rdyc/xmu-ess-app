import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps, FormMode } from '@generic/types';
import { IAlert, ILayoutState, IView } from '@layout/interfaces';
import { layoutAlertAdd, layoutChangeView, layoutNavBackHide, layoutNavBackShow } from '@layout/store/actions';
import { IPositionGetByIdRequest, IPositionPutRequest } from '@lookup/classes/queries';
import { IPositionPutPayload } from '@lookup/classes/request';
import { IPosition, IPositionDetail } from '@lookup/classes/response';
import { PositionFormComponent } from '@lookup/components/position';
import { positionGetByIdDispose, positionGetByIdRequest, positionPutDispose, positionPutRequest } from '@lookup/store/actions';
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
  positionGetState: IQuerySingleState<IPositionGetByIdRequest, IPositionDetail>;
  positionPutState: IQuerySingleState<IPositionPutRequest, IPosition>;
}

interface PropsFromDispatch {
  layoutDispatch: {
    changeView: typeof layoutChangeView;
    navBackShow: typeof layoutNavBackShow;
    navBackHide: typeof layoutNavBackHide;
    alertAdd: typeof layoutAlertAdd;
  };

  positionDispatch: {
    getByIdRequest: typeof positionGetByIdRequest;
    getByIdDispose: typeof positionGetByIdDispose;
    putRequest: typeof positionPutRequest;
    putDispose: typeof positionPutDispose;
  };
}

interface RouteParams {
  positionUid: string;
}

type AllProps = PropsFromState & 
                PropsFromDispatch & 
                RouteComponentProps<RouteParams> & 
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithStyles<typeof styles>;

const initialState = {
  mode: FormMode.New,
  positionUid: ''
};

type State = Readonly<typeof initialState>;
  
class PositionForm extends React.Component<AllProps, State> {
  public state: State = initialState;

  public componentWillMount() {
    const { history } = this.props;

    if (!isNullOrUndefined(history.location.state)) {
      this.setState({ 
        mode: FormMode.Edit,
        positionUid: history.location.state.uid
      });

      this.loadData(history.location.state.uid);
    }
  }

  public componentDidMount() {
    const { layoutDispatch, intl } = this.props;

    const view = {
      title: 'position.form.newTitle',
      subTitle: 'position.form.newSubTitle',
    };

    if (this.state.mode === FormMode.Edit) {
      view.title = 'position.form.editTitle';
      view.subTitle = 'position.form.editSubTitle';
    }

    layoutDispatch.changeView({
      menuUid: 'MNU06',
      title: intl.formatMessage({id: view.title}),
      subTitle : intl.formatMessage({id: view.subTitle})
    });

    layoutDispatch.navBackShow();

    if (this.state.positionUid !== '') {
      this.loadData(this.state.positionUid);
    } else {
      //
    }   
  }

  public componentWillUnmount() {
    const { layoutDispatch, positionDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    
    positionDispatch.getByIdDispose();
    positionDispatch.putDispose();
  }

  public render () {
    const { isLoading, response } = this.props.positionGetState;

    if (isLoading && !response) {
      return (
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      );
    }

    if (!isLoading && response && response.data) {
      return (
        <PositionFormComponent
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

  private loadData = (uid: string): void => {
    const { user } = this.props.layoutState;
    const { getByIdRequest } = this.props.positionDispatch;
    
    if (user) {
      getByIdRequest({
        companyUid: user.company.uid,
        positionUid: uid
      });
    }
  }

  private transform = (payload: IPositionDetail): IPositionPutPayload => {
    return {
      name: payload.name,
      description: payload.description,
      isAllowMultiple: payload.isAllowMultiple,
      inactiveDate: payload.inactiveDate,
    };
  };

  private handleValidate = (payload: IPositionDetail) => {
    const errors = {};
  
    const requiredFields = [
      'name'
    ];
  
    requiredFields.forEach(field => {
      if (!payload[field] || isNullOrUndefined(payload[field])) {
        errors[field] = 'Required';
      }
    });
    
    return errors;
  }

  private handleSubmit = (payload: IPositionDetail) => { 
    const { positionUid } = this.state;
    const { user } = this.props.layoutState;
    const { putRequest } = this.props.positionDispatch;

    if (user) {
      const promise = new Promise((resolve, reject) => {
        putRequest({
          resolve,
          reject,
          positionUid,
          companyUid: user.company.uid,
          data: this.transform(payload)
        });
      });

      return promise;
    }

    return Promise.reject('Empty user!');
  };

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

const mapStateToProps = ({ layout, positionGetById, positionPut }: IAppState) => ({
  layoutState: layout,
  positionGetState: positionGetById,
  positionPutState: positionPut,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  layoutDispatch: {
    changeView: (page: IView | null) => dispatch(layoutChangeView(page)),
    navBackShow: () => dispatch(layoutNavBackShow()),
    navBackHide: () => dispatch(layoutNavBackHide()),
    alertAdd: (alert: IAlert) => dispatch(layoutAlertAdd(alert)),
  },

  positionDispatch: {
    getByIdRequest: (request: IPositionGetByIdRequest) => dispatch(positionGetByIdRequest(request)),
    getByIdDispose: () => dispatch(positionGetByIdDispose()),
    putRequest: (request: IPositionPutRequest) => dispatch(positionPutRequest(request)),
    putDispose: () => dispatch(positionPutDispose()),
  }
});

export const PositionFormContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  withStyles(styles)(
    injectIntl(PositionForm)
  )
);