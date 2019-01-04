import { 
  IEmployeeExperienceAllRequest, 
  IEmployeeExperienceByIdRequest, 
  IEmployeeExperienceDeleteRequest, 
  IEmployeeExperienceListRequest, 
  IEmployeeExperiencePostRequest, 
  IEmployeeExperiencePutRequest 
} from '@account/classes/queries/employeeExperience';
import { 
  IEmployeeExperience, 
  IEmployeeExperienceDetail 
} from '@account/classes/response/employeeExperience';
import { 
  accountEmployeeExperienceDeleteDispose, 
  accountEmployeeExperienceDeleteRequest, 
  accountEmployeeExperienceGetAllDispose, 
  accountEmployeeExperienceGetAllRequest, 
  accountEmployeeExperienceGetByIdDispose, 
  accountEmployeeExperienceGetByIdRequest, 
  accountEmployeeExperienceGetListDispose, 
  accountEmployeeExperienceGetListRequest, 
  accountEmployeeExperiencePostDispose, 
  accountEmployeeExperiencePostRequest, 
  accountEmployeeExperiencePutDispose, 
  accountEmployeeExperiencePutRequest 
} from '@account/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeExperienceState: {
    all: IQueryCollectionState<IEmployeeExperienceAllRequest, IEmployeeExperience>;
    list: IQueryCollectionState<IEmployeeExperienceListRequest, IEmployeeExperience>;
    detail: IQuerySingleState<IEmployeeExperienceByIdRequest, IEmployeeExperienceDetail>;
  };
}

interface PropsFromDispatch {
  accountEmployeeExperienceDispatch: {
    // command
    createRequest: typeof accountEmployeeExperiencePostRequest;
    createDispose: typeof accountEmployeeExperiencePostDispose;

    updateRequest: typeof accountEmployeeExperiencePutRequest;
    updateDispose: typeof accountEmployeeExperiencePutDispose;

    deleteRequest: typeof accountEmployeeExperienceDeleteRequest;
    deleteDispose: typeof accountEmployeeExperienceDeleteDispose;

    // query
    loadAllRequest: typeof accountEmployeeExperienceGetAllRequest;
    loadAllDispose: typeof accountEmployeeExperienceGetAllDispose;

    loadListRequest: typeof accountEmployeeExperienceGetListRequest;
    loadListDispose: typeof accountEmployeeExperienceGetListDispose;

    loadDetailRequest: typeof accountEmployeeExperienceGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeExperienceGetByIdDispose;
  };
}

export interface WithAccountEmployeeExperience extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ 
  accountEmployeeExperienceGetAll, 
  accountEmployeeExperienceGetList,
  accountEmployeeExperienceGetById,
}: IAppState) => ({
  accountEmployeeExperienceState: {
    all: accountEmployeeExperienceGetAll,
    list: accountEmployeeExperienceGetList,
    detail: accountEmployeeExperienceGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeExperienceDispatch: {
    // command
    createRequest: (request: IEmployeeExperiencePostRequest) => dispatch(accountEmployeeExperiencePostRequest(request)),
    createDispose: () => dispatch(accountEmployeeExperiencePostDispose()),

    updateRequest: (request: IEmployeeExperiencePutRequest) => dispatch(accountEmployeeExperiencePutRequest(request)),
    updateDispose: () => dispatch(accountEmployeeExperiencePutDispose()),

    deleteRequest: (request: IEmployeeExperienceDeleteRequest) => dispatch(accountEmployeeExperienceDeleteRequest(request)),
    deleteDispose: () => dispatch(accountEmployeeExperienceDeleteDispose()),

    // query
    loadAllRequest: (request: IEmployeeExperienceAllRequest) => dispatch(accountEmployeeExperienceGetAllRequest(request)),
    loadAllDispose: () => dispatch(accountEmployeeExperienceGetAllDispose()),

    loadListRequest: (request: IEmployeeExperienceListRequest) => dispatch(accountEmployeeExperienceGetListRequest(request)),
    loadListDispose: () => dispatch(accountEmployeeExperienceGetListDispose()),

    loadDetailRequest: (request: IEmployeeExperienceByIdRequest) => dispatch(accountEmployeeExperienceGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(accountEmployeeExperienceGetByIdDispose())
  }
});

export const withAccountEmployeeExperience = (component: React.ComponentType) => 
  connect(mapStateToProps, mapDispatchToProps)(component);