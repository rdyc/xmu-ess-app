import { FormMode } from '@generic/types';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RequestForm, TravelRequestFormData } from './forms/RequestForm';
import { RequestEditorProps } from './RequestEditor';

export const RequestEditorView: React.SFC<RequestEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.travelRequestState.detail;

  const renderForm = (formData: TravelRequestFormData) => (
    <RequestForm
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  const initialValues: TravelRequestFormData = {
    information: {
      uid: undefined,
      // employeeUid: undefined,
      fullName: undefined,
      // positionUid: undefined,
      position: undefined,
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
    return renderForm(initialValues);
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
      // initialValues.information.employeeUid = data.employeeUid;
      initialValues.information.fullName = data.employee ? data.employee.fullName : 'N/A';
      // initialValues.information.positionUid = data.positionUid;
      initialValues.information.position = data.position ? data.position.name : 'N/A';
      initialValues.information.destinationType = data.destinationType;
      initialValues.information.start = data.start;
      initialValues.information.end = data.end;
      initialValues.information.customerUid = data.customerUid;
      initialValues.information.projectUid = data.projectUid;
      initialValues.information.siteUid = data.siteUid;
      initialValues.information.activityType = data.activityType;
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
            currencyUid: item.currencyUid,
            diemValue: item.diemValue || 0
          })
        );
      }
      return renderForm(initialValues);
    }    
  }
  return null;
};