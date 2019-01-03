import { 
  IEmployeeNoteAllRequest, 
  IEmployeeNoteByIdRequest, 
  IEmployeeNoteDeleteRequest, 
  IEmployeeNoteListRequest, 
  IEmployeeNotePostRequest, 
  IEmployeeNotePutRequest 
} from '@account/classes/queries/employeeNote';
import { 
  IEmployeeNote, 
} from '@account/classes/response/employeeNote';
import { 
  accountEmployeeNoteDeleteDispose, 
  accountEmployeeNoteDeleteRequest, 
  accountEmployeeNoteGetAllDispose, 
  accountEmployeeNoteGetAllRequest, 
  accountEmployeeNoteGetByIdDispose, 
  accountEmployeeNoteGetByIdRequest, 
  accountEmployeeNoteGetListDispose, 
  accountEmployeeNoteGetListRequest, 
  accountEmployeeNotePostDispose, 
  accountEmployeeNotePostRequest, 
  accountEmployeeNotePutDispose, 
  accountEmployeeNotePutRequest 
} from '@account/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeNoteState: {
    all: IQueryCollectionState<IEmployeeNoteAllRequest, IEmployeeNote>;
    list: IQueryCollectionState<IEmployeeNoteListRequest, IEmployeeNote>;
    detail: IQuerySingleState<IEmployeeNoteByIdRequest, IEmployeeNote>;
  };
}

interface PropsFromDispatch {
  accountEmployeeNoteDispatch: {
    // command
    createRequest: typeof accountEmployeeNotePostRequest;
    createDispose: typeof accountEmployeeNotePostDispose;

    updateRequest: typeof accountEmployeeNotePutRequest;
    updateDispose: typeof accountEmployeeNotePutDispose;

    deleteRequest: typeof accountEmployeeNoteDeleteRequest;
    deleteDispose: typeof accountEmployeeNoteDeleteDispose;

    // query
    loadAllRequest: typeof accountEmployeeNoteGetAllRequest;
    loadAllDispose: typeof accountEmployeeNoteGetAllDispose;

    loadListRequest: typeof accountEmployeeNoteGetListRequest;
    loadListDispose: typeof accountEmployeeNoteGetListDispose;

    loadDetailRequest: typeof accountEmployeeNoteGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeNoteGetByIdDispose;
  };
}

export interface WithAccountEmployeeNote extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ 
  accountEmployeeNoteGetAll, 
  accountEmployeeNoteGetList,
  accountEmployeeNoteGetById,
}: IAppState) => ({
  accountEmployeeNoteState: {
    all: accountEmployeeNoteGetAll,
    list: accountEmployeeNoteGetList,
    detail: accountEmployeeNoteGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeNoteDispatch: {
    // command
    createRequest: (request: IEmployeeNotePostRequest) => dispatch(accountEmployeeNotePostRequest(request)),
    createDispose: () => dispatch(accountEmployeeNotePostDispose()),

    updateRequest: (request: IEmployeeNotePutRequest) => dispatch(accountEmployeeNotePutRequest(request)),
    updateDispose: () => dispatch(accountEmployeeNotePutDispose()),

    deleteRequest: (request: IEmployeeNoteDeleteRequest) => dispatch(accountEmployeeNoteDeleteRequest(request)),
    deleteDispose: () => dispatch(accountEmployeeNoteDeleteDispose()),

    // query
    loadAllRequest: (request: IEmployeeNoteAllRequest) => dispatch(accountEmployeeNoteGetAllRequest(request)),
    loadAllDispose: () => dispatch(accountEmployeeNoteGetAllDispose()),

    loadListRequest: (request: IEmployeeNoteListRequest) => dispatch(accountEmployeeNoteGetListRequest(request)),
    loadListDispose: () => dispatch(accountEmployeeNoteGetListDispose()),

    loadDetailRequest: (request: IEmployeeNoteByIdRequest) => dispatch(accountEmployeeNoteGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(accountEmployeeNoteGetByIdDispose())
  }
});

export const withAccountEmployeeNote = (component: React.ComponentType) => 
  connect(mapStateToProps, mapDispatchToProps)(component);