import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILookupHolidayGetAllRequest,
  ILookupHolidayGetByIdRequest,
  ILookupHolidayGetListRequest,
  ILookupHolidayPostRequest,
  ILookupHolidayPutRequest,
} from '@lookup/classes/queries';
import { ILookupHoliday, ILookupHolidayDetail, ILookupHolidayList } from '@lookup/classes/response';
import {
  lookupHolidayGetAllDispose,
  lookupHolidayGetAllRequest,
  lookupHolidayGetByIdDispose,
  lookupHolidayGetByIdRequest,
  lookupHolidayGetListDispose,
  lookupHolidayGetListRequest,
  lookupHolidayPostDispose,
  lookupHolidayPostRequest,
  lookupHolidayPutDispose,
  lookupHolidayPutRequest,
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupHolidayState: {
    all: IQueryCollectionState<ILookupHolidayGetAllRequest, ILookupHoliday>;
    list: IQueryCollectionState<ILookupHolidayGetListRequest, ILookupHolidayList>;
    detail: IQuerySingleState<ILookupHolidayGetByIdRequest, ILookupHolidayDetail>;
  };
}

interface PropsFromDispatch {
  lookupHolidayDispatch: {
    // command
    createRequest: typeof lookupHolidayPostRequest;
    createDispose: typeof lookupHolidayPostDispose;
    updateRequest: typeof lookupHolidayPutRequest;
    updateDispose: typeof lookupHolidayPutDispose;

    // query
    loadAllRequest: typeof lookupHolidayGetAllRequest;
    loadAllDispose: typeof lookupHolidayGetAllDispose;
    loadListRequest: typeof lookupHolidayGetListRequest;
    loadListDispose: typeof lookupHolidayGetListDispose;
    loadDetailRequest: typeof lookupHolidayGetByIdRequest;
    loadDetailDispose: typeof lookupHolidayGetByIdDispose;
  };
}

export interface WithLookupHoliday extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ lookupHolidayGetAll, lookupHolidayGetList, lookupHolidayGetById }: IAppState) => ({
  lookupHolidayState: {
    all: lookupHolidayGetAll,
    list: lookupHolidayGetList,
    detail: lookupHolidayGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupHolidayDispatch: {
    // command
    createRequest: (request: ILookupHolidayPostRequest) => dispatch(lookupHolidayPostRequest(request)),
    createDispose: () => dispatch(lookupHolidayPostDispose()),
    updateRequest: (request: ILookupHolidayPutRequest) => dispatch(lookupHolidayPutRequest(request)),
    updateDispose: () => dispatch(lookupHolidayPutDispose()),
    
    // query
    loadAllRequest: (request: ILookupHolidayGetAllRequest) => dispatch(lookupHolidayGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupHolidayGetAllDispose()),
    loadListRequest: (request: ILookupHolidayGetListRequest) => dispatch(lookupHolidayGetListRequest(request)),
    loadListDispose: () => dispatch(lookupHolidayGetListDispose()),
    loadDetailRequest: (request: ILookupHolidayGetByIdRequest) => dispatch(lookupHolidayGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupHolidayGetByIdDispose()),
  }
});

export const withLookupHoliday = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);