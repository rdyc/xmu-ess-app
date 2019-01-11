export interface ITravelSettlementPostItem {
  employeeUid: string;
  isRoundTrip: boolean;
  transportType: string;
  from?: string;
  departureDate: string;
  destination?: string;
  returnDate: string;
  costTransport: number;
  isTransportByCompany: boolean;
  hotel?: string;
  costHotel: number;
  isHotelByCompany: boolean;
  notes?: string;
}