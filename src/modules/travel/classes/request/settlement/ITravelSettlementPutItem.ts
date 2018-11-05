export interface ITravelSettlementPutItem {
  uid: string | null;
  employeeUid: string;
  isRoundTrip: boolean;
  transportType: string;
  from: string | null;
  departureDate: string;
  destination: string | null;
  returnDate: string;
  costTransport: number;
  isTransportByCompany: boolean;
  hotel: string | null;
  costHotel: number;
  isHotelByCompany: boolean;
  notes: string | null;
}