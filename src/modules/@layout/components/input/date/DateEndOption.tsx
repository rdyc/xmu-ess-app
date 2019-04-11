import { SelectFieldProps } from '@layout/components/fields/SelectField';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILeaveGetEndQuery } from '@leave/classes/queries/request';
import { ILeaveRequestFormValue } from '@leave/components/request/form/LeaveRequestForm';
import { withLeaveGetEnd, WithLeaveGetEnd } from '@leave/hoc/withLeaveGetEnd';
import { FormikProps } from 'formik';
import * as React from 'react';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

interface IOwnOption {
  formikBag: FormikProps<ILeaveRequestFormValue>;
  regularType: string;
  start: string;
}

interface IOwnState {
  value: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {

}

interface IOwnHandler {
  handleOnLoadApi: (filter: ILeaveGetEndQuery) => void;
}

export type DateEndOptionProps
  = WithLeaveGetEnd
  & WithUser
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => ({
  value: ''
});

const stateUpdaters: StateUpdaters<DateEndOptionProps, IOwnState, IOwnStateUpdater> = {
  //
};

const handlerCreators: HandleCreators<DateEndOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: DateEndOptionProps) => (filter: ILeaveGetEndQuery) => {
    const user = props.userState.user;
    const { loadDetailRequest } = props.leaveGetEndDispatch;

    if (user) {
      loadDetailRequest({
        regularType: filter.regularType,
        start: filter.start,
        companyUid: user.company.uid,
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<DateEndOptionProps, IOwnState> = {
  componentDidMount() {
    // 
  },
  componentWillUpdate(nextProps: DateEndOptionProps) {
    const start: string = nextProps.start;

    const filter: ILeaveGetEndQuery = {
      start,
      companyUid: this.props.userState.user && this.props.userState.user.company.uid || '',
      regularType: nextProps.regularType,
    };

    if (nextProps.regularType && nextProps.start) {
      if (this.props.start !== nextProps.start || this.props.regularType !== nextProps.regularType) {
        this.props.handleOnLoadApi(filter);
      }
    }
  },
  componentDidUpdate(prevProps: DateEndOptionProps) {
    const { response: thisResponse } = this.props.leaveGetEndState.detail;
    const { response: prevResponse } = prevProps.leaveGetEndState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        this.props.formikBag.setFieldValue('end', thisResponse.data.end);
      }
    }
  }
};

const component: React.SFC<DateEndOptionProps> = props => {
  const children = props.children as React.ReactElement<SelectFieldProps>;

  if (children) {
    return (
      <React.Fragment>
        {
          React.cloneElement(children)
        }
      </React.Fragment>
    );
  }

  return <div></div>;
};

export const DateEndOption = compose<DateEndOptionProps, IOwnOption>(
  setDisplayName('DateEndOption'),
  withUser,
  withLeaveGetEnd,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);