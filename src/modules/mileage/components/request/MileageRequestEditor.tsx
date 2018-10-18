import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
// import { Typography } from '@material-ui/core';

import { IMileageRequestPostPayload } from '@mileage/classes/request';
import {
  MileageFormContainer,
  MileageFormData,
} from '@mileage/components/request/forms/RegistrationFormContainer';
import withApiMileageRequestDetail, {
  WithApiMileageRequestDetailHandler
} from '@mileage/enhancers/request/withApiMileageRequestDetail';
import withMileageRequestDetail, {
  WithMileageRequestDetail
} from '@mileage/enhancers/request/withMileageRequestDetail';

import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
// import { RouteComponentProps } from 'react-router';
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
  withStateHandlers
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

interface State {
  mode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
}

interface Updaters extends StateHandlerMap<State> {
  stateUpdate: StateHandler<State>;
}

interface Handler {
  handleValidate: (payload: MileageFormData) => FormErrors;
  handleSubmit: (payload: MileageFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (
    errors: FormErrors | undefined,
    dispatch: Dispatch<any>,
    submitError: any
  ) => void;
}

type AllProps = WithApiMileageRequestDetailHandler &
  WithMileageRequestDetail &
  WithUser &
  WithLayout &
  WithAppBar &
  InjectedIntlProps &
  Handler &
  State &
  Updaters;

const mileageEditor: React.SFC<AllProps> = props => {
  const {
    mode,
    handleSubmit,
    handleSubmitFail,
    handleSubmitSuccess,
    handleValidate
  } = props;
  // const { isLoading, response } = props.mileagerequestDetailState;

  const renderForm = (formData: MileageFormData) => (
    <MileageFormContainer
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit}
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  const initialValues: MileageFormData = {
    information: {
      year: 0,
      month: 0,
      amount: 0
    }
  };

  // New
  if (mode === FormMode.New) {
    return renderForm(initialValues);
  }
  
  return null;
};

const handlerCreators: HandleCreators<AllProps, Handler> = {
  handleValidate: (props: AllProps) => (
    payload: MileageFormData
  ) => {
    const errors = {
      information: {}
    };

    const requiredFields = ['year', 'month'];

    requiredFields.forEach(field => {
      if (
        !payload.information[field] ||
        isNullOrUndefined(payload.information[field])
      ) {
        errors.information[field] = props.intl.formatMessage({
          id: `mileage.request.field.information.${field}.required`
        });
      }
    });

    return errors;
  },

  handleSubmit: (props: AllProps) => (payload: MileageFormData) => {
    const { mode, apiMileageDetailPost } = props;
    const { user } = props.userState;

    if (!user) {
      return Promise.reject('User not found');
    }

    const putPayload: IMileageRequestPostPayload = ({
      year: payload.information.year,
      month: payload.information.month,
      amount: payload.information.amount
    });

    console.log(putPayload);

    if (mode === FormMode.New) {
      return new Promise((resolve, reject) => {
        apiMileageDetailPost(putPayload, resolve, reject);
      });
    }

    return null;
  },

  handleSubmitSuccess: (props: AllProps) => (
    result: any,
    dispatch: Dispatch<any>
  ) => {
    // console.log(result);
    // console.log(dispatch);
    const { alertAdd } = props.layoutDispatch;

    alertAdd({
      time: new Date(),
      message: 'Success bro!!!'
    });
  },

  handleSubmitFail: (props: AllProps) => (
    errors: FormErrors | undefined,
    dispatch: Dispatch<any>,
    submitError: any
  ) => {
    const { alertAdd } = props.layoutDispatch;

    if (submitError) {
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
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
    const {
      layoutDispatch,
      intl,
      // history,
      stateUpdate,
      // apiRegistrationDetailGet
    } = this.props;
    const { user } = this.props.userState;

    const view = {
      title: 'mileage.request.form.newTitle',
      subTitle: 'mileage.request.form.newSubTitle'
    };

    if (user) {
      stateUpdate({
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }

    layoutDispatch.changeView({
      uid: AppMenu.MileageRequest,
      parentUid: AppMenu.Mileage,
      title: intl.formatMessage({ id: view.title }),
      subTitle: intl.formatMessage({ id: view.subTitle })
    });

    layoutDispatch.navBackShow();
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
  setDisplayName('MileageEditor'),

  withUser,
  withLayout,
  withAppBar,
  withMileageRequestDetail,
  withApiMileageRequestDetail,
  injectIntl,

  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters),
  withHandlers<AllProps, Handler>(handlerCreators),

  lifecycle<AllProps, {}>(lifecycles)
)(mileageEditor);
