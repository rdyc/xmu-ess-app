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
  uid: string;
  companyUid: string;
  company: Company;
  positionUid: string;
  position: Position;
  roleUid: string | null;
  role: Role | null;
  levelType: string | null;
  level: CommonSystem | null;
  unitType: string | null;
  unit: CommonSystem | null;
}

export interface Company {
  uid: string;
  code: string;
  name: string;
}

export interface Position {
  uid: string;
  name: string;
  description: string | null;
}

export interface Role {
  uid: string;
  name: string;
  description: string | null;
}

export interface CommonSystem {
  type: string;
  value: string;
  description: string;
}

export const enum AppUserActionTypes {
  FETCH_REQUEST = '@@users/FETCH_REQUEST',
  FETCH_SUCCESS = '@@users/FETCH_SUCCESS',
  FETCH_ERROR = '@@users/FETCH_ERROR'
}

export interface AppUserState {
  readonly user: AppUserResponse | undefined;
  readonly loading: boolean;
  readonly errors?: string;
}