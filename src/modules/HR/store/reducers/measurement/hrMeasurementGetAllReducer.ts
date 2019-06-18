// import { IQueryCollectionState } from '@generic/interfaces';
// import { IHRMeasurementGetAllRequest } from 'modules/HR/classes/queries/measurement';
// import { IHRMeasurement } from 'modules/HR/classes/response/measurement';
// import { HRMeasurementAction as Action } from 'modules/HR/store/actions/hrMeasurementActions';
// import { Reducer } from 'redux';

// const initialState: IQueryCollectionState<IHRMeasurementGetAllRequest, IHRMeasurement> = {
//   isExpired: false,
//   isError: false,
//   isLoading: false,
//   request: undefined,
//   response: undefined,
//   errors: undefined
// };

// const reducer: Reducer<IQueryCollectionState<IHRMeasurementGetAllRequest, IHRMeasurement>> = (state = initialState, action) => {
//   switch (action.type) {
//     case Action.GET_ALL_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
//     case Action.GET_ALL_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
//     case Action.GET_ALL_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
//     case Action.GET_ALL_DISPOSE: return { ...state, isExpired: true };

//     default: { return state; }
//   }
// };

// export { reducer as lookupCustomerGetAllReducer };