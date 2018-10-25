import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCurrency } from '@lookup/classes';

export interface ITravelRequestItem {
  uid: string;
  employeeUid: string;
  employee?: IAccountEmployee | null;
  transportType: string;
  transport?: ICommonSystem | null;
  isRoundTrip: boolean;
  from: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  costTransport: number | null;
  isTransportByCompany: boolean;
  hotel: string | null;
  costHotel: number | null;
  isHotelByCompany: boolean;
  notes: string | null;
  duration: number | null;
  amount: number;
  currencyUid: string | null;
  currency: ILookupCurrency | null;
  diemValue: number | null;
  changes: IBaseChanges | null;
}
