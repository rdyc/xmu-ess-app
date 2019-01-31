import { IAppState, IQuerySingleState } from '@generic/interfaces';
import {
  ILookupVersionGetByIdRequest,
  ILookupVersionPatchRequest,
} from '@lookup/classes/queries';
import { ILookupVersion } from '@lookup/classes/response';
import {
  lookupVersionGetByIdDispose,
  lookupVersionGetByIdRequest,
  lookupVersionPatchDispose,
  lookupVersionPatchRequest,
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupVersionState: {
    detail: IQuerySingleState<ILookupVersionGetByIdRequest, ILookupVersion>;
  };
}

interface PropsFromDispatch {
  lookupVersionDispatch: {
    // command
    patchRequest: typeof lookupVersionPatchRequest;
    patchDispose: typeof lookupVersionPatchDispose;

    // query
    loadDetailRequest: typeof lookupVersionGetByIdRequest;
    loadDetailDispose: typeof lookupVersionGetByIdDispose;
  };
}

export interface WithLookupVersion extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ lookupVersionGetById }: IAppState) => ({
  lookupVersionState: {
    detail: lookupVersionGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupVersionDispatch: {
    // command
    patchRequest: (request: ILookupVersionPatchRequest) => dispatch(lookupVersionPatchRequest(request)),
    patchDispose: () => dispatch(lookupVersionPatchDispose()),
    
    // query
    loadDetailRequest: (request: ILookupVersionGetByIdRequest) => dispatch(lookupVersionGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupVersionGetByIdDispose()),
  }
});

export const withLookupVersion = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);