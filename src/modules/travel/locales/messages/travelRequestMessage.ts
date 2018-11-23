import { defineMessages } from 'react-intl';

const prefix = 'travel.request';

export const travelRequestPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
  
  statusModifyTitle: { id: `${prefix}.page.status.modify.title` },
  statusModifySubHeader: { id: `${prefix}.page.status.modify.subHeader` }
});

// option
export const travelRequestOption = defineMessages({
  addSettlement: { id: `${prefix}.option.addSettlement` },
});

// confimation
export const travelRequestConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  addSettlementTitle: { id: `${prefix}.confirm.addSettlement.title` },
  addSettlementDescription: { id: `${prefix}.confirm.addSettlement.description` },
});

// section
export const travelRequestSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  itemTitle: { id: `${prefix}.section.item.title` },
  itemSubHeader: { id: `${prefix}.section.item.subHeader` },
  statusTitle: { id: `${prefix}.section.status.title` },
  statusSubHeader: { id: `${prefix}.section.status.subHeader` },
  approvalTitle: { id: `${prefix}.section.approval.title` },
  approvalSubHeader: { id: `${prefix}.section.approval.subHeader` },
});

// fields
export const travelRequestField = defineMessages({
  // registration
  uid: { id: `${prefix}.field.uid` },
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder` },

  employeeUid: { id: `${prefix}.field.employeeUid` },
  employeeUidPlaceholder: { id: `${prefix}.field.employeeUid.placeholder` },
  
  positionUid: { id: `${prefix}.field.positionUid` },
  positionUidPlaceholder: { id: `${prefix}.field.positionUid.placeholder` },
  
  destinationType: { id: `${prefix}.field.destinationType` },
  destinationTypeRequired: { id: `${prefix}.field.destinationType.required` },
  destinationTypePlaceholder: { id: `${prefix}.field.destinationType.placeholder` },
  
  projectUid: { id: `${prefix}.field.projectUid` },
  projectUidRequired: { id: `${prefix}.field.projectUid.required` },
  projectUidPlaceholder: { id: `${prefix}.field.projectUid.placeholder` },
  
  siteUid: { id: `${prefix}.field.siteUid` },
  siteUidRequired: { id: `${prefix}.field.siteUid.required` },
  siteUidPlaceholder: { id: `${prefix}.field.siteUid.placeholder` },
  
  customerUid: { id: `${prefix}.field.customerUid` },
  customerUidRequired: { id: `${prefix}.field.customerUid.required` },
  customerUidPlaceholder: { id: `${prefix}.field.customerUid.placeholder` },
  
  start: { id: `${prefix}.field.start` },
  startRequired: { id: `${prefix}.field.start.required` },
  startPlaceholder: { id: `${prefix}.field.start.placeholder` },
  
  end: { id: `${prefix}.field.end` },
  endRequired: { id: `${prefix}.field.end.required` },
  endPlaceholder: { id: `${prefix}.field.end.placeholder` },

  activityType: { id: `${prefix}.field.activityType` },
  activityTypeRequired: { id: `${prefix}.field.activityType.required` },
  activityTypePlaceholder: { id: `${prefix}.field.activityType.placeholder` },
  
  statusType: { id: `${prefix}.field.statusType` },
  statusTypePlaceholder: { id: `${prefix}.field.statusType.placeholder` },
  
  objective: { id: `${prefix}.field.objective` },
  objectivePlaceholder: { id: `${prefix}.field.objective.placeholder` },

  target: { id: `${prefix}.field.target` },
  targetPlaceholder: { id: `${prefix}.field.target.placeholder` },

  comment: { id: `${prefix}.field.comment` },
  commentPlaceholder: { id: `${prefix}.field.comment.placeholder` },

  total: { id: `${prefix}.field.total` },
  totalDuration: { id: `${prefix}.field.total` },
  totalDiemValue: { id: `${prefix}.field.total` },
  totalTransportCost: { id: `${prefix}.field.total` },
  totalHotelCost: { id: `${prefix}.field.total` },

  //// item
  
  itemEmployeeUid: { id: `${prefix}.field.item.itemEmployeeUid` },
  itemEmployeeUidRequired: { id: `${prefix}.field.item.itemEmployeeUid.required` },
  itemEmployeeUidPlaceholder: { id: `${prefix}.field.item.itemEmployeeUid.placeholder` },

  transportType: { id: `${prefix}.field.item.transportType` },
  transportTypeRequired: { id: `${prefix}.field.item.transportType.required` },
  transportTypePlaceholder: { id: `${prefix}.field.item.transportType.placeholder` },
  
  from: { id: `${prefix}.field.item.from` },
  fromRequired: { id: `${prefix}.field.item.from.required` },
  fromPlaceholder: { id: `${prefix}.field.item.from.placeholder` },

  destination: { id: `${prefix}.field.item.destination` },
  destinationRequired: { id: `${prefix}.field.item.destination.required` },
  destinationPlaceholder: { id: `${prefix}.field.item.destination.placeholder` },

  itemStart: { id: `${prefix}.field.item.itemStart` },
  itemStartRequired: { id: `${prefix}.field.item.itemStart.required` },
  itemStartPlaceholder: { id: `${prefix}.field.item.itemStart.placeholder` },

  itemEnd: { id: `${prefix}.field.item.itemEnd` },
  itemEndRequired: { id: `${prefix}.field.item.itemEnd.required` },
  itemEndPlaceholder: { id: `${prefix}.field.item.itemEnd.placeholder` },

  transportCost: { id: `${prefix}.field.item.transportCost` },
  transportCostRequired: { id: `${prefix}.field.item.transportCost.required` },
  transportCostPlaceholder: { id: `${prefix}.field.item.transportCost.placeholder` },

  hotelCost: { id: `${prefix}.field.item.hotelCost` },
  hotelCostRequired: { id: `${prefix}.field.item.hotelCost.required` },
  hotelCostPlaceholder: { id: `${prefix}.field.item.hotelCost.placeholder` },
  
  hotel: { id: `${prefix}.field.item.hotel` },
  hotelRequired: { id: `${prefix}.field.item.hotel.required` },
  hotelPlaceholder: { id: `${prefix}.field.item.hotel.placeholder` },

  note: { id: `${prefix}.field.item.note` },
  noteRequired: { id: `${prefix}.field.item.note.required` },
  notePlaceholder: { id: `${prefix}.field.item.note.placeholder` },

  duration: { id: `${prefix}.field.item.duration` },
  durationRequired: { id: `${prefix}.field.item.duration.required` },
  durationPlaceholder: { id: `${prefix}.field.item.duration.placeholder` },

  diemValue: { id: `${prefix}.field.item.diemValue` },
  diemValueRequired: { id: `${prefix}.field.item.diemValue.required` },
  diemValuePlaceholder: { id: `${prefix}.field.item.diemValue.placeholder` },

  amount: { id: `${prefix}.field.item.amount` },
  amountRequired: { id: `${prefix}.field.item.amount.required` },
  amountPlaceholder: { id: `${prefix}.field.item.amount.placeholder` },

  currencyUid: { id: `${prefix}.field.item.currencyUid` },
  currencyUidRequired: { id: `${prefix}.field.item.currencyUid.required` },
  currencyUidPlaceholder: { id: `${prefix}.field.item.currencyUid.placeholder` },
  
  currencyRate: { id: `${prefix}.field.item.currencyRate` },
  currencyRateRequired: { id: `${prefix}.field.item.currencyRate.required` },
  currencyRatePlaceholder: { id: `${prefix}.field.item.currencyRate.placeholder` },
  
  isRoundTrip: { id: `${prefix}.field.item.isRoundTrip` },
  isRoundTripRequired: { id: `${prefix}.field.item.isRoundTrip.required` },
  isRoundTripPlaceholder: { id: `${prefix}.field.item.isRoundTrip.placeholder` },
  
  isHotelByCompany: { id: `${prefix}.field.item.isHotelByCompany` },
  isHotelByCompanyRequired: { id: `${prefix}.field.item.isHotelByCompany.required` },
  isHotelByCompanyPlaceholder: { id: `${prefix}.field.item.isHotelByCompany.placeholder` },
  
  isTransportByCompany: { id: `${prefix}.field.item.isTransportByCompany` },
  isTransportByCompanyRequired: { id: `${prefix}.field.item.isTransportByCompany.required` },
  isTransportByCompanyPlaceholder: { id: `${prefix}.field.item.isTransportByCompany.placeholder` },

});

// message
export const travelRequestMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  emptyItem: { id: `${prefix}.message.emptyItem` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});