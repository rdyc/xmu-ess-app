import { Dispatch, Action, AnyAction } from 'redux';

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}