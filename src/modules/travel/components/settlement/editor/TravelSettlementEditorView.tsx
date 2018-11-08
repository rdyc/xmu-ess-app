import { FormMode } from '@generic/types';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TravelSettlementForm, TravelSettlementFormData } from './forms/TravelSettlementForm';
import { TravelSettlementEditorProps } from './TravelSettlementEditor';

export const travelSettlementEditorView: React.SFC<TravelSettlementEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.travelSettlementState.detail;
  const travelResponse = props.travelRequestState.detail.response;
  const isloading = props.travelRequestState.detail.isLoading;
  const { user } = props.userState;

  const renderForm = (formData: TravelSettlementFormData) => (
    <TravelSettlementForm
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  const initialValues: TravelSettlementFormData = {
    information: {
      uid: undefined,
      travelUid: undefined,
      fullName: user && user.fullName,
      position: user && user.position.name,
      destinationType: undefined,
      start: undefined,
      end: undefined,
      customerUid: undefined,
      projectUid: undefined,
      siteUid: undefined,
      activityType: undefined,
      objective: undefined,
      target: undefined,
      comment: undefined,
    },
    item: {
      items: []
    }
  };

  // new
  if (formMode === FormMode.New) {
    if (!isloading && travelResponse && travelResponse.data) {
      // todo: replace values with response data
      const data = travelResponse.data;

      initialValues.information.uid = undefined;
      initialValues.information.travelUid = data.uid;
      initialValues.information.fullName = data.employee ? data.employee.fullName : 'N/A';
      initialValues.information.position = data.position ? data.position.name : 'N/A';
      initialValues.information.destinationType = data.destination && data.destination.value;
      initialValues.information.start = data.start;
      initialValues.information.end = data.end;
      initialValues.information.customerUid = data.customer && data.customer.name;
      initialValues.information.projectUid = data.project && data.project.name;
      initialValues.information.siteUid = data.site && data.site.name;
      initialValues.information.activityType = data.activity && data.activity.value;
      initialValues.information.objective = data.objective;
      initialValues.information.target = data.target;
      initialValues.information.comment = data.comment;

      if (data.items) {
        data.items.forEach(item =>
          initialValues.item.items.push({
            uid: item.uid,
            employeeUid: item.employeeUid,
            fullName: item.employee ? item.employee.fullName : 'N/A',
            transportType: item.transportType,
            isRoundTrip: item.isRoundTrip,
            from: item.from,
            destination: item.destination,
            departureDate: item.departureDate,
            returnDate: item.returnDate,
            costTransport: item.costTransport || 0,
            isTransportByCompany: item.isTransportByCompany,
            hotel: item.hotel,
            costHotel: item.costHotel || 0,
            isHotelByCompany: item.isHotelByCompany,
            notes: item.notes,
            duration: item.duration || 0,
            amount: item.amount || 0,
            currencyUid: item.currency ? item.currency.name : '',
            currencyRate: item.currency ? item.currency.rate : 0,
            diemValue: item.diemValue || 0
          })
        );
      }
      return renderForm(initialValues);
    }
  }

  // modify
  if (formMode === FormMode.Edit) {
    if (isLoading && !response) {
      return (
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      );
    }

    if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;

      initialValues.information.uid = data.uid;
      initialValues.information.travelUid = data.travelUid;
      initialValues.information.fullName = data.employee ? data.employee.fullName : 'N/A';
      initialValues.information.position = data.position ? data.position.name : 'N/A';
      initialValues.information.destinationType = data.destination && data.destination.value;
      initialValues.information.start = data.start;
      initialValues.information.end = data.end;
      initialValues.information.customerUid = data.customer && data.customer.name;
      initialValues.information.projectUid = data.project && data.project.name;
      initialValues.information.siteUid = data.site && data.site.name;
      initialValues.information.activityType = data.activity && data.activity.value;
      initialValues.information.objective = data.objective;
      initialValues.information.target = data.target;
      initialValues.information.comment = data.comment;

      if (data.items) {
        data.items.forEach(item =>
          initialValues.item.items.push({
            uid: item.uid,
            employeeUid: item.employeeUid,
            fullName: item.employee ? item.employee.fullName : 'N/A',
            transportType: item.transportType,
            isRoundTrip: item.isRoundTrip,
            from: item.from,
            destination: item.destination,
            departureDate: item.departureDate,
            returnDate: item.returnDate,
            costTransport: item.costTransport || 0,
            isTransportByCompany: item.isTransportByCompany,
            hotel: item.hotel,
            costHotel: item.costHotel || 0,
            isHotelByCompany: item.isHotelByCompany,
            notes: item.notes,
            duration: item.duration || 0,
            amount: item.amount || 0,
            currencyUid: item.currency ? item.currency.name : '',
            currencyRate: item.currency ? item.currency.rate : 0,
            diemValue: item.diemValue || 0
          })
        );
      }
      return renderForm(initialValues);
    }    
  }
  return null;
};