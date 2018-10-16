import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface ITravelSettlementItem {
  Uid: string;
  EmployeeUid: string;
  Employee?: IAccountEmployee | null;
  TransportType: string;
  Transport?: ICommonSystem | null;
  IsRoundTrip: boolean;
  From: string;
  Destination: string;
  DepartureDate: string;
  ReturnDate: string | null;
  CostTransport: number | null;
  IsTransportByCompany: boolean;
  Hotel?: string | null;
  CostHotel: number | null;
  IsHotelByCompany: boolean;
  Notes: string | null;
  Duration: number | null;
  Amount: number;
  CurrencyUid: string | null;
  // Currency: ILookupCurrency | null;
  DiemValue: number | null;
  Changes: IBaseChanges | null;
}
