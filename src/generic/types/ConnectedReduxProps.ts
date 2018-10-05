import { Action, AnyAction, Dispatch } from 'redux';

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}