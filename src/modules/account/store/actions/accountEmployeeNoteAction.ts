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
  IEmployeeNoteList 
} from '@account/classes/response/employeeNote';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeNoteAction {
  GET_ALL_REQUEST = '@@account/employee/note/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employee/note/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employee/note/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employee/note/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@account/employee/note/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@account/employee/note/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@account/employee/note/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@account/employee/note/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employee/note/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employee/note/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employee/note/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employee/note/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@account/employee/note/POST_REQUEST',
  POST_SUCCESS = '@@account/employee/note/POST_SUCCESS',
  POST_ERROR = '@@account/employee/note/POST_ERROR',
  POST_DISPOSE = '@@account/employee/note/POST_DISPOSE',
  PUT_REQUEST = '@@account/employee/note/PUT_REQUEST',
  PUT_SUCCESS = '@@account/employee/note/PUT_SUCCESS',
  PUT_ERROR = '@@account/employee/note/PUT_ERROR',
  PUT_DISPOSE = '@@account/employee/note/PUT_DISPOSE',
  DELETE_REQUEST = '@@account/employee/note/DELETE_REQUEST',
  DELETE_SUCCESS = '@@account/employee/note/DELETE_SUCCESS',
  DELETE_ERROR = '@@account/employee/note/DELETE_ERROR',
  DELETE_DISPOSE = '@@account/employee/note/DELETE_DISPOSE'
}

// get all
export const accountEmployeeNoteGetAllRequest = (request: IEmployeeNoteAllRequest) => action(AccountEmployeeNoteAction.GET_ALL_REQUEST, request);
export const accountEmployeeNoteGetAllSuccess = (response: IResponseCollection<IEmployeeNote>) => action(AccountEmployeeNoteAction.GET_ALL_SUCCESS, response);
export const accountEmployeeNoteGetAllError = (error: any) => action(AccountEmployeeNoteAction.GET_ALL_ERROR, error);
export const accountEmployeeNoteGetAllDispose = () => action(AccountEmployeeNoteAction.GET_ALL_DISPOSE);

// get list
export const accountEmployeeNoteGetListRequest = (request: IEmployeeNoteListRequest) => action(AccountEmployeeNoteAction.GET_LIST_REQUEST, request);
export const accountEmployeeNoteGetListSuccess = (response: IResponseCollection<IEmployeeNoteList>) => action(AccountEmployeeNoteAction.GET_LIST_SUCCESS, response);
export const accountEmployeeNoteGetListError = (error: any) => action(AccountEmployeeNoteAction.GET_LIST_ERROR, error);
export const accountEmployeeNoteGetListDispose = () => action(AccountEmployeeNoteAction.GET_LIST_DISPOSE);

// get by id
export const accountEmployeeNoteGetByIdRequest = (request: IEmployeeNoteByIdRequest) => action(AccountEmployeeNoteAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeNoteGetByIdSuccess = (response: IResponseCollection<IEmployeeNote>) => action(AccountEmployeeNoteAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeNoteGetByIdError = (error: any) => action(AccountEmployeeNoteAction.GET_BY_ID_ERROR, error);
export const accountEmployeeNoteGetByIdDispose = () => action(AccountEmployeeNoteAction.GET_BY_ID_DISPOSE);

// post
export const accountEmployeeNotePostRequest = (request: IEmployeeNotePostRequest) => action(AccountEmployeeNoteAction.POST_REQUEST, request);
export const accountEmployeeNotePostSuccess = (response: IResponseSingle<IEmployeeNote>) => action(AccountEmployeeNoteAction.POST_SUCCESS, response);
export const accountEmployeeNotePostError = (error: any) => action(AccountEmployeeNoteAction.POST_ERROR, error);
export const accountEmployeeNotePostDispose = () => action(AccountEmployeeNoteAction.POST_DISPOSE);

// put
export const accountEmployeeNotePutRequest = (request: IEmployeeNotePutRequest) => action(AccountEmployeeNoteAction.PUT_REQUEST, request);
export const accountEmployeeNotePutSuccess = (response: IResponseSingle<IEmployeeNote>) => action(AccountEmployeeNoteAction.PUT_SUCCESS, response);
export const accountEmployeeNotePutError = (error: any) => action(AccountEmployeeNoteAction.PUT_ERROR, error);
export const accountEmployeeNotePutDispose = () => action(AccountEmployeeNoteAction.PUT_DISPOSE);

// delete
export const accountEmployeeNoteDeleteRequest = (request: IEmployeeNoteDeleteRequest) => action(AccountEmployeeNoteAction.DELETE_REQUEST, request);
export const accountEmployeeNoteDeleteSuccess = (response: boolean) => action(AccountEmployeeNoteAction.DELETE_SUCCESS, response);
export const accountEmployeeNoteDeleteError = (error: any) => action(AccountEmployeeNoteAction.DELETE_ERROR, error);
export const accountEmployeeNoteDeleteDispose = () => action(AccountEmployeeNoteAction.DELETE_DISPOSE);
