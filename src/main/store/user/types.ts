export interface AppUser {
  uid: string;
  fullName: number;
  access: AppUserAccess[];
}

export interface AppUserAccess {
  uid: number;
  companyUid: string;
  positionUid: string;
}

export const enum AppUserActionTypes {
  FETCH_REQUEST = '@@users/FETCH_REQUEST',
  FETCH_SUCCESS = '@@users/FETCH_SUCCESS',
  FETCH_ERROR = '@@users/FETCH_ERROR'
}

export interface AppUserState {
  readonly loading: boolean;
  readonly data: AppUser | undefined;
  readonly errors?: string;
}