import { IEmployeeMy } from '@account/classes/response';
import { accountEmployeeMyGetRequest } from '@account/store/actions';
import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeMyState: {
    detail: IQuerySingleState<{}, IEmployeeMy>;
  };
}

interface PropsFromDispatch {
  accountEmployeeMyDispatch: {
    loadRequest: typeof accountEmployeeMyGetRequest;
  };
}

export interface WithAccountEmployeeMy extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ accountEmployeeMyGet }: IAppState) => ({
  accountEmployeeMyState: {
    detail: accountEmployeeMyGet
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeMyDispatch: {
    loadRequest: () => dispatch(accountEmployeeMyGetRequest())
  }
});

export const withAccountEmployeeMy = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);