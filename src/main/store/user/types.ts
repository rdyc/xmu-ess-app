export interface ApiResponse<T> {
  data: T;
}

export interface AppUser {
  uid: string;
  employmentNumber: string;
  fullName: string;
  birthPlace: string;
  dateOfBirth: Date;
  email: string;
  address: string;
  access: AppUserAccess[];
}

export interface AppUserResponse extends ApiResponse<AppUser> {

}

export interface AppUserAccess {
  uid: number;
  companyUid: string;
  company: Company;
  positionUid: string;
}

export interface Company {
  uid: number;
  code: string;
  name: string;
}

export const enum AppUserActionTypes {
  FETCH_REQUEST = '@@users/FETCH_REQUEST',
  FETCH_SUCCESS = '@@users/FETCH_SUCCESS',
  FETCH_ERROR = '@@users/FETCH_ERROR'
}

export interface AppUserState {
  readonly loading: boolean;
  readonly response: AppUserResponse | undefined;
  readonly errors?: string;
}