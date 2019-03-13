import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILeaveGetEndQuery } from '@leave/classes/queries/request';
import { WithLeaveGetEnd, withLeaveGetEnd } from '@leave/hoc/withLeaveGetEnd';
import * as moment from 'moment';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  pure,
  ReactLifeCycleFunctions,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputDateEndView } from './InputDateEndView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean; 
  multiline: boolean;
  filter: ILeaveGetEndQuery | undefined;
}

interface OwnHandlers {
  handleOnLoadApi: () => void;
}

interface OwnState {
  value: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type InputDateEndProps 
  = WithLeaveGetEnd
  & WithUser
  & OwnProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;
  
const handlerCreators: HandleCreators<InputDateEndProps, OwnHandlers> = {
  handleOnLoadApi: (props: InputDateEndProps) => () => {
    const { filter } = props;
    const { user } = props.userState;

    if (filter && user) {
      props.leaveGetEndDispatch.loadDetailRequest({
        regularType: filter.regularType,
        start: moment(filter.start).format('YYYY-MM-DD'),
        companyUid: user.company.uid,
      });
    }
  }
};

const createProps: mapper<InputDateEndProps, OwnState> = (props: InputDateEndProps): OwnState => ({
  value: props.input.value
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<InputDateEndProps, {}> = {
  componentDidMount() {
    const { request } = this.props.leaveGetEndState.detail;

    if (this.props.filter) {
      if (!request) {
        this.props.handleOnLoadApi();
      } else {
        if (request) {
          const shouldUpdate = !shallowEqual(request, this.props.filter || {});
  
          if (shouldUpdate) {
            this.props.handleOnLoadApi();
          }
        }
      }
    }
  },
  // componentDidUpdate(prevProps: InputDateEndProps) {
  //   if (prevProps.leaveGetEndState.detail.response && this.props.leaveGetEndState.detail.response) {
  //     if (prevProps.leaveGetEndState.detail.response.data.end !== this.props.leaveGetEndState.detail.response.data.end) {
  //       this.props.stateUpdate({
  //         value: this.props.leaveGetEndState.detail.response.data.end
  //       });
  //     }
  //   }
  // }
};

export const InputDateEnd = compose<InputDateEndProps, OwnProps>(
  withLeaveGetEnd,
  withUser,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  pure
)(InputDateEndView);