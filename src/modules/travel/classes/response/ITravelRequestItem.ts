import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCurrency } from '@lookup/classes';

export interface ITravelRequestItem {
  uid: string;
  employeeUid: string;
  employee?: IAccountEmployee;
  transportType: string;
  transport?: ICommonSystem;
  isRoundTrip: boolean;
  from: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  costTransport?: number;
  isTransportByCompany: boolean;
  hotel?: string;
  costHotel?: number;
  isHotelByCompany: boolean;
  notes?: string;
  duration?: number;
  amount: number;
  currencyUid?: string;
  currency?: ILookupCurrency;
  diemValue?: number;
  changes?: IBaseChanges;
}
